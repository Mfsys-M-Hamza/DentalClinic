import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import { clinicConfig, navigation } from "@/clinic-config";
import { services } from "@/data/services";
import { medicalDisclaimer } from "@/data/content";
import { groupedHours } from "@/lib/hours";
import { telHref } from "@/lib/utils";
import { Container } from "@/components/ui/Layout";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "./Header";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";

const linkClass = "text-brand-100 underline-offset-4 transition-colors hover:text-white hover:underline";

export function Footer() {
  const { contact, social } = clinicConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-brand-100 max-lg:pb-24" data-dark="">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Patient-focused dental care in {clinicConfig.seo.primaryCity}, serving {clinicConfig.seo.serviceArea}.
              Clear explanations, personalised plans and a caring team.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: social.facebook, label: `${clinicConfig.name} on Facebook`, Icon: FacebookIcon },
                { href: social.instagram, label: `${clinicConfig.name} on Instagram`, Icon: InstagramIcon },
                { href: whatsappUrl(generalMessage()), label: "Chat with us on WhatsApp", Icon: WhatsAppIcon },
              ]
                .filter((s) => s.href)
                .map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-800"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="font-serif text-lg font-semibold text-white">Quick links</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[{ label: "Home", href: "/" }, ...navigation.main, ...navigation.more, { label: "Book an Appointment", href: "/book-appointment" }].map(
                (l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-serif text-lg font-semibold text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-white underline-offset-4 hover:underline">
                  View all services →
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-serif text-lg font-semibold text-white">Visit &amp; contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span>
                  {contact.address}
                  <br />
                  {contact.cityCountry}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <a href={telHref(contact.phone)} className={linkClass}>
                  {contact.phone}
                </a>
              </p>
              {contact.email && (
                <p className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </p>
              )}
              <p className="flex gap-3">
                <Siren className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
                <span>
                  Emergency:{" "}
                  <a href={telHref(contact.emergencyPhone)} className="font-semibold text-white underline-offset-4 hover:underline">
                    {contact.emergencyPhone}
                  </a>
                </span>
              </p>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <ul className="space-y-0.5">
                  {groupedHours().map((g) => (
                    <li key={g.label}>
                      {g.label}: {g.hours}
                    </li>
                  ))}
                </ul>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 text-xs leading-relaxed text-brand-200">
          <p className="max-w-4xl">{medicalDisclaimer}</p>
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p>
              © {year} {clinicConfig.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navigation.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
