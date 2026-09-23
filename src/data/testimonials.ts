export interface Testimonial {
  name: string;
  /** Short line under the name, e.g. the treatment mentioned or the review source. */
  detail: string;
  quote: string;
  /** Optional 1–5. Leave undefined to hide stars. */
  rating?: number;
  /** `true` shows a "Sample" badge. Only ever add REAL, consented patient reviews. */
  isSample: boolean;
  /** Featured reviews appear in the homepage reviews section (all reviews appear on /testimonials). */
  featured?: boolean;
}

/**
 * Add genuine patient testimonials here (with the patient's permission).
 * While this list is empty, the site shows the clinic's public Google rating
 * (see `googleReviews` in clinic-config.ts) instead of invented reviews.
 */
export const testimonials: Testimonial[] = [];
