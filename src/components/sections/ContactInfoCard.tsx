import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactInfoCard({
  icon: Icon,
  title,
  lines,
  href,
  actionLabel,
  external,
  className,
}: {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
  actionLabel?: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
      <div className="mt-2 space-y-0.5 text-muted">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      {href && actionLabel && (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-auto pt-4 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          {actionLabel} →
        </a>
      )}
    </div>
  );
}
