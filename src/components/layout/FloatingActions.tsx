"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { serviceBySlug } from "@/data/services";
import { generalMessage, serviceMessage, whatsappUrl } from "@/lib/whatsapp";
import { telHref } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useOpenStatus } from "@/components/ui/OpenStatus";
import { buttonClasses } from "@/components/ui/Button";

/** Picks the WhatsApp message from the page the visitor is on. */
function messageFor(pathname: string): string {
  const match = /^\/services\/([^/]+)/.exec(pathname);
  const service = match ? serviceBySlug(match[1]) : undefined;
  return service ? serviceMessage(service.name) : generalMessage();
}

/**
 * Floating WhatsApp button (desktop) and sticky action bar (mobile).
 * The WhatsApp message adapts to the current service page.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const status = useOpenStatus();
  const href = whatsappUrl(messageFor(pathname));
  const onBooking = pathname.startsWith("/book-appointment");
  const hint = status ? (status.isOpen ? "We're open — chat with us" : "Closed now — we'll reply when we reopen") : "Chat with us";

  return (
    <>
      {/* Desktop / tablet: floating button */}
      <motion.div
        className="fixed right-6 bottom-6 z-50 hidden md:block"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp. ${hint}. Opens in a new tab.`}
          className="group flex items-center gap-3 rounded-full bg-wa py-3 pr-3 pl-3 text-white shadow-lift transition hover:-translate-y-1 hover:bg-wa-dark active:scale-95"
        >
          <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-56 group-hover:pl-2 group-focus-visible:max-w-56 group-focus-visible:pl-2">
            {hint}
          </span>
          <span className="grid size-12 place-items-center rounded-full bg-white/15">
            <WhatsAppIcon className="size-7" />
          </span>
        </a>
      </motion.div>

      {/* Mobile: sticky action bar */}
      {!onBooking && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white/95 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgb(15_60_60/0.25)] backdrop-blur md:hidden"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
        >
          <div className="mx-auto grid max-w-md grid-cols-[auto_auto_1fr] gap-2">
            <a
              href={telHref(clinicConfig.contact.phone)}
              aria-label={`Call the clinic on ${clinicConfig.contact.phone}`}
              className={buttonClasses("secondary", "md", "!px-4")}
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className={buttonClasses("whatsapp", "md", "!px-4")}
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <Link href="/book-appointment" className={buttonClasses("primary", "md")}>
              <CalendarCheck className="size-5" aria-hidden="true" />
              Book Appointment
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
