"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

const subscribe = (callback: () => void) => {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
};

// Snapshot is a primitive string so React can compare it by value.
const snapshot = () => {
  const s = getOpenStatus();
  return `${s.isOpen ? 1 : 0}|${s.label}`;
};

/** Live open/closed status in the clinic's time zone. Returns null on the server. */
export function useOpenStatus(): OpenStatus | null {
  const key = useSyncExternalStore(subscribe, snapshot, () => "");
  if (!key) return null;
  const [flag, ...rest] = key.split("|");
  return { isOpen: flag === "1", label: rest.join("|") };
}

export function OpenStatusBadge({ className, dark }: { className?: string; dark?: boolean }) {
  const status = useOpenStatus();
  // Reserve height so nothing shifts when the status appears after hydration.
  if (!status) return <span className={cn("inline-block h-5 w-40", className)} aria-hidden="true" />;
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)} role="status">
      <span
        className={cn(
          "size-2.5 rounded-full",
          status.isOpen ? "bg-emerald-500" : dark ? "bg-amber-300" : "bg-amber-500",
        )}
        aria-hidden="true"
      />
      {status.label}
    </span>
  );
}
