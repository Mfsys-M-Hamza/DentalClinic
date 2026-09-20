import { Clock } from "lucide-react";
import { groupedHours } from "@/lib/hours";
import { OpenStatusBadge } from "@/components/ui/OpenStatus";
import { cn } from "@/lib/utils";

export function BusinessHours({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100", className)}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-serif text-xl font-semibold">Opening hours</h3>
      </div>
      <dl className="mt-5 divide-y divide-brand-100">
        {groupedHours().map((g) => (
          <div key={g.label} className="flex justify-between gap-4 py-3 text-[0.95rem]">
            <dt className="font-medium">{g.label}</dt>
            <dd className={cn("text-right", g.hours === "Closed" ? "text-muted" : "text-ink")}>{g.hours}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-xl bg-brand-50 px-4 py-2.5">
        <OpenStatusBadge className="text-brand-800" />
      </div>
    </div>
  );
}
