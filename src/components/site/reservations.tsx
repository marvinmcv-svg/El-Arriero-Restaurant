"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, Sparkles, Loader2, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { RESTAURANT, RESERVATION_TIMES, PARTY_SIZES } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export function Reservations() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    occasion: "",
    notes: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.partySize) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    setStatus("loading");
    let succeeded = false;
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg =
          data?.errors?.[0]?.message ||
          data?.error ||
          "No pudimos procesar tu reserva. Intenta nuevamente.";
        throw new Error(msg);
      }
      succeeded = true;
      setStatus("success");
      toast.success("¡Reserva recibida!", {
        description: "Nos comunicaremos para confirmar por correo o teléfono.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "",
        occasion: "",
        notes: "",
      });
    } catch (err) {
      setStatus("idle");
      toast.error("Error al reservar", {
        description: err instanceof Error ? err.message : "Intenta nuevamente.",
      });
    } finally {
      if (!succeeded) setStatus("idle");
    }
  };

  // Min date = today, in user's local tz
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const maxDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const whatsappLink = `https://wa.me/${RESTAURANT.contact.whatsapp}?text=${encodeURIComponent(
    `Hola El Arriero, quisiera hacer una reserva. Nombre: ${form.name || "[nombre]"}. Fecha: ${form.date || "[fecha]"}. Hora: ${form.time || "[hora]"}. Personas: ${form.partySize || "[nº]"}.`
  )}`;

  return (
    <section
      id="reservas"
      className="relative bg-charcoal py-20 sm:py-28 overflow-hidden"
      aria-labelledby="reservations-heading"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/media/reservations.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="inline-flex items-center gap-2 text-brass text-xs uppercase tracking-[0.25em] mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Reservas</span>
            </div>
            <h2
              id="reservations-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight text-balance"
            >
              Reserva tu mesa en El Arriero
            </h2>
            <p className="mt-4 text-cream/75 text-base sm:text-lg leading-relaxed text-pretty">
              Vive la experiencia de la mejor parrilla de Bolivia. Completa el formulario y
              nuestro equipo confirmará tu reserva en breve.
            </p>

            {/* Hours */}
            <div className="mt-8 space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] text-brass font-semibold">
                Horarios de atención
              </div>
              <ul className="space-y-2.5">
                {RESTAURANT.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 text-sm border-b border-cream/10 pb-2"
                  >
                    <span className="text-cream/80 font-medium">{h.day}</span>
                    <span className="text-cream/60 font-mono">{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Large party notice */}
            <div className="mt-6 p-4 rounded-sm bg-cream/5 border border-cream/10">
              <p className="text-xs text-cream/70 leading-relaxed">
                <strong className="text-cream">Para grupos de más de 12 personas:</strong> comunícate
                directamente con nuestro equipo para coordinar una experiencia a tu medida.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-ember hover:text-brass transition-colors font-medium"
              >
                <MessageCircle className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-cream rounded-sm p-6 sm:p-8 shadow-2xl shadow-black/40"
              noValidate
            >
              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-16 w-16 rounded-full bg-ember/15 flex items-center justify-center mb-5">
                    <Check className="h-8 w-8 text-ember" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-espresso">
                    ¡Reserva recibida!
                  </h3>
                  <p className="mt-2 text-charcoal/75 max-w-sm mx-auto">
                    Gracias por elegir El Arriero. Nuestro equipo se comunicará contigo para
                    confirmar los detalles de tu reserva.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="mt-6 border-espresso/30 text-espresso hover:bg-espresso/5"
                  >
                    Hacer otra reserva
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-semibold text-espresso mb-5">
                    Datos de la reserva
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs uppercase tracking-wider text-charcoal">
                        Nombre *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Tu nombre completo"
                          className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember"
                          required
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-charcoal">
                        Teléfono *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+591 ..."
                          className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember"
                          required
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="email" className="text-xs uppercase tracking-wider text-charcoal">
                        Correo electrónico *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="tu@correo.com"
                          className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <Label htmlFor="date" className="text-xs uppercase tracking-wider text-charcoal">
                        Fecha *
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40 z-10" />
                        <Input
                          id="date"
                          type="date"
                          min={todayStr}
                          max={maxDate}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember"
                          required
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                      <Label htmlFor="time" className="text-xs uppercase tracking-wider text-charcoal">
                        Hora *
                      </Label>
                      <Select value={form.time} onValueChange={(v) => update("time", v)}>
                        <SelectTrigger className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40 pointer-events-none" />
                          <SelectValue placeholder="Elige hora" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {RESERVATION_TIMES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Party size */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="party" className="text-xs uppercase tracking-wider text-charcoal">
                        Número de personas *
                      </Label>
                      <Select value={form.partySize} onValueChange={(v) => update("partySize", v)}>
                        <SelectTrigger className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40 pointer-events-none" />
                          <SelectValue placeholder="¿Cuántos serán?" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {PARTY_SIZES.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Occasion */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="occasion" className="text-xs uppercase tracking-wider text-charcoal">
                        Ocasión (opcional)
                      </Label>
                      <Input
                        id="occasion"
                        value={form.occasion}
                        onChange={(e) => update("occasion", e.target.value)}
                        placeholder="Cumpleaños, aniversario, cena de negocios..."
                        className="bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember"
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="notes" className="text-xs uppercase tracking-wider text-charcoal">
                        Notas (opcional)
                      </Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-charcoal/40" />
                        <Textarea
                          id="notes"
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          placeholder="Alergias, preferencias, solicitudes especiales..."
                          className="pl-9 bg-white border-espresso/15 focus:border-ember focus-visible:ring-ember min-h-24 resize-y"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 bg-ember hover:bg-ember/90 text-cream ember-glow border-0 h-12 text-base font-medium"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Solicitar reserva"
                      )}
                    </Button>
                    <Button
                      type="button"
                      asChild
                      variant="outline"
                      className="border-espresso/30 text-espresso hover:bg-espresso/5 hover:text-espresso h-12"
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-charcoal/55 text-center">
                    Al enviar, aceptas ser contactado por nuestro equipo para confirmar la disponibilidad.
                  </p>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
