import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { services, serviceCategories } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = buildMetadata({
  title: `Dental Services in ${clinicConfig.seo.primaryCity}`,
  description: `Explore general, restorative, cosmetic, orthodontic and emergency dental services at ${clinicConfig.name} in ${clinicConfig.seo.primaryCity}.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Dental care for every stage of life"
        description={`From routine check-ups to implants and clear aligners, ${clinicConfig.name} offers a full range of treatments for patients across ${clinicConfig.seo.serviceArea}. Choose a service to learn what it involves.`}
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      {serviceCategories.map((category, i) => {
        const items = services.filter((s) => s.category === category);
        const headingId = `cat-${category.toLowerCase()}`;
        return (
          <Section key={category} tone={i % 2 ? "sand" : "white"} labelledBy={headingId} className="!py-12 sm:!py-16">
            <h2 id={headingId} className="mb-8 text-2xl font-semibold sm:text-3xl">
              {category} care
            </h2>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <StaggerItem key={s.slug}>
                  <ServiceCard service={s} />
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        );
      })}
      <Container className="space-y-4 pt-4 pb-4">
        <EmergencyNotice />
        <MedicalDisclaimer />
      </Container>
      <CTASection title="Not sure which treatment you need?" description="Book a consultation and your dentist will explain the options that may suit you." />
    </>
  );
}
