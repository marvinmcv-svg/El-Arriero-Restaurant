"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MENU, MENU_CATEGORIES } from "@/lib/data";

export function Menu() {
  const [active, setActive] = useState<string>(MENU_CATEGORIES[0]);
  const items = MENU.filter((m) => m.category === active);

  return (
    <section
      id="carta"
      className="relative bg-espresso py-20 sm:py-28 overflow-hidden"
      aria-labelledby="menu-heading"
    >
      {/* Decorative flame accents */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-ember/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 bg-brass/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-brass text-xs uppercase tracking-[0.25em] mb-4">
            <Flame className="h-4 w-4" />
            <span>La carta</span>
            <Flame className="h-4 w-4" />
          </div>
          <h2
            id="menu-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight text-balance"
          >
            Cortes a la parrilla, con sello boliviano
          </h2>
          <p className="mt-4 text-cream/70 text-base sm:text-lg leading-relaxed text-pretty">
            Seleccionados de proveedores certificados, madurados en seco y sellados al fuego de leña.
            Todos los cortes incluyen chimichurri de la casa.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                active === cat
                  ? "bg-ember text-cream ember-glow"
                  : "bg-cream/5 text-cream/70 hover:bg-cream/10 hover:text-cream border border-cream/10"
              }`}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {items.map((item) => (
              <article
                key={item.id}
                className="group relative bg-charcoal/40 border border-cream/10 rounded-sm overflow-hidden flex flex-col hover:border-ember/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ember/10"
              >
                {/* Image */}
                {item.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 bg-ember text-cream border-0 hover:bg-ember text-[10px] uppercase tracking-wider font-semibold"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-charcoal/60 to-charcoal flex items-center justify-center">
                    <Flame className="h-10 w-10 text-ember/40" />
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 bg-ember text-cream border-0 hover:bg-ember text-[10px] uppercase tracking-wider font-semibold"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-cream leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-display text-base sm:text-lg font-bold text-brass whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-cream/65 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-cream/60 text-sm mb-4">
            Esta es una selección. La carta completa te espera en el restaurante.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brass/40 text-brass bg-transparent hover:bg-brass/10 hover:text-brass hover:border-brass px-8 text-base"
          >
            <a href="#reservas">Reserva para vivir la experiencia</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
