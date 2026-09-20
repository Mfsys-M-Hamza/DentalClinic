import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "white" | "sand" | "brand" | "tint";

const tones: Record<Tone, string> = {
  white: "bg-white",
  sand: "bg-sand/60",
  tint: "bg-brand-50",
  brand: "bg-brand-900 text-white",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-dark={tone === "brand" ? "" : undefined}
      className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  invert,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            invert ? "text-brand-200" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn("text-3xl leading-tight font-semibold sm:text-4xl", invert ? "text-white" : "text-ink")}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-brand-100" : "text-muted")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
