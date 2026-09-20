import { CalendarCheck, Phone } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { telHref } from "@/lib/utils";

/** Full-width call-to-action band with booking, WhatsApp and call buttons. */
export function CTASection({
  title = "Ready to book your visit?",
  description = "Send us an appointment request in a couple of minutes. Our team will reply to confirm a suitable time — your appointment is only confirmed once we do.",
  whatsappMessage,
}: {
  title?: string;
  description?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-label="Book an appointment">
      <Container className="!px-0">
        <Reveal>
          <div
            data-dark=""
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-brand-100">{description}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/book-appointment" variant="light" size="lg" className="w-full sm:w-auto">
                  <CalendarCheck className="size-5" aria-hidden="true" />
                  Book an Appointment
                </Button>
                <WhatsAppButton size="lg" message={whatsappMessage} className="w-full sm:w-auto" />
                <Button
                  href={telHref(clinicConfig.contact.phone)}
                  variant="outlineLight"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  Call the Clinic
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
