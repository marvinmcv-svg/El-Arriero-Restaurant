import { PrismaClient } from "@prisma/client";

/**
 * Vercel-compatible Prisma client.
 *
 * Vercel serverless functions have an ephemeral filesystem — only `/tmp` is
 * writable and it does not persist across cold starts. We:
 *   1. Resolve DATABASE_URL, defaulting to `/tmp/el-arriero.db` on Vercel.
 *   2. Auto-create the SQLite schema (CREATE TABLE IF NOT EXISTS) on first use
 *      so a fresh container can serve requests immediately.
 *   3. Cache the client on globalThis to reuse across warm invocations.
 *
 * Data persists within a warm function instance but is lost on cold starts.
 * For production-grade persistence, switch the Prisma provider to
 * `postgresql` and point DATABASE_URL at Vercel Postgres / Neon / Supabase.
 */

const IS_VERCEL = !!process.env.VERCEL;

function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  // Vercel: use the only writable directory
  if (IS_VERCEL) return "file:/tmp/el-arriero.db";
  // Local dev fallback
  return "file:./db/custom.db";
}

const databaseUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = databaseUrl;

// Raw SQL to bootstrap the schema (idempotent). Mirrors prisma/schema.prisma.
const SCHEMA_SQL = [
  `CREATE TABLE IF NOT EXISTS "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "partySize" TEXT NOT NULL,
    "occasion" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "Reservation_date_time_idx" ON "Reservation"("date", "time")`,
  `CREATE INDEX IF NOT EXISTS "Reservation_email_idx" ON "Reservation"("email")`,
  `CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt")`,
  `CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "source" TEXT NOT NULL DEFAULT 'website',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NewsletterSubscriber_email_key" UNIQUE ("email")
  )`,
].join(";");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  __prismaInitialized?: boolean;
};

async function ensureSchema(client: PrismaClient): Promise<void> {
  if (globalForPrisma.__prismaInitialized) return;
  try {
    await client.$executeRawUnsafe(SCHEMA_SQL);
    globalForPrisma.__prismaInitialized = true;
  } catch (err) {
    console.error("[db] Schema init failed:", err);
  }
}

function createClient(): PrismaClient {
  return new PrismaClient({
    log: IS_VERCEL ? ["error", "warn"] : ["query", "error", "warn"],
    datasources: { db: { url: databaseUrl } },
  });
}

export const db = globalForPrisma.prisma ?? createClient();

if (!IS_VERCEL) globalForPrisma.prisma = db;

/**
 * Ensures the database schema exists before running a query.
 * Call this at the start of any API route that touches the DB.
 * On Vercel, this creates the tables in /tmp on cold starts.
 */
export async function withDb<T>(
  fn: (client: PrismaClient) => Promise<T>
): Promise<T> {
  await ensureSchema(db);
  return fn(db);
}
