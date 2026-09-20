export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  /** Short, factual description used for screen readers. */
  alt: string;
  note: string;
}

/**
 * PLACEHOLDER images — swap `before` / `after` for real photos ONLY with the
 * patient's written consent. Never use misleading or altered images.
 * Suggested size: 1200×900 (4:3), same framing for both photos.
 */
export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Teeth whitening", category: "Whitening", before: "/images/gallery-1-before.svg", after: "/images/gallery-1-after.svg", alt: "Sample comparison of teeth before and after whitening", note: "Sample placeholder image" },
  { id: "g2", title: "Clear aligner treatment", category: "Orthodontics", before: "/images/gallery-2-before.svg", after: "/images/gallery-2-after.svg", alt: "Sample comparison of teeth alignment before and after orthodontic care", note: "Sample placeholder image" },
  { id: "g3", title: "Dental crown restoration", category: "Restorative", before: "/images/gallery-3-before.svg", after: "/images/gallery-3-after.svg", alt: "Sample comparison of a tooth before and after a crown", note: "Sample placeholder image" },
  { id: "g4", title: "Smile refinement", category: "Cosmetic", before: "/images/gallery-4-before.svg", after: "/images/gallery-4-after.svg", alt: "Sample comparison of a smile before and after cosmetic treatment", note: "Sample placeholder image" },
  { id: "g5", title: "Implant-supported tooth", category: "Restorative", before: "/images/gallery-5-before.svg", after: "/images/gallery-5-after.svg", alt: "Sample comparison of a missing tooth before and after an implant restoration", note: "Sample placeholder image" },
  { id: "g6", title: "Professional cleaning", category: "Whitening", before: "/images/gallery-6-before.svg", after: "/images/gallery-6-after.svg", alt: "Sample comparison of teeth before and after professional cleaning", note: "Sample placeholder image" },
];

export const galleryCategories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];
