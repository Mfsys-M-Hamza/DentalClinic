import { MapPin, Navigation } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { BusinessHours } from "./BusinessHours";

/** Location + hours + lazy-loaded Google Map. Falls back to an address-based embed. */
export function MapSection({ heading = true }: { heading?: boolean }) {
  const { contact, seo } = clinicConfig;
  const embed =
    contact.mapEmbedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(`${contact.address}, ${contact.cityCountry}`)}&output=embed`;

  return (
    <Section tone="sand" labelledBy="location-heading">
      {heading && (
        <SectionHeading
          id="location-heading"
          eyebrow="Find us"
          title={`Visit our clinic in ${seo.primaryCity}`}
          description={`Conveniently located for patients across ${seo.serviceArea}. Walk-ins are welcome for enquiries, but please book ahead for treatment.`}
        />
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="h-full min-h-[22rem] overflow-hidden rounded-3xl bg-brand-100 shadow-soft ring-1 ring-brand-100">
            <iframe
              title={`Map showing the location of ${clinicConfig.name}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[22rem] w-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-xl font-semibold">Address</h3>
            </div>
            <p className="mt-4 text-muted">
              {contact.address}
              <br />
              {contact.cityCountry}
            </p>
            <Button href={contact.mapsUrl} external variant="secondary" size="sm" className="mt-4">
              <Navigation className="size-4" aria-hidden="true" />
              Get directions
            </Button>
          </div>
          <BusinessHours />
        </Reveal>
      </div>
    </Section>
  );
}
