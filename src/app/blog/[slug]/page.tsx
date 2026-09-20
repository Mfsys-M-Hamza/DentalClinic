import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User } from "lucide-react";
import { blogPosts, formatPostDate, postBySlug } from "@/data/blog";
import { serviceBySlug } from "@/data/services";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { MedicalDisclaimer } from "@/components/sections/Notices";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = postBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServices.map(serviceBySlug).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <article>
        <header className="bg-gradient-to-b from-sand/70 via-brand-50 to-white">
          <Container className="max-w-4xl py-12 sm:py-16">
            <Breadcrumbs
              className="mb-6"
              items={[
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <Reveal y={14}>
              <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">{post.category}</p>
              <h1 className="mt-3 text-4xl leading-[1.1] font-semibold sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <User className="size-4" aria-hidden="true" /> {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" /> {post.readTime}
                </span>
              </p>
            </Reveal>
          </Container>
        </header>

        <Container className="max-w-4xl">
          <Reveal>
            <Photo
              src={post.image}
              alt={`Illustration for the article “${post.title}”`}
              ratio="aspect-[16/9]"
              className="rounded-[2rem] shadow-lift"
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority
            />
          </Reveal>

          <div className="mx-auto max-w-3xl py-12">
            {post.sections.map((s) => (
              <section key={s.heading} className="mb-10">
                <h2 className="text-2xl font-semibold sm:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-ink/85">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink/85 marker:text-brand">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {relatedServices.length > 0 && (
              <aside className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100" aria-label="Related treatments">
                <h2 className="font-serif text-xl font-semibold">Related treatments</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand/20 transition hover:bg-brand hover:text-white"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">
                  Have questions? Read our{" "}
                  <Link href="/faq" className="font-semibold text-brand-700 underline underline-offset-4">
                    FAQs
                  </Link>{" "}
                  or{" "}
                  <Link href="/book-appointment" className="font-semibold text-brand-700 underline underline-offset-4">
                    request an appointment
                  </Link>
                  .
                </p>
              </aside>
            )}
            <MedicalDisclaimer className="mt-8" />
          </div>
        </Container>
      </article>

      <Section tone="sand" labelledBy="more-heading">
        <SectionHeading id="more-heading" eyebrow="Keep reading" title="More from our blog" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {morePosts.map((p) => (
            <StaggerItem key={p.slug}>
              <BlogCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTASection />
    </>
  );
}
