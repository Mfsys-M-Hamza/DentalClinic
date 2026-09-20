import { Info, Siren } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { medicalDisclaimer } from "@/data/content";
import { telHref, cn } from "@/lib/utils";

export function EmergencyNotice({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Dental emergencies"
      className={cn("flex gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950 sm:p-6", className)}
    >
      <Siren className="mt-0.5 size-6 shrink-0 text-amber-700" aria-hidden="true" />
      <div className="text-sm leading-relaxed sm:text-base">
        <p className="font-semibold">Dental emergency?</p>
        <p className="mt-1">
          Call our emergency line on{" "}
          <a href={telHref(clinicConfig.contact.emergencyPhone)} className="font-bold underline underline-offset-4">
            {clinicConfig.contact.emergencyPhone}
          </a>
          . If you have difficulty breathing or swallowing, or a serious injury, contact your local emergency service
          straight away.
        </p>
      </div>
    </aside>
  );
}

export function MedicalDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("flex gap-3 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-muted", className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
      <span>{medicalDisclaimer}</span>
    </p>
  );
}
