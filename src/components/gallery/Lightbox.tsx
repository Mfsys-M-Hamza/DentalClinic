"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/data/gallery";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface Props {
  items: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Accessible modal built on the native <dialog>: focus is trapped, Esc closes it,
 * and focus returns to the trigger. Arrow keys move between items.
 */
export function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const item = items[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, []);

  const step = (delta: number) => onIndexChange((index + delta + items.length) % items.length);

  return (
    <dialog
      ref={ref}
      aria-labelledby="lightbox-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      onKeyDown={(e) => {
        // Don't hijack arrows while the comparison slider is focused.
        if ((e.target as HTMLElement).tagName === "INPUT") return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto max-h-[94dvh] w-[min(96vw,60rem)] overflow-y-auto rounded-3xl bg-white p-0 text-ink shadow-lift"
    >
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}>
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold tracking-wider text-brand uppercase">{item.category}</p>
            <h2 id="lightbox-title" className="font-serif text-2xl font-semibold">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => ref.current?.close()}
            aria-label="Close comparison"
            className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-brand/25 transition hover:bg-brand-50 active:scale-95"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 sm:px-6">
          <BeforeAfterSlider key={item.id} before={item.before} after={item.after} alt={item.alt} priority />
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm text-muted">
            {item.note}. Individual results vary — see the patient-consent notice on the gallery page.
          </p>
          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous comparison"
                className="grid size-11 place-items-center rounded-full ring-1 ring-brand/25 transition hover:bg-brand-50 active:scale-95"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <span className="min-w-14 text-center text-sm tabular-nums" aria-live="polite">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next comparison"
                className="grid size-11 place-items-center rounded-full ring-1 ring-brand/25 transition hover:bg-brand-50 active:scale-95"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </dialog>
  );
}
