import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { allFaqs } from "@/data/faqs";
import { faqSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/home/Hero";
import {
  AboutPreview,
  FAQPreview,
  FacilitiesSection,
  GalleryPreview,
  InsurancePayments,
  PopularServices,
  TeamPreview,
  TestimonialsSection,
  TreatmentProcess,
  WhyChooseUs,
} from "@/components/home/HomeSections";
import { CTASection } from "@/components/sections/CTASection";
import { MapSection } from "@/components/sections/MapSection";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";
import { Container } from "@/components/ui/Layout";

const { seo, name } = clinicConfig;

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${name} — Dental Care in ${seo.primaryCity}`,
    description: `${seo.defaultDescription} Serving ${seo.serviceArea}.`,
    path: "/",
  }),
  title: { absolute: `${name} — Dental Care in ${seo.primaryCity}` },
};

const previewFaqs = allFaqs.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(previewFaqs)} />
      <Hero />
      <AboutPreview />
      <PopularServices />
      <WhyChooseUs />
      <TeamPreview />
      <TreatmentProcess />
      <GalleryPreview />
      <FacilitiesSection />
      <InsurancePayments />
      <FAQPreview items={previewFaqs} />
      <TestimonialsSection />
      <CTASection />
      <MapSection />
      <Container className="space-y-4 py-10">
        <EmergencyNotice />
        <MedicalDisclaimer />
      </Container>
    </>
  );
}
