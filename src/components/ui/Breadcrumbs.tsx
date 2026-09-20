import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className={cn("underline-offset-4 hover:text-brand hover:underline")}>
                    {crumb.name}
                  </Link>
                )}
                {!last && <ChevronRight className="size-3.5 text-brand-300" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
