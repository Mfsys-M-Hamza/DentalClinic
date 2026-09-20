import type { Metadata } from "next";
import { clinicConfig } from "../clinic-config";
import { digitsOnly } from "./utils";

const { seo, name, contact, hours, social } = clinicConfig;

export const siteUrl = seo.siteUrl.replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return path.startsWith("http") ? path : `${siteUrl}${path === "/" ? "" : path}`;
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/** Per-page metadata: title, description, canonical, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path, image, type = "website", publishedTime }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url,
      siteName: name,
      type,
      locale: seo.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${name} — ${title}` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${name}`,
      description,
      images: [ogImage],
    },
  };
}

/* ── Structured data (JSON-LD) ─────────────────────────────────────────── */

const DAY_URIS: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    "@id": `${siteUrl}/#clinic`,
    name,
    description: seo.defaultDescription,
    url: siteUrl,
    image: absoluteUrl("/opengraph-image"),
    telephone: contact.phone,
    ...(contact.email ? { email: contact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: seo.primaryCity,
      addressCountry: contact.cityCountry,
    },
    areaServed: seo.serviceArea,
    hasMap: contact.mapsUrl,
    openingHoursSpecification: hours.schedule
      .filter((d) => d.open && d.close)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_URIS[d.day],
        opens: d.open,
        closes: d.close,
      })),
    sameAs: [social.facebook, social.instagram].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${digitsOnly(contact.whatsapp)}`,
        contactType: "customer service",
        availableLanguage: clinicConfig.languages,
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(post.image),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name, url: siteUrl },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function serviceSchema(service: { name: string; overview: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.overview,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${siteUrl}/#clinic` },
  };
}
