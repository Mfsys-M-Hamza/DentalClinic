import type { Metadata } from "next";
import { Users } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { team } from "@/data/team";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { DentistCard } from "@/components/cards/DentistCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
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
        {team.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-lift ring-1 ring-brand-100 sm:p-10">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-700">
              <Users className="size-7" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg text-muted">
              We&apos;re adding profiles for our dentists here soon. In the meantime, message us on WhatsApp or call the
              clinic to ask about your dentist.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton />
            </div>
          </div>
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((d) => (
              <StaggerItem key={d.slug}>
                <DentistCard dentist={d} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>
      <CTASection title="Book your visit" description="Call, message us on WhatsApp, or use the booking form and we'll confirm a suitable time." />
    </>
  );
}
