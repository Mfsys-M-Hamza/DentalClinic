import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { BusinessHours } from "@/components/sections/BusinessHours";
import { EmergencyNotice, MedicalDisclaimer } from "@/components/sections/Notices";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description: `Request a dental appointment at ${clinicConfig.name} in ${clinicConfig.seo.primaryCity}. Send your details on WhatsApp or call the clinic — appointments are confirmed once we reply.`,
  path: "/book-appointment",
});

function FormSkeleton() {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-brand-100" aria-hidden="true">
      <div className="skeleton mb-3 h-8 w-64" />
      <div className="skeleton mb-8 h-4 w-80 max-w-full" />
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-12" />
        ))}
      </div>
      <div className="skeleton mt-8 h-14 w-56" />
    </div>
  );
}

const steps = [
  { icon: CalendarCheck, title: "Fill in the form", text: "Tell us what you need and when suits you." },
  { icon: MessageCircle, title: "Send on WhatsApp", text: "Your request opens in WhatsApp — press Send." },
  { icon: Phone, title: "We confirm", text: "The clinic replies with an available time." },
];

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment"
        description="Complete the form and we'll prepare a WhatsApp message for you to send to the clinic. Your appointment is only confirmed once our team replies."
        crumbs={[{ name: "Book an Appointment", path: "/book-appointment" }]}
      />
      <Section tone="white" className="!pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Suspense fallback={<FormSkeleton />}>
            <AppointmentForm />
          </Suspense>

          <div className="space-y-6">
            <Reveal className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
              <h2 className="font-serif text-xl font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold">
                        {i + 1}. {title}
                      </p>
                      <p className="text-sm text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-muted">
                Prefer to talk? Call{" "}
                <a href={telHref(clinicConfig.contact.phone)} className="font-semibold text-brand-700 underline underline-offset-2">
                  {clinicConfig.contact.phone}
                </a>
                .
              </p>
            </Reveal>
            <BusinessHours />
            <EmergencyNotice />
          </div>
        </div>
        <MedicalDisclaimer className="mt-10" />
      </Section>
    </>
  );
}
