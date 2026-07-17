"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Star } from "lucide-react";
import { AWARDS } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="reconocimientos"
      className="relative bg-gradient-to-b from-cream to-cream/95 py-20 sm:py-28 grain-overlay"
      aria-labelledby="awards-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-ember text-xs uppercase tracking-[0.25em] mb-4">
            <Award className="h-4 w-4" />
            <span>Reconocimientos</span>
            <Award className="h-4 w-4" />
          </div>
          <h2
            id="awards-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight text-balance"
          >
            Tres décadas de oficio, premiadísimas
          </h2>
          <p className="mt-4 text-charcoal/75 text-base sm:text-lg leading-relaxed text-pretty">
            Cada reconocimiento es el resultado de años de dedicación a la parrilla y a quien se sienta en nuestra mesa.
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AWARDS.map((award, i) => (
            <motion.article
              key={award.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-white border border-espresso/10 rounded-sm p-7 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-espresso/10 hover:border-ember/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Certificate image */}
              <div className="relative h-32 w-auto mb-5 flex items-center justify-center">
                <Image
                  src={award.image}
                  alt={`${award.title} — ${award.issuer}`}
                  width={120}
                  height={140}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-brass font-semibold mb-2">
                <Star className="h-3 w-3 fill-brass" />
                {award.issuer}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-espresso leading-tight">
                {award.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{award.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-espresso/10 rounded-sm overflow-hidden border border-espresso/10"
        >
          {[
            { stat: "30+", label: "Años de tradición" },
            { stat: "#4", label: "De 300 restaurantes en Santa Cruz" },
            { stat: "4.5", label: "Estrellas en Tripadvisor" },
            { stat: "100%", label: "Carne boliviana certificada" },
          ].map((s) => (
            <div key={s.label} className="bg-cream p-6 sm:p-7 text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-ember leading-none">
                {s.stat}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-charcoal/70 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
