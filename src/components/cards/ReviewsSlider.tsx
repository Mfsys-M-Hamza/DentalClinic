"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

/**
 * Swipeable review slider built on native scroll-snap: touch, trackpad, keyboard and buttons all work.
 * Auto-advances slowly (with a visible pause button); stops on hover/focus/touch and when the
 * visitor prefers reduced motion.
 */
export function ReviewsSlider({ items, label }: { items: Testimonial[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      const child = el?.children[i] as HTMLElement | undefined;
      if (!el || !child) return;
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  // Work out which slide is at the left edge as the visitor scrolls / swipes.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const start = el.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - start);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        // at the very end, the last slide may not reach the left edge
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = items.length - 1;
        setIndex(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const playing = !userPaused && !hovering && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      goTo(atEnd ? 0 : Math.min(index + 1, items.length - 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, index, goTo, items.length]);

  const prev = () => goTo(Math.max(0, index - 1));
  const next = () => goTo(Math.min(items.length - 1, index + 1));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setHovering(false)}
    >
      <ul
        ref={track}
        tabIndex={0}
        aria-label={`${label} — use the arrow keys or swipe to move between reviews`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
          }
        }}
        className="-mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-px-4 px-4 pt-1 pb-6 [scrollbar-width:none] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`Review ${i + 1} of ${items.length}`}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard testimonial={t} clamp />
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous review"
          className="grid size-11 place-items-center rounded-full bg-white text-brand-700 shadow-soft ring-1 ring-brand-200 transition hover:bg-brand-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-40"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <p className="min-w-14 text-center text-sm font-semibold text-muted tabular-nums sm:hidden" aria-hidden="true">
          {index + 1} / {items.length}
        </p>

        <div className="hidden items-center gap-2 sm:flex" role="group" aria-label="Choose a review">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}: ${t.name}`}
              aria-current={i === index ? "true" : undefined}
              className="grid size-6 place-items-center focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-brand"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-brand" : "w-2 bg-brand-200",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={index >= items.length - 1}
          aria-label="Next review"
          className="grid size-11 place-items-center rounded-full bg-white text-brand-700 shadow-soft ring-1 ring-brand-200 transition hover:bg-brand-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-40"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>

        {!reduced && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Start automatic review rotation" : "Pause automatic review rotation"}
            className="ml-1 grid size-11 place-items-center rounded-full text-muted transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
        )}
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        Showing review {index + 1} of {items.length}
      </p>
    </div>
  );
}
