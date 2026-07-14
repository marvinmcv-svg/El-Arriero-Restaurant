"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonios"
      className="relative bg-espresso py-20 sm:py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative */}
      <div className="pointer-events-none absolute top-10 left-10 text-brass/5">
        <Quote className="h-32 w-32 sm:h-40 sm:w-40" />
      </div>
      <div className="pointer-events-none absolute bottom-10 right-10 text-brass/5 rotate-180">
        <Quote className="h-32 w-32 sm:h-40 sm:w-40" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-brass text-xs uppercase tracking-[0.25em] mb-4">
            <span className="h-px w-8 bg-brass/60" />
            Testimonios
            <span className="h-px w-8 bg-brass/60" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight text-balance"
          >
            Lo que dicen nuestros comensales
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative min-h-[280px] sm:min-h-[260px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonios de clientes"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              {/* Stars */}
              <div
                className="flex justify-center gap-1 mb-5"
                aria-label={`${active.rating} de 5 estrellas`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < active.rating ? "fill-brass text-brass" : "text-cream/20"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-cream/95 leading-relaxed italic text-balance px-2 sm:px-8">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-7 flex flex-col items-center gap-1">
                <div className="text-sm font-semibold text-brass uppercase tracking-wider">
                  {active.author}
                </div>
                <div className="text-xs text-cream/60">
                  {active.origin} · {active.source}
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            className="h-10 w-10 rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10 hover:text-cream hover:border-cream/40 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-ember" : "w-2 bg-cream/30 hover:bg-cream/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="h-10 w-10 rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10 hover:text-cream hover:border-cream/40 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
