"use client";

import { motion } from "framer-motion";
import { ChevronDown, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RESTAURANT } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-espresso"
      aria-label="Bienvenida a El Arriero"
    >
      {/* Background image — real El Arriero interior */}
      <div className="absolute inset-0">
        <Image
          src="/media/hero-restaurant.jpg"
          alt="Interior del restaurante El Arriero en Santa Cruz de la Sierra"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        {/* Darkening gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/55 to-espresso" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-transparent to-espresso/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Recognition pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-espresso/40 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-brass">
            <Star className="h-3.5 w-3.5 fill-brass" />
            <span>{RESTAURANT.recognition}</span>
          </div>

          {/* Wordmark */}
          <div className="relative w-full max-w-md sm:max-w-lg">
            <Image
              src="/media/logo-cow.png"
              alt="El Arriero — marca con vaca"
              width={400}
              height={260}
              className="mx-auto w-40 sm:w-52 h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] text-balance">
            {RESTAURANT.taglineEs}
          </h1>

          {/* Subline */}
          <p className="max-w-2xl text-base sm:text-lg text-cream/80 leading-relaxed text-pretty">
            Parrilla argentina con sello boliviano desde 1989. Cortes premium a la leña,
            chimichurri de la casa y la calidez cruceña en cada mesa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Button
              asChild
              size="lg"
              className="bg-ember hover:bg-ember/90 text-cream ember-glow border-0 px-8 text-base font-medium tracking-wide"
            >
              <a href="#reservas">Reservar mesa</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/30 text-cream bg-transparent hover:bg-cream/10 hover:text-cream hover:border-cream/60 px-8 text-base font-medium tracking-wide"
            >
              <a href="#carta">Ver la carta</a>
            </Button>
          </div>

          {/* Quick facts */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-brass">1989</div>
              <div className="text-xs uppercase tracking-widest text-cream/60 mt-1">Tradición</div>
            </div>
            <div className="border-x border-cream/15 px-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-brass flex items-center justify-center gap-1.5">
                <Flame className="h-5 w-5" /> Leña
              </div>
              <div className="text-xs uppercase tracking-widest text-cream/60 mt-1">Fuego auténtico</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-brass">Top 10</div>
              <div className="text-xs uppercase tracking-widest text-cream/60 mt-1">Bolivia</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#historia"
          aria-label="Bajar a la historia"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/50 hover:text-cream transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Descubre</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
