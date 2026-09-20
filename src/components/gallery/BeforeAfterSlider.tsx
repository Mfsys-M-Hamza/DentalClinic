"use client";

import Image from "next/image";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  before: string;
  after: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Before/after comparison. An invisible native range input sits on top, so mouse,
 * touch and keyboard (arrow keys, Home/End) all work and screen readers announce it as a slider.
 */
export function BeforeAfterSlider({ before, after, alt, priority, className }: Props) {
  const [position, setPosition] = useState(50);

  return (
    <div className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-100 select-none", className)}>
      <Image
        src={after}
        alt={`After: ${alt}`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        priority={priority}
        unoptimized={after.endsWith(".svg")}
        className="object-cover"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={before}
          alt={`Before: ${alt}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          unoptimized={before.endsWith(".svg")}
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Comparison slider — move to reveal the before and after images"
        aria-valuetext={`${position}% of the before image is visible`}
        className="compare-range peer absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
        style={{ touchAction: "pan-y" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-[5] w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.35)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-lift ring-4 ring-white/40 transition-transform peer-focus-visible:ring-brand peer-active:scale-110">
          <MoveHorizontal className="size-5" />
        </span>
      </div>
    </div>
  );
}
