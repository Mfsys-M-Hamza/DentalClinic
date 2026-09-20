"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { clinicConfig, navigation } from "@/clinic-config";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";
import { telHref, cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** Animated dropdown menu for small screens. Esc closes it, page scroll is locked while open. */
export function MobileNav({ open, onClose, pathname }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const links = [...navigation.main, ...navigation.more];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-brand-100 bg-white lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <nav aria-label="Mobile" className="mx-auto max-w-lg px-4 py-6">
            <ul className="space-y-1">
              {links.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl px-4 py-3.5 font-serif text-xl font-medium text-ink transition-colors hover:bg-brand-50",
                        active && "bg-brand-50 text-brand",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-6 grid gap-3">
              <Link href="/book-appointment" onClick={onClose} className={buttonClasses("primary", "lg", "w-full")}>
                Book an Appointment
              </Link>
              <a
                href={whatsappUrl(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("whatsapp", "lg", "w-full")}
              >
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
              </a>
              <a href={telHref(clinicConfig.contact.phone)} className={buttonClasses("secondary", "lg", "w-full")}>
                <Phone className="size-5" aria-hidden="true" /> Call {clinicConfig.contact.phone}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
