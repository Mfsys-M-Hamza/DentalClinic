"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Renders as a different element, e.g. "section" or "li". */
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

/** Fades and lifts content in once as it scrolls into view. Transform + opacity only. */
export function Reveal({ children, className, delay = 0, y = 20, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const container = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}

/** Container that staggers the entrance of its <StaggerItem> children. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, as = "div" }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
