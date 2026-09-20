import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { team } from "@/data/team";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { DentistCard } from "@/components/cards/DentistCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Our Dentists and Team",
  description: `Meet the dentists and care team at ${clinicConfig.name} in ${clinicConfig.seo.primaryCity} — experienced, caring professionals focused on your comfort.`,
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people caring for your smile"
        description="Our dentists and support team share one goal: helping you feel informed, comfortable and confident about your care."
        crumbs={[{ name: "Our Team", path: "/team" }]}
      />
      <Section labelledBy="team-list">
        <h2 id="team-list" className="sr-only">
          Dentists
        </h2>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((d) => (
            <StaggerItem key={d.slug}>
              <DentistCard dentist={d} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTASection title="Book with the dentist you prefer" description="Tell us your preferred dentist in the booking form and we'll do our best to arrange it." />
    </>
  );
}
