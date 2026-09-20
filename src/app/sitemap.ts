import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/team", priority: 0.7 },
  { path: "/gallery", priority: 0.7 },
  { path: "/book-appointment", priority: 0.9 },
  { path: "/testimonials", priority: 0.6 },
  { path: "/faq", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), priority: r.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.8 })),
    ...blogPosts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
  ];
}
