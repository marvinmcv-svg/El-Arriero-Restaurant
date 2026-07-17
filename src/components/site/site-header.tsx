"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NAV_ITEMS, RESTAURANT } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-espresso/95 backdrop-blur-md shadow-lg shadow-black/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-3 shrink-0">
            <div className="relative h-12 w-auto">
              <Image
                src="/media/logo.png"
                alt="El Arriero — logo"
                width={180}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-underline text-sm font-medium uppercase tracking-wider text-cream/90 hover:text-cream transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${RESTAURANT.contact.phonePrimary}`}
              className="flex items-center gap-2 text-sm text-cream/80 hover:text-ember transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{RESTAURANT.contact.phonePrimaryDisplay}</span>
            </a>
            <Button asChild size="sm" className="bg-ember hover:bg-ember/90 text-cream ember-glow border-0">
              <a href="#reservas">Reservar</a>
            </Button>
          </div>

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-cream hover:bg-cream/10 hover:text-cream"
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm bg-espresso border-l border-brass/20 text-cream flex flex-col p-0"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex items-center justify-between p-5 border-b border-cream/10">
                <Image
                  src="/media/logo.png"
                  alt="El Arriero"
                  width={140}
                  height={36}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col p-4 gap-1 overflow-y-auto scroll-elegant">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="px-4 py-3 rounded-md text-base font-medium text-cream/90 hover:bg-cream/10 hover:text-ember transition-colors uppercase tracking-wide"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-5 border-t border-cream/10 space-y-3">
                <Button asChild className="w-full bg-ember hover:bg-ember/90 text-cream border-0">
                  <a href="#reservas">Reservar mesa</a>
                </Button>
                <a
                  href={`tel:${RESTAURANT.contact.phonePrimary}`}
                  className="flex items-center justify-center gap-2 text-sm text-cream/80 hover:text-cream"
                >
                  <Phone className="h-4 w-4" />
                  {RESTAURANT.contact.phonePrimaryDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
