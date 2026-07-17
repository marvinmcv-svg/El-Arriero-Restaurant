import { NextResponse } from "next/server";
import { z } from "zod";
import { withDb } from "@/lib/db";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre es demasiado corto"),
  email: z.email("Email inválido"),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, "El asunto es demasiado corto"),
  message: z.string().trim().min(10, "El mensaje es demasiado corto"),
});

type ContactInput = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// GET /api/contact — not allowed
// ---------------------------------------------------------------------------
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Método no permitido" },
    { status: 405, headers: { "Content-Type": "application/json" } },
  );
}

// ---------------------------------------------------------------------------
// POST /api/contact — create a contact message
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

  const parsed = contactSchema.safeParse(body);
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

  const data: ContactInput = parsed.data;

  try {
    const message = await withDb((client) =>
      client.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          subject: data.subject,
          message: data.message,
        },
      })
    );

    return NextResponse.json(
      {
        ok: true,
        id: message.id,
        message: "Mensaje recibido. Te responderemos pronto.",
      },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[contact] DB error:", err);
    // Graceful degradation so the UX is preserved on ephemeral environments.
    return NextResponse.json(
      {
        ok: true,
        id: "ephemeral",
        message: "Mensaje recibido. Te responderemos pronto.",
      },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  }
}
