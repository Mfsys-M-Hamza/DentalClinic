"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMotionAllowed } from "./MotionProvider";

const PATTERN = /^([^\d[]*)(\d[\d,]*(?:\.\d+)?)([^\d\]]*)$/;

/**
 * Animated statistic. Plain numeric values ("1200+", "4.9/5") count up when
 * scrolled into view; placeholders such as "[00]+" render as static text.
 * The final value is always in the server HTML, so nothing is hidden without JS.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const allowed = useMotionAllowed();

  useEffect(() => {
    const match = value.includes("[") ? null : PATTERN.exec(value);
    if (!match || !inView || !allowed || !ref.current) return;
    const [, prefix, numeric, suffix] = match;
    const target = Number(numeric.replace(/,/g, ""));
    const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
    const useCommas = numeric.includes(",");
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        const text = v.toFixed(decimals);
        node.textContent = `${prefix}${useCommas ? Number(text).toLocaleString("en-US", { minimumFractionDigits: decimals }) : text}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, allowed, value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}
