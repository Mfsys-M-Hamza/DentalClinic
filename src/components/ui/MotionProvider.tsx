"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useSyncExternalStore } from "react";

const MotionAllowedContext = createContext(true);

/** True when the user has NOT asked for reduced motion and the device isn't low-powered. */
export const useMotionAllowed = () => useContext(MotionAllowedContext);

const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const isLowPowered = () => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
};

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const noopSubscribe = () => () => {};

/**
 * Global animation policy. Reduced-motion users and low-powered devices get
 * opacity-only transitions (no transforms, parallax or scroll effects).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribeReduced, prefersReduced, () => false);
  const lowPower = useSyncExternalStore(noopSubscribe, isLowPowered, () => false);
  const allowed = !reduced && !lowPower;

  return (
    <MotionAllowedContext.Provider value={allowed}>
      <MotionConfig reducedMotion={allowed ? "user" : "always"}>{children}</MotionConfig>
    </MotionAllowedContext.Provider>
  );
}
