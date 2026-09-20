import type { Metadata } from "next";
import Link from "next/link";
import { Award, Heart, MessageCircle, Sparkles } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { CTASection } from "@/components/sections/CTASection";
import { MedicalDisclaimer } from "@/components/sections/Notices";
import { FacilitiesSection, TeamPreview } from "@/components/home/HomeSections";
import { Container } from "@/components/ui/Layout";

const { name, seo, doctor } = clinicConfig;

export const metadata: Metadata = buildMetadata({
  title: `About ${name}`,
  description: `Meet the team behind ${name}, a patient-focused dental clinic in ${seo.primaryCity}. Learn about our approach, values and facilities.`,
  path: "/about",
});

const values = [
  { icon: MessageCircle, title: "Honest communication", text: "We explain what we see and what your options are, in plain language and without pressure." },
  { icon: Heart, title: "Comfort and respect", text: "Every patient is different. We move at your pace and welcome your questions." },
  { icon: Sparkles, title: "Quality of care", text: "We plan treatment carefully and follow up so you know what to expect at every stage." },
  { icon: Award, title: "Ongoing learning", text: "We aim to keep our knowledge and techniques up to date so patients receive careful, modern care." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title={`Care that starts with listening`}
        description={`${name} is a patient-focused dental practice serving ${seo.primaryCity} and ${seo.serviceArea}. ${clinicConfig.tagline}`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section labelledBy="story-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="story-heading" className="text-3xl font-semibold sm:text-4xl">
              Our story
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Dental Studio by Dr. Laila is a dental clinic in Bahria Town Phase 7, Rawalpindi, where patient comfort and skilled treatment come first. Our team offers teeth whitening, fillings, scaling and polishing, PRP treatment and braces.
              </p>
              <p>
                We combine modern dental techniques with an approach that treats every patient as an individual. From
                your first phone call to your follow-up visit, our goal is simple: to help you feel informed, comfortable
                and in control of your care.
              </p>
              <p>
                Located in {seo.primaryCity}, we welcome families and individuals from across {seo.serviceArea}.
              </p>
            </div>
            <Button href="/book-appointment" className="mt-8">
              Book a first visit
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <Photo src={clinicConfig.images.about} alt="Comfortable waiting area inside the clinic" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="What we value" title="How we care for patients" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="lead-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Photo src="/images/team-1.svg" alt={`Portrait of ${doctor.name}`} ratio="aspect-[4/5]" className="rounded-[2rem] shadow-lift" sizes="(min-width: 1024px) 35vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">{doctor.role}</p>
            <h2 id="lead-heading" className="text-3xl font-semibold sm:text-4xl">
              {doctor.name}
            </h2>
            {doctor.qualifications && <p className="mt-2 text-muted">{doctor.qualifications}</p>}
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {doctor.name} founded the clinic with a simple aim: dental care that feels comfortable, is clearly explained and is planned around each patient. She works alongside Dr. Minahil, Dr. Numrah and Dr. Warda.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {clinicConfig.home.stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-serif text-2xl font-semibold text-brand-700">
                    <Counter value={s.value} />
                  </dd>
                  <dt className="text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">
              See the{" "}
              <Link href="/team" className="font-semibold text-brand-700 underline underline-offset-4">
                full team
              </Link>{" "}
              or explore our{" "}
              <Link href="/services" className="font-semibold text-brand-700 underline underline-offset-4">
                services
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <FacilitiesSection />
      <TeamPreview />
      <Container className="py-10">
        <MedicalDisclaimer />
      </Container>
      <CTASection />
    </>
  );
}
