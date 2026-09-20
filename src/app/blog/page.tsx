import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Dental Health Blog",
  description: `Practical, patient-friendly dental advice from the team at ${clinicConfig.name} in ${clinicConfig.seo.primaryCity}.`,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Dental health, explained simply"
        description="Helpful articles on caring for your teeth, preparing for treatment and knowing what to expect."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <Section labelledBy="posts-list">
        <h2 id="posts-list" className="sr-only">
          Latest articles
        </h2>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <StaggerItem key={p.slug}>
              <BlogCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTASection />
    </>
  );
}
