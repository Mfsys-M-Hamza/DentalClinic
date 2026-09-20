import type { Metadata } from "next";
import { Mail, MapPin, Phone, Siren } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";
import { telHref } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ContactInfoCard } from "@/components/sections/ContactInfoCard";
import { MapSection } from "@/components/sections/MapSection";
import { CTASection } from "@/components/sections/CTASection";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";
import { WhatsAppIcon } from "@/components/ui/icons";

const { contact, seo, name } = clinicConfig;

export const metadata: Metadata = buildMetadata({
  title: `Contact ${name}`,
  description: `Call, message or visit ${name} in ${seo.primaryCity}. Find our address, opening hours, WhatsApp and emergency contact details.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description={`Call, message us on WhatsApp or visit the clinic in ${seo.primaryCity}. We serve patients from ${seo.serviceArea}.`}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Section labelledBy="contact-methods" className="!pb-8">
        <h2 id="contact-methods" className="sr-only">
          Ways to contact us
        </h2>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <ContactInfoCard icon={Phone} title="Call us" lines={[contact.phone]} href={telHref(contact.phone)} actionLabel="Call the clinic" />
          </StaggerItem>
          <StaggerItem>
            <ContactInfoCard
              icon={WhatsAppIcon}
              title="WhatsApp"
              lines={["Message us any time — we reply during opening hours."]}
              href={whatsappUrl(generalMessage())}
              actionLabel="Start a chat"
              external
            />
          </StaggerItem>
          {contact.email && (
            <StaggerItem>
              <ContactInfoCard icon={Mail} title="Email" lines={[contact.email]} href={`mailto:${contact.email}`} actionLabel="Send an email" />
            </StaggerItem>
          )}
          <StaggerItem>
            <ContactInfoCard
              icon={MapPin}
              title="Visit us"
              lines={[contact.address, contact.cityCountry]}
              href={contact.mapsUrl}
              actionLabel="Get directions"
              external
            />
          </StaggerItem>
          <StaggerItem>
            <ContactInfoCard
              icon={Siren}
              title="Emergency line"
              lines={[contact.emergencyPhone]}
              href={telHref(contact.emergencyPhone)}
              actionLabel="Call emergency line"
            />
          </StaggerItem>
        </Stagger>
      </Section>
      <Container className="py-6">
        <EmergencyNotice />
      </Container>
      <MapSection heading={false} />
      <Container className="py-10">
        <MedicalDisclaimer />
      </Container>
      <CTASection title="Prefer to book online?" />
    </>
  );
}
