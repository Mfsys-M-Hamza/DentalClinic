import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, ExternalLink, Languages, ShieldCheck, Star, Wallet } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { allFaqs } from "@/data/faqs";
import { galleryItems } from "@/data/gallery";
import { facilities, treatmentProcess, whyChooseUs } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { contentIcons } from "@/components/ui/icons";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { DentistCard } from "@/components/cards/DentistCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { GoogleRatingCard } from "@/components/cards/GoogleRatingCard";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function AboutPreview() {
  const { seo, doctor } = clinicConfig;
  return (
    <Section labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <Photo
              src={clinicConfig.images.about}
              alt="Comfortable waiting area inside the clinic"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 rounded-2xl bg-white p-5 shadow-lift ring-1 ring-brand-100 sm:-right-6">
            <p className="text-xs font-semibold tracking-wider text-brand uppercase">{doctor.role}</p>
            <p className="font-serif text-lg font-semibold">{doctor.name}</p>
            {doctor.qualifications && <p className="text-sm text-muted">{doctor.qualifications}</p>}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">About the clinic</p>
          <h2 id="about-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">
            A calm, welcoming dental practice in {seo.primaryCity}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            At {clinicConfig.name}, we believe good dental care starts with good conversation. We take time to listen,
            explain what we see in plain language, and agree on a plan that fits your health, goals and budget.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Patients from {seo.serviceArea} visit us for everything from routine check-ups to restorative and cosmetic
            treatment, in a clean, comfortable environment.
          </p>
          <ul className="mt-6 space-y-3">
            {["Personalised treatment plans", "Care for every age", "Clear conversations about options and costs"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/about">
              Learn more about us <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="/team" variant="secondary">
              Meet the team
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function PopularServices() {
  const featured = clinicConfig.home.featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <Section tone="sand" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow="Our services"
        title="Popular treatments"
        description="Preventive, restorative and cosmetic care under one roof. Every treatment starts with a conversation about what's right for you."
      />
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <StaggerItem key={s.slug}>
            <ServiceCard service={s} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <Button href="/services" variant="secondary" size="lg">
          View all {services.length} services <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </Reveal>
    </Section>
  );
}

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why choose us"
        title="Care built around you"
        description="What you can expect when you visit — from the first call to your follow-up."
      />
      <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item) => {
          const Icon = contentIcons[item.icon];
          return (
            <StaggerItem key={item.title} className="flex gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export function TeamPreview() {
  return (
    <Section tone="tint" labelledBy="team-heading">
      <SectionHeading
        id="team-heading"
        eyebrow="Our team"
        title="Meet your dentists"
        description="Experienced, caring professionals who take the time to explain your care."
      />
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((d) => (
          <StaggerItem key={d.slug}>
            <DentistCard dentist={d} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function TreatmentProcess() {
  return (
    <Section labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="How it works"
        title="Your journey with us"
        description="A simple, clear path from your first message to lasting oral health."
      />
      <Stagger as="ol" className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {treatmentProcess.map((step, i) => {
          const Icon = contentIcons[step.icon];
          return (
            <StaggerItem as="li" key={step.title} className="relative text-center lg:px-2">
              <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-brand-50 text-brand-700 ring-8 ring-white">
                <Icon className="size-8" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-serif text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export function GalleryPreview() {
  const item = galleryItems[0];
  return (
    <Section tone="sand" labelledBy="gallery-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">Before &amp; after</p>
          <h2 id="gallery-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">
            See the difference careful treatment can make
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Drag the slider to compare. Our gallery shows examples of treatments carried out at the clinic, shared with
            patient consent. Results vary from person to person.
          </p>
          <Button href="/gallery" className="mt-8">
            Browse the full gallery <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <p className="mt-4 text-xs text-muted">Sample placeholder images shown — replace with real, consented patient photos.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-white p-3 shadow-lift">
            <BeforeAfterSlider before={item.before} after={item.after} alt={item.alt} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  const { rating, count, url } = clinicConfig.googleReviews;
  const featured = testimonials.filter((t) => t.featured);
  const shown = featured.length ? featured : testimonials.slice(0, 6);
  return (
    <Section labelledBy="testimonials-heading" className="bg-brand-50/60">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Patient reviews"
        title="What our patients say"
        description="Real feedback from patients, shared publicly on Google."
      />
      {testimonials.length === 0 ? (
        <Reveal>
          <GoogleRatingCard />
        </Reveal>
      ) : (
        <>
          <Reveal className="mx-auto -mt-4 mb-10 flex w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-white px-6 py-3 shadow-soft ring-1 ring-brand-100">
            <span className="font-serif text-3xl font-semibold text-brand-700">{rating}</span>
            <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-5 fill-accent text-accent" aria-hidden="true" />
              ))}
            </span>
            <span className="text-sm text-muted">
              from <strong className="text-ink">{count}</strong> Google reviews
            </span>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((t) => (
              <StaggerItem key={t.name}>
                <TestimonialCard testimonial={t} clamp />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/testimonials" variant="secondary">
              Read all patient reviews
            </Button>
            <Button href={url} external variant="ghost">
              See us on Google <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </>
      )}
    </Section>
  );
}

const facilityAlts = [
  "Fully equipped treatment room with a modern dental chair",
  "Surgery room with natural greenery",
  "Relaxed lounge seating area",
];

export function FacilitiesSection() {
  return (
    <Section tone="brand" labelledBy="facilities-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand-200 uppercase">Facilities &amp; accessibility</p>
          <h2 id="facilities-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">
            Easy to reach, comfortable to visit
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            Located in Bahria Town Phase 7, with step-free access, parking and a comfort-first approach to every visit.
          </p>
          <Stagger as="ul" className="mt-8 grid gap-6 sm:grid-cols-2">
            {facilities.map((f) => {
              const Icon = contentIcons[f.icon];
              return (
                <StaggerItem as="li" key={f.title}>
                  <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-brand-100">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-100">{f.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {clinicConfig.images.facilities.map((src, i) => (
            <div key={src} className={i === 0 ? "col-span-2" : ""}>
              <Photo
                src={src}
                alt={facilityAlts[i] ?? "Inside the clinic"}
                ratio={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="rounded-3xl ring-1 ring-white/20"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

export function InsurancePayments() {
  const { payments, languages, currency } = clinicConfig;
  return (
    <Section labelledBy="payments-heading">
      <SectionHeading
        id="payments-heading"
        eyebrow="Insurance & payment"
        title="Clear, straightforward payment options"
        description="We aim to talk through costs before treatment begins, so there are no surprises."
      />
      <Stagger className="grid gap-6 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Insurance", text: payments.insurance },
          { icon: CreditCard, title: "Payment methods", text: payments.methods.join(" · ") },
          { icon: Wallet, title: "Payment plans", text: payments.financing },
        ].map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{text}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <Languages className="size-4 text-brand" aria-hidden="true" /> Languages spoken: {languages.join(", ")}
        </span>
        <span>Currency: {currency}</span>
      </Reveal>
    </Section>
  );
}

export function FAQPreview({ items = allFaqs.slice(0, 5) }: { items?: typeof allFaqs }) {
  return (
    <Section tone="tint" labelledBy="faq-heading">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">FAQ</p>
          <h2 id="faq-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">
            Questions before you book?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Quick answers to the things patients ask us most. Can&apos;t find yours? Message us on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/faq" variant="secondary">
              All FAQs
            </Button>
            <WhatsAppButton label="Ask us" message={`Hello ${clinicConfig.name}, I have a question before booking.`} />
          </div>
          <p className="mt-6 text-sm text-muted">
            Ready to go?{" "}
            <Link href="/book-appointment" className="font-semibold text-brand-700 underline underline-offset-4">
              Request an appointment
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQAccordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
