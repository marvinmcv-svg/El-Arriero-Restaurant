import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { Story } from "@/components/site/story";
import { Menu } from "@/components/site/menu-section";
import { Gallery } from "@/components/site/gallery";
import { Experience } from "@/components/site/experience";
import { Testimonials } from "@/components/site/testimonials";
import { Reservations } from "@/components/site/reservations";
import { Location } from "@/components/site/location";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Story />
        <Menu />
        <Gallery />
        <Experience />
        <Testimonials />
        <Reservations />
        <Location />
      </main>
      <SiteFooter />
    </>
  );
}
