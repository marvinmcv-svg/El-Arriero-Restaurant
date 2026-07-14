import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { RESTAURANT, RESERVATION_TIMES, PARTY_SIZES } from "@/lib/data";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const reservationSchema = z.object({
  name: z.string().trim().min(2, "El nombre es demasiado corto"),
  email: z.email("Email inválido"),
  phone: z.string().trim().min(6, "Teléfono inválido"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (YYYY-MM-DD)"),
  time: z.enum(RESERVATION_TIMES, "Horario no disponible"),
  partySize: z.enum(PARTY_SIZES, "Tamaño de grupo inválido"),
  occasion: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(500).optional(),
});

type ReservationInput = z.infer<typeof reservationSchema>;

// ---------------------------------------------------------------------------
// Helpers for the GET endpoint (available slots)
// ---------------------------------------------------------------------------

/** Convert "HH:mm" into minutes since midnight for easy comparison. */
function toMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Map JS Date.getDay() (0=Sun … 6=Sat) to the matching RESTAURANT.hours entry. */
function hoursForWeekday(day: number): {
  day: string;
  open: string;
  close: string;
  label: string;
} | null {
  if (day === 0) {
    return RESTAURANT.hours.find((h) => h.day === "Domingo") ?? null;
  }
  if (day === 6) {
    return RESTAURANT.hours.find((h) => h.day === "Sábado") ?? null;
  }
  return RESTAURANT.hours.find((h) => h.day === "Lunes — Viernes") ?? null;
}

/** Format a Date as YYYY-MM-DD using the local timezone (no UTC shift). */
function formatDateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Build the next 7 calendar days (including today) of available slots. */
function buildAvailableSlots() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekdayFormatter = new Intl.DateTimeFormat("es-BO", {
    weekday: "long",
  });

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const weekdayJs = d.getDay();
    const hours = hoursForWeekday(weekdayJs);

    if (!hours) {
      days.push({
        date: formatDateLocal(d),
        weekday: weekdayFormatter.format(d),
        open: null as string | null,
        close: null as string | null,
        times: [] as string[],
      });
      continue;
    }

    const openMin = toMinutes(hours.open);
    const closeMin = toMinutes(hours.close);

    const times = RESERVATION_TIMES.filter((t) => {
      const m = toMinutes(t);
      return m >= openMin && m <= closeMin;
    });

    days.push({
      date: formatDateLocal(d),
      weekday: weekdayFormatter.format(d),
      open: hours.open,
      close: hours.close,
      times: [...times],
    });
  }

  return days;
}

// ---------------------------------------------------------------------------
// GET /api/reservations — informational available slots for next 7 days
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const days = buildAvailableSlots();
    return NextResponse.json({ days }, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/reservations — create a reservation
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

  const parsed = reservationSchema.safeParse(body);
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

  const data: ReservationInput = parsed.data;

  try {
    const reservation = await db.reservation.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        partySize: data.partySize,
        occasion: data.occasion ?? null,
        notes: data.notes ?? null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: reservation.id,
        message: "Reserva recibida. Nos comunicaremos para confirmar.",
      },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[reservations] DB error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
