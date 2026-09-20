"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

// The lightbox is only needed after a click, so it's split into its own chunk.
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox));

/** Filterable before/after grid. Opens an accessible lightbox with the comparison slider. */
export function GalleryBrowser() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const items = category === "All" ? galleryItems : galleryItems.filter((g) => g.category === category);

  return (
    <div>
      <div role="group" aria-label="Filter by treatment category" className="mb-8 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-95",
              category === c ? "bg-brand text-white shadow-soft" : "bg-white text-brand-800 ring-1 ring-brand/20 hover:bg-brand-50",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {items.length} {items.length === 1 ? "comparison" : "comparisons"}
      </p>

      <motion.ul
        key={category}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Open before and after comparison: ${item.title}`}
              className="group block w-full overflow-hidden rounded-3xl bg-white text-left shadow-soft ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative grid grid-cols-2">
                <Photo src={item.before} alt={`Before: ${item.alt}`} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 17vw, 25vw" zoom />
                <Photo src={item.after} alt={`After: ${item.alt}`} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 17vw, 25vw" zoom />
                <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">Before</span>
                <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">After</span>
                <span className="absolute inset-0 grid place-items-center bg-brand-900/0 opacity-0 transition duration-300 group-hover:bg-brand-900/35 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800">
                    <Expand className="size-4" aria-hidden="true" /> Compare
                  </span>
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-wider text-brand uppercase">{item.category}</p>
                <h3 className="mt-1 font-serif text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted">{item.note}</p>
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {selected !== null && items[selected] && (
        <Lightbox items={items} index={selected} onIndexChange={setSelected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
