import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/types";
import { serviceImage } from "@/data/services";
import { serviceIcons } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-white shadow-soft ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand/30">
      <div className="overflow-hidden rounded-t-3xl">
        <Photo src={serviceImage(service.slug)} alt="" ratio="aspect-[16/9]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" zoom />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <span className="absolute -top-7 left-6 grid size-14 place-items-center rounded-2xl bg-brand text-white shadow-lift ring-4 ring-white transition-colors duration-300">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-8 text-xs font-semibold tracking-wider text-brand uppercase">{service.category}</p>
        <h3 className="mt-1 font-serif text-xl font-semibold">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-offset-4"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Learn more
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
