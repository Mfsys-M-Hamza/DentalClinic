import type { Metadata } from "next";
import { Images, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CTASection } from "@/components/sections/CTASection";
import { MedicalDisclaimer } from "@/components/sections/Notices";

export const metadata: Metadata = buildMetadata({
  title: "Before and After Gallery",
  description: `Before and after treatment photos from ${clinicConfig.name}, shared only with patient consent.`,
  path: "/gallery",
});

/**
 * The gallery images in src/data/gallery.ts are sample placeholders, not real
 * patients — showing them would be misleading, so this page explains that real,
 * consented photos are coming rather than displaying fake before/after images.
 * Once real photos are added, restore the image grid (see git history for the
 * previous version of this page) and unhide GalleryPreview in HomeSections.tsx.
 */
export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Before and after"
        description="Real treatment photos will appear here once patients have given their written consent to share them."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />

      <Section labelledBy="gallery-status">
        <h2 id="gallery-status" className="sr-only">
          Gallery status
        </h2>
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-lift ring-1 ring-brand-100 sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <Images className="size-7" aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg text-muted">
            We&apos;re building a gallery of real, patient-consented before-and-after photos. Check back soon, or
            message us on WhatsApp if you&apos;d like to see examples of a specific treatment.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton />
          </div>
        </div>
      </Section>

      <Container className="space-y-4 pb-10">
        <aside className="flex gap-4 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100" aria-label="Patient consent notice">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-muted">
            <p className="font-semibold text-ink">Patient consent &amp; honesty</p>
            <p className="mt-1">
              Any photos published here will only ever be shown with the patient&apos;s written consent, and will not
              be retouched or altered. Results depend on each person&apos;s individual circumstances and can&apos;t be
              guaranteed.
            </p>
          </div>
        </aside>
        <MedicalDisclaimer />
      </Container>
      <CTASection />
    </>
  );
}
