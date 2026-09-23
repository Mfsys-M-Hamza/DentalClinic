import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, CheckCircle2, ClipboardList, Clock, HeartHandshake, Users } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { services, serviceBySlug, serviceImage } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { serviceMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceIcons } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { Container } from "@/components/ui/Layout";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} in ${clinicConfig.seo.primaryCity}`,
    description: `${service.short} Learn what ${service.name.toLowerCase()} involves at ${clinicConfig.name}.`,
    path: `/services/${service.slug}`,
  });
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed">
          <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const message = serviceMessage(service.name);
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const relatedFallback = related.length ? related : services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const posts = blogPosts.filter((p) => p.relatedServices.includes(service.slug));

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />
      <PageHero
        eyebrow={service.category}
        title={service.name}
        description={service.short}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      >
        <Button href={`/book-appointment?service=${service.slug}`} size="lg">
          <CalendarCheck className="size-5" aria-hidden="true" /> Book an Appointment
        </Button>
        <WhatsAppButton size="lg" message={message} label="Ask about this on WhatsApp" />
      </PageHero>

      <Section className="!pt-0 !pb-8">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-lift">
          <Photo src={serviceImage(service.slug)} alt="" ratio="aspect-[21/9]" sizes="100vw" priority />
        </Reveal>
      </Section>

      <Section labelledBy="overview-heading">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 id="overview-heading" className="text-3xl font-semibold">
                Overview
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{service.overview}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-semibold">Who may need {service.name.toLowerCase()}?</h2>
              <div className="mt-5">
                <BulletList items={service.whoNeeds} />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-semibold">Potential benefits</h2>
              <div className="mt-5">
                <BulletList items={service.benefits} />
              </div>
              <p className="mt-4 text-sm text-muted">Outcomes vary between individuals, and no specific result can be guaranteed.</p>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="space-y-5 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand text-white">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <div className="flex gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Expected duration</h3>
                  <p className="text-muted">{service.duration}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Consultation first</h3>
                  <p className="text-muted">Your dentist will assess whether this treatment is suitable for you.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button href={`/book-appointment?service=${service.slug}`}>Request an appointment</Button>
                <WhatsAppButton message={message} variant="secondary" label="WhatsApp us" />
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="sand" labelledBy="process-heading">
        <SectionHeading id="process-heading" eyebrow="Treatment process" title="What to expect, step by step" />
        <Stagger as="ol" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100">
              <span className="grid size-10 place-items-center rounded-full bg-brand text-lg font-semibold text-white">{i + 1}</span>
              <h3 className="mt-4 font-serif text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="care-heading">
        <h2 id="care-heading" className="sr-only">
          Preparation and aftercare
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-brand-100">
            <ClipboardList className="size-8 text-brand" aria-hidden="true" />
            <h3 className="mt-3 font-serif text-2xl font-semibold">Preparing for your visit</h3>
            <div className="mt-5">
              <BulletList items={service.preparation} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-brand-100">
            <HeartHandshake className="size-8 text-brand" aria-hidden="true" />
            <h3 className="mt-3 font-serif text-2xl font-semibold">Aftercare guidance</h3>
            <div className="mt-5">
              <BulletList items={service.aftercare} />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" labelledBy="faq-heading">
        <SectionHeading id="faq-heading" eyebrow="FAQs" title={`Questions about ${service.name.toLowerCase()}`} />
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={service.faqs} />
          <p className="mt-6 text-center text-sm text-muted">
            More questions? See our{" "}
            <Link href="/faq" className="font-semibold text-brand-700 underline underline-offset-4">
              full FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-4">
              contact the clinic
            </Link>
            .
          </p>
        </div>
      </Section>

      {posts.length > 0 && (
        <Section labelledBy="posts-heading">
          <SectionHeading id="posts-heading" eyebrow="Related reading" title="From our blog" />
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <StaggerItem key={p.slug}>
                <BlogCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section tone="sand" labelledBy="related-heading">
        <SectionHeading id="related-heading" eyebrow="Related services" title="You may also be interested in" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {relatedFallback.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Container className="space-y-4 pt-10">
        {service.slug === "emergency-dental-care" && <EmergencyNotice />}
        <MedicalDisclaimer />
      </Container>

      <CTASection
        title={`Interested in ${service.name.toLowerCase()}?`}
        description="Request an appointment or message us — your dentist will talk through whether it's right for you."
        whatsappMessage={message}
      />
    </>
  );
}
