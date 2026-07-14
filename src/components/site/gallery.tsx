"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Instagram, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GALLERY, RESTAURANT } from "@/lib/data";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const spanClass = (span?: string) => {
    if (span === "tall") return "sm:row-span-2";
    if (span === "wide") return "sm:col-span-2";
    return "";
  };

  return (
    <section
      id="galeria"
      className="relative bg-cream py-20 sm:py-28 grain-overlay"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-ember text-xs uppercase tracking-[0.25em] mb-3">
              <span className="h-px w-8 bg-ember/60" />
              Galería
            </div>
            <h2
              id="gallery-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight text-balance"
            >
              El Arriero, en cada detalle
            </h2>
            <p className="mt-3 text-charcoal/70 text-base sm:text-lg max-w-xl text-pretty">
              Una mirada a nuestros cortes, nuestra casa y los momentos que se viven alrededor de la parrilla.
            </p>
          </motion.div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-espresso/30 text-espresso bg-transparent hover:bg-espresso/5 hover:text-espresso hover:border-espresso/60 self-start sm:self-auto"
          >
            <a
              href={RESTAURANT.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              {RESTAURANT.socials.instagramHandle}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </Button>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {GALLERY.map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-sm bg-charcoal/10 cursor-pointer ${spanClass(item.span)}`}
              aria-label={`Abrir imagen: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left">
                <p className="text-cream text-[11px] sm:text-xs font-medium leading-tight line-clamp-2">
                  {item.caption}
                </p>
              </div>
              <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-cream/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-3.5 w-3.5 text-cream" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Instagram CTA at bottom */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/60 text-sm">
            Síguenos en Instagram para ver más de nuestra parrilla y novedades.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-espresso/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen"
          >
            <button
              className="absolute top-5 right-5 h-10 w-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar visor"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={GALLERY[lightbox].src}
                  alt={GALLERY[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-cream/85 text-sm sm:text-base">
                {GALLERY[lightbox].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
