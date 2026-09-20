import { Clock, MapPin, Phone } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { hoursSummary } from "@/lib/hours";
import { telHref } from "@/lib/utils";
import { Container } from "@/components/ui/Layout";
import { OpenStatusBadge } from "@/components/ui/OpenStatus";

export function TopBar() {
  const { contact } = clinicConfig;
  return (
    <div className="bg-brand-900 text-sm text-brand-100" data-dark="">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={telHref(contact.phone)} className="inline-flex items-center gap-2 font-medium text-white hover:underline">
            <Phone className="size-3.5" aria-hidden="true" />
            {contact.phone}
          </a>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <Clock className="size-3.5" aria-hidden="true" />
            {hoursSummary()}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 lg:inline-flex">
            <MapPin className="size-3.5" aria-hidden="true" />
            {contact.address}, {contact.cityCountry}
          </span>
          <OpenStatusBadge dark className="text-brand-100" />
        </div>
      </Container>
    </div>
  );
}
