import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems } from "@/data/gallery";
import { CTASection } from "@/components/sections/CTASection";
import { MedicalDisclaimer } from "@/components/sections/Notices";

export const metadata: Metadata = buildMetadata({
  title: "Before and After Gallery",
  description: `Browse before and after examples of dental treatment at ${clinicConfig.name}. Shared with patient consent; individual results vary.`,
  path: "/gallery",
});

export default function GalleryPage() {
  const featured = galleryItems[0];
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Before and after"
        description="Examples of treatment carried out at the clinic. Every patient is different, so results can't be predicted from these images."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />

      <Section tone="sand" className="!py-12">
        <Reveal className="mx-auto max-w-3xl">
          <p className="mb-3 text-center text-sm font-semibold tracking-[0.14em] text-brand uppercase">Try the comparison slider</p>
          <div className="rounded-[2rem] bg-white p-3 shadow-lift">
            <BeforeAfterSlider before={featured.before} after={featured.after} alt={featured.alt} />
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="gallery-grid">
        <h2 id="gallery-grid" className="sr-only">
          All treatment comparisons
        </h2>
        <GalleryBrowser />
      </Section>

      <Container className="space-y-4 pb-10">
        <aside className="flex gap-4 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100" aria-label="Patient consent notice">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-muted">
            <p className="font-semibold text-ink">Patient consent &amp; honesty</p>
            <p className="mt-1">
              Images are published only with the written consent of the patient, and are not retouched or altered. Results
              depend on each person&apos;s individual circumstances and can&apos;t be guaranteed. The images currently shown
              are <strong>placeholder samples</strong> and do not represent real patients.
            </p>
          </div>
        </aside>
        <MedicalDisclaimer />
      </Container>
      <CTASection />
    </>
  );
}
