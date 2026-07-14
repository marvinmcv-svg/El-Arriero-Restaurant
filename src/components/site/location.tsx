"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

export function Location() {
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success">("idle");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.subject || !contact.message) {
      toast.error("Completa todos los campos obligatorios.");
      return;
    }
    setContactStatus("loading");
    let succeeded = false;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Error al enviar");
      succeeded = true;
      setContactStatus("success");
      toast.success("¡Mensaje enviado!", {
        description: "Te responderemos pronto.",
      });
      setContact({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("No se pudo enviar", {
        description: err instanceof Error ? err.message : "Intenta nuevamente.",
      });
      setContactStatus("idle");
    } finally {
      if (!succeeded) setContactStatus("idle");
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    RESTAURANT.address.mapsQuery
  )}&output=embed`;

  return (
    <section
      id="ubicacion"
      className="relative bg-cream py-20 sm:py-28 grain-overlay"
      aria-labelledby="location-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-ember text-xs uppercase tracking-[0.25em] mb-4">
            <MapPin className="h-4 w-4" />
            <span>Ubicación & Contacto</span>
            <MapPin className="h-4 w-4" />
          </div>
          <h2
            id="location-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight text-balance"
          >
            Visítanos en Equipetrol
          </h2>
          <p className="mt-4 text-charcoal/75 text-base sm:text-lg text-pretty">
            En el corazón de Santa Cruz de la Sierra, te esperamos con la parrilla encendida.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: Map + info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden shadow-xl shadow-espresso/20 border border-espresso/10">
              <iframe
                title="Ubicación de El Arriero en Google Maps"
                src={mapSrc}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="bg-white border border-espresso/10 rounded-sm p-5">
                <div className="flex items-center gap-2 text-ember mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Dirección</span>
                </div>
                <p className="text-sm text-charcoal/85 leading-relaxed">
                  {RESTAURANT.address.line1}
                  <br />
                  {RESTAURANT.address.city}, {RESTAURANT.address.country}
                </p>
              </div>

              {/* Hours */}
              <div className="bg-white border border-espresso/10 rounded-sm p-5">
                <div className="flex items-center gap-2 text-ember mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Horarios</span>
                </div>
                <ul className="text-sm text-charcoal/85 space-y-1">
                  {RESTAURANT.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-2">
                      <span className="text-charcoal/70">{h.day}</span>
                      <span className="font-mono text-xs">{h.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phones */}
              <div className="bg-white border border-espresso/10 rounded-sm p-5">
                <div className="flex items-center gap-2 text-ember mb-2">
                  <Phone className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Teléfonos</span>
                </div>
                <ul className="text-sm text-charcoal/85 space-y-1">
                  <li>
                    <a
                      href={`tel:${RESTAURANT.contact.phonePrimary}`}
                      className="hover:text-ember transition-colors"
                    >
                      {RESTAURANT.contact.phonePrimaryDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${RESTAURANT.contact.phoneSecondary}`}
                      className="hover:text-ember transition-colors"
                    >
                      {RESTAURANT.contact.phoneSecondaryDisplay}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Email + WhatsApp */}
              <div className="bg-white border border-espresso/10 rounded-sm p-5">
                <div className="flex items-center gap-2 text-ember mb-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Contacto</span>
                </div>
                <ul className="text-sm text-charcoal/85 space-y-1.5">
                  <li>
                    <a
                      href={`mailto:${RESTAURANT.contact.email}`}
                      className="hover:text-ember transition-colors break-all"
                    >
                      {RESTAURANT.contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${RESTAURANT.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ember hover:text-brass transition-colors font-medium"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-espresso rounded-sm p-6 sm:p-8 h-full">
              <h3 className="font-display text-2xl font-bold text-cream mb-1">
                Escríbenos
              </h3>
              <p className="text-cream/65 text-sm mb-6">
                ¿Tienes una pregunta especial? Cuéntanos, te responderemos a la brevedad.
              </p>

              {contactStatus === "success" ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-14 w-14 rounded-full bg-ember/20 flex items-center justify-center mb-4">
                    <Check className="h-7 w-7 text-ember" />
                  </div>
                  <h4 className="font-display text-xl font-semibold text-cream">¡Mensaje enviado!</h4>
                  <p className="mt-2 text-cream/70 text-sm max-w-xs mx-auto">
                    Gracias por escribirnos. Te responderemos muy pronto.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setContactStatus("idle")}
                    variant="outline"
                    className="mt-5 border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name" className="text-xs uppercase tracking-wider text-cream/80">
                        Nombre *
                      </Label>
                      <Input
                        id="c-name"
                        value={contact.name}
                        onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Tu nombre"
                        className="bg-charcoal/40 border-cream/15 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-xs uppercase tracking-wider text-cream/80">
                        Teléfono
                      </Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+591 ..."
                        className="bg-charcoal/40 border-cream/15 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-email" className="text-xs uppercase tracking-wider text-cream/80">
                      Correo *
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                      placeholder="tu@correo.com"
                      className="bg-charcoal/40 border-cream/15 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-subject" className="text-xs uppercase tracking-wider text-cream/80">
                      Asunto *
                    </Label>
                    <Input
                      id="c-subject"
                      value={contact.subject}
                      onChange={(e) => setContact((p) => ({ ...p, subject: e.target.value }))}
                      placeholder="Sobre qué nos escribes"
                      className="bg-charcoal/40 border-cream/15 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-message" className="text-xs uppercase tracking-wider text-cream/80">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="c-message"
                      value={contact.message}
                      onChange={(e) => setContact((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Tu mensaje..."
                      className="bg-charcoal/40 border-cream/15 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember min-h-28 resize-y"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactStatus === "loading"}
                    className="w-full bg-ember hover:bg-ember/90 text-cream ember-glow border-0 h-12 text-base font-medium"
                  >
                    {contactStatus === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
