import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-brand-100">
      <Quote className="size-9 text-brand-200" aria-hidden="true" />
      {testimonial.rating && (
        <p className="mt-3 flex gap-0.5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={i < testimonial.rating! ? "size-4 fill-accent text-accent" : "size-4 text-brand-200"}
              aria-hidden="true"
            />
          ))}
        </p>
      )}
      <blockquote className="mt-3 flex-1 leading-relaxed text-ink/90">{testimonial.quote}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-brand-100 pt-4">
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.detail}</p>
        </div>
        {testimonial.isSample && (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">Sample</span>
        )}
      </figcaption>
    </figure>
  );
}
