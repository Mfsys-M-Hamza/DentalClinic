import { ExternalLink, Star } from "lucide-react";
import { clinicConfig } from "@/clinic-config";

/** Shows the clinic's public Google rating. Used until real testimonials are added. */
export function GoogleRatingCard() {
  const { rating, count, url } = clinicConfig.googleReviews;
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-lift ring-1 ring-brand-100 sm:p-10">
      <p className="font-serif text-6xl font-semibold text-brand-700">{rating}</p>
      <p className="mt-3 flex justify-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-6 fill-accent text-accent" aria-hidden="true" />
        ))}
      </p>
      <p className="mt-4 text-lg text-muted">
        Rated <strong className="text-ink">{rating} out of 5</strong> from {count} Google reviews
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Read our reviews on Google <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
