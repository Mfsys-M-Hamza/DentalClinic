import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GoogleRatingCard } from "@/components/cards/GoogleRatingCard";
import { CTASection } from "@/components/sections/CTASection";
import { MedicalDisclaimer } from "@/components/sections/Notices";

export const metadata: Metadata = buildMetadata({
  title: "Patient Testimonials",
  description: `Read feedback from patients of ${clinicConfig.name} in ${clinicConfig.seo.primaryCity}.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const hasSamples = testimonials.some((t) => t.isSample);
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Words from our patients"
        description="Feedback shared by patients about their experience at the clinic."
        crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
      />
      <Section labelledBy="testimonial-list">
        <h2 id="testimonial-list" className="sr-only">
          Patient testimonials
        </h2>
        {testimonials.length === 0 ? (
          <GoogleRatingCard />
        ) : (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <TestimonialCard testimonial={t} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
        {hasSamples && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
            Entries marked <strong>Sample</strong> are placeholders. Replace them with genuine, consented patient
            feedback in <code className="rounded bg-brand-50 px-1.5 py-0.5">src/data/testimonials.ts</code>.
          </p>
        )}
      </Section>
      <Container className="pb-10">
        <MedicalDisclaimer />
      </Container>
      <CTASection />
    </>
  );
}
