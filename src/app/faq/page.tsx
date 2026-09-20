import type { Metadata } from "next";
import Link from "next/link";
import { clinicConfig } from "@/clinic-config";
import { allFaqs, faqGroups } from "@/data/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: `Answers to common questions about appointments, costs, insurance and comfort at ${clinicConfig.name}.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Your questions, answered"
        description="Everything patients commonly ask before booking. If you can't find what you need, we're a message away."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <Section labelledBy="faq-groups">
        <h2 id="faq-groups" className="sr-only">
          Frequently asked questions
        </h2>
        <div className="mx-auto max-w-3xl space-y-14">
          {faqGroups.map((g) => (
            <Reveal key={g.title}>
              <h3 className="mb-5 text-2xl font-semibold">{g.title}</h3>
              <FAQAccordion items={g.items} />
            </Reveal>
          ))}
          <p className="text-center text-muted">
            Looking for treatment-specific answers? Visit our{" "}
            <Link href="/services" className="font-semibold text-brand-700 underline underline-offset-4">
              services pages
            </Link>{" "}
            or{" "}
            <Link href="/book-appointment" className="font-semibold text-brand-700 underline underline-offset-4">
              book an appointment
            </Link>
            .
          </p>
        </div>
      </Section>
      <Container className="space-y-4 pb-10">
        <EmergencyNotice />
        <MedicalDisclaimer />
      </Container>
      <CTASection title="Still have a question?" description="Send us a WhatsApp message or give us a call — we're happy to help." />
    </>
  );
}
