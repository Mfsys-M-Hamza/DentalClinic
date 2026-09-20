import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { clinicConfig } from "@/clinic-config";
import { siteUrl, localBusinessSchema } from "@/lib/seo";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

const { name, seo, brand } = clinicConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${name} — Dental Care in ${seo.primaryCity}`,
    template: `%s | ${name}`,
  },
  description: seo.defaultDescription,
  applicationName: name,
  keywords: [seo.primaryKeyword, ...seo.secondaryKeywords, `dentist ${seo.primaryCity}`],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: name,
    locale: seo.locale,
    title: `${name} — Dental Care in ${seo.primaryCity}`,
    description: seo.defaultDescription,
    url: siteUrl,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: brand.primary,
  width: "device-width",
  initialScale: 1,
};

/** Only allow characters that can appear in a CSS colour value. */
const safeColor = (value: string) => value.replace(/[^#a-zA-Z0-9(),.%\s/-]/g, "");

export default function RootLayout({ children }: LayoutProps<"/">) {
  const brandVars = `:root{--brand:${safeColor(brand.primary)};--brand-secondary:${safeColor(brand.secondary)};--brand-accent:${safeColor(brand.accent)};}`;

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandVars }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <TopBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </MotionProvider>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
