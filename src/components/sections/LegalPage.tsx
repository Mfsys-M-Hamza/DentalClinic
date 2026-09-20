import { Info } from "lucide-react";
import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Layout";

export interface LegalSection {
  heading: string;
  body: string[];
}

/** Shared layout for the privacy policy and terms pages. */
export function LegalPage({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} description={intro} crumbs={[{ name: title, path }]} />
      <Container className="max-w-3xl py-12 sm:py-16">
        <p className="mb-8 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 ring-1 ring-amber-200">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            This is a general template provided for convenience and is not legal advice. Have it reviewed and adapted by a
            qualified professional to meet the laws that apply to your clinic and region before publishing.
          </span>
        </p>
        <p className="text-sm text-muted">Last updated: {updated}</p>
        {sections.map((s, i) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-2xl font-semibold">
              {i + 1}. {s.heading}
            </h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </section>
        ))}
      </Container>
    </>
  );
}
