"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion (WAI-ARIA disclosure pattern). Height is animated with the
 * CSS grid-rows trick so it stays smooth without JS measurement.
 */
export function FAQAccordion({ items, className }: { items: Faq[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.question}
            className={cn(
              "rounded-2xl bg-white ring-1 transition-shadow duration-300",
              isOpen ? "shadow-soft ring-brand/30" : "ring-brand-100 hover:ring-brand/30",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-semibold text-ink sm:px-6 sm:py-5 sm:text-lg"
              >
                <span className="font-serif">{item.question}</span>
                <ChevronDown
                  className={cn("size-5 shrink-0 text-brand transition-transform duration-300", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6 sm:pb-6">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
