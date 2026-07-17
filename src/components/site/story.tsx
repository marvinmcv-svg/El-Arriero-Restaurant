"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { STORY, RESTAURANT } from "@/lib/data";

export function Story() {
  return (
    <section
      id="historia"
      className="relative bg-cream py-20 sm:py-28 grain-overlay"
      aria-labelledby="story-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6] w-full overflow-hidden rounded-sm shadow-2xl shadow-espresso/30">
              <Image
                src="/media/reservations.jpg"
                alt="Mesa reservada en El Arriero, iluminación cálida y ambiente íntimo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />
            </div>
            {/* Floating year badge */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-espresso text-cream px-6 py-5 rounded-sm shadow-xl">
              <div className="font-display text-3xl sm:text-4xl font-bold text-brass leading-none">
                {RESTAURANT.founded}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cream/70 mt-1.5">
                Desde · {RESTAURANT.founded}
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-ember/50" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 text-ember text-xs uppercase tracking-[0.25em] mb-4">
              <span className="h-px w-8 bg-ember/60" />
              Nuestra historia
            </div>
            <h2
              id="story-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight text-balance"
            >
              {STORY.headline}
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg text-charcoal/85 leading-relaxed">
              {STORY.body.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            {/* Milestones */}
            <div className="mt-10 grid sm:grid-cols-2 gap-x-6 gap-y-5">
              {STORY.milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 items-start border-l-2 border-ember/30 pl-4"
                >
                  <div>
                    <div className="font-display text-xl font-bold text-ember">{m.year}</div>
                    <div className="text-sm font-semibold text-espresso mt-0.5">{m.title}</div>
                    <div className="text-xs text-charcoal/70 mt-1 leading-relaxed">{m.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
