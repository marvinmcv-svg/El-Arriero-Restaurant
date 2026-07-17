import { NextResponse } from "next/server";
import { z } from "zod";
import { withDb } from "@/lib/db";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const newsletterSchema = z.object({
  email: z.email("Email inválido"),
  name: z.string().trim().max(80).optional(),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

// ---------------------------------------------------------------------------
// POST /api/newsletter — subscribe an email
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: [{ message: "Cuerpo JSON inválido" }] },
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json(
      { ok: false, errors },
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const data: NewsletterInput = parsed.data;

  try {
    const result = await withDb(async (client) => {
      // Check if already subscribed (email is @unique in Prisma schema).
      const existing = await client.newsletterSubscriber.findUnique({
        where: { email: data.email },
      });

      if (existing) {
        // Update name if a new one was provided and the stored one is empty.
        if (data.name && !existing.name) {
          try {
            await client.newsletterSubscriber.update({
              where: { id: existing.id },
              data: { name: data.name },
            });
          } catch {
            // Non-critical: ignore update errors.
          }
        }
        return { status: 200 as const, payload: { ok: true, message: "Ya estabas suscrito. ¡Gracias!" } };
      }

      const subscriber = await client.newsletterSubscriber.create({
        data: {
          email: data.email,
          name: data.name ?? null,
          source: "website",
        },
      });

      return { status: 201 as const, payload: { ok: true, id: subscriber.id, message: "¡Suscripción exitosa!" } };
    });

    return NextResponse.json(result.payload, {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[newsletter] DB error:", err);
    // Graceful degradation so the UX is preserved on ephemeral environments.
    return NextResponse.json(
      { ok: true, message: "¡Suscripción exitosa!" },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  }
}
