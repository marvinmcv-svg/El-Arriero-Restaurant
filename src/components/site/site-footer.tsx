"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone, Mail, Send, Loader2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RESTAURANT, NAV_ITEMS } from "@/lib/data";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Ingresa tu correo electrónico.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Error al suscribir");
      toast.success(data.message || "¡Suscripción exitosa!");
      setEmail("");
    } catch (err) {
      toast.error("No se pudo suscribir", {
        description: err instanceof Error ? err.message : "Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-espresso text-cream mt-auto">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-ember to-transparent" />

      {/* Newsletter band */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream leading-tight">
                Únete a la mesa de El Arriero
              </h3>
              <p className="mt-2 text-cream/70 text-sm sm:text-base">
                Recibe novedades, eventos especiales y promociones exclusivas directamente en tu correo.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-ember focus-visible:ring-ember h-12"
                aria-label="Correo electrónico para newsletter"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-ember hover:bg-ember/90 text-cream ember-glow border-0 h-12 px-6 whitespace-nowrap"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Suscribirme
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/media/logo-footer.png"
              alt="El Arriero — logo"
              width={200}
              height={178}
              className="h-24 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-cream/65 leading-relaxed max-w-xs">
              Parrilla argentina con sello boliviano desde 1989. La carne, siempre igual de buena.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={RESTAURANT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de El Arriero"
                className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-ember hover:border-ember hover:text-cream transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={RESTAURANT.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de El Arriero"
                className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-ember hover:border-ember hover:text-cream transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={RESTAURANT.socials.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tripadvisor de El Arriero"
                className="h-10 px-3 rounded-full border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-ember hover:border-ember hover:text-cream transition-all text-xs font-semibold uppercase tracking-wider"
              >
                TA
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-brass mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-ember transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-brass mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5 text-cream/70">
                <MapPin className="h-4 w-4 mt-0.5 text-ember shrink-0" />
                <span>
                  {RESTAURANT.address.line1}
                  <br />
                  {RESTAURANT.address.city}, {RESTAURANT.address.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${RESTAURANT.contact.phonePrimary}`}
                  className="flex items-center gap-2.5 text-cream/70 hover:text-ember transition-colors"
                >
                  <Phone className="h-4 w-4 text-ember shrink-0" />
                  {RESTAURANT.contact.phonePrimaryDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${RESTAURANT.contact.phoneSecondary}`}
                  className="flex items-center gap-2.5 text-cream/70 hover:text-ember transition-colors"
                >
                  <Phone className="h-4 w-4 text-ember shrink-0" />
                  {RESTAURANT.contact.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESTAURANT.contact.email}`}
                  className="flex items-center gap-2.5 text-cream/70 hover:text-ember transition-colors break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-ember shrink-0" />
                  {RESTAURANT.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-brass mb-4">
              Horarios
            </h4>
            <ul className="space-y-2.5 text-sm">
              {RESTAURANT.hours.map((h) => (
                <li key={h.day} className="text-cream/70">
                  <div className="font-medium text-cream/85">{h.day}</div>
                  <div className="text-xs font-mono text-cream/60">{h.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/55 text-center sm:text-left">
            © {new Date().getFullYear()} El Arriero · Todos los derechos reservados · Santa Cruz de la Sierra, Bolivia
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-cream/60 hover:text-ember transition-colors uppercase tracking-wider"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
