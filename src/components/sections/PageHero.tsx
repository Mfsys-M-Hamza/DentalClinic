import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/** Compact hero used at the top of inner pages. Renders the page's single <h1>. */
export function PageHero({
  title,
  description,
  eyebrow,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand/70 via-brand-50 to-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} className="mb-6" />
        <Reveal y={14} className="max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.1] font-semibold sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
