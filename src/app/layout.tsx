import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "El Arriero · Parrilla Argentina | Santa Cruz de la Sierra, Bolivia",
    template: "%s · El Arriero",
  },
  description:
    "El Arriero — la mejor parrilla de Bolivia desde 1989. Cortes premium a la parrilla con sello boliviano en Equipetrol, Santa Cruz de la Sierra. Reservas: (+591) 78159300.",
  keywords: [
    "El Arriero",
    "parrilla Bolivia",
    "restaurante Santa Cruz",
    "asado argentino",
    "cortes de carne",
    "Best Restaurant Bolivia",
    "Equipetrol",
    "steakhouse Bolivia",
    "reservas Santa Cruz",
  ],
  authors: [{ name: "El Arriero" }],
  creator: "El Arriero",
  publisher: "El Arriero",
  icons: {
    icon: "/media/favicon.png",
    shortcut: "/media/favicon.png",
    apple: "/media/favicon.png",
  },
  manifest: undefined,
  openGraph: {
    title: "El Arriero · Parrilla Argentina en Santa Cruz, Bolivia",
    description:
      "Desde 1989, El Arriero es sinónimo de la mejor carne a la parrilla de Bolivia. Cortes premium, fuego a leña y tradición cruceña.",
    url: "https://elarrierobo.com",
    siteName: "El Arriero",
    locale: "es_BO",
    type: "website",
    images: [
      {
        url: "/media/hero-restaurant.jpg",
        width: 760,
        height: 507,
        alt: "Interior del restaurante El Arriero en Santa Cruz de la Sierra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Arriero · Parrilla Argentina en Santa Cruz, Bolivia",
    description:
      "Desde 1989, la mejor carne a la parrilla de Bolivia. Cortes premium con sello boliviano.",
    images: ["/media/hero-restaurant.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "food",
};

export const viewport = {
  themeColor: "#1A0F0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
