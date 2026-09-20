"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { clinicConfig, navigation } from "@/clinic-config";
import { Container } from "@/components/ui/Layout";
import { buttonClasses } from "@/components/ui/Button";
import Image from "next/image";
import { cn, withBase } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${clinicConfig.name} — home`}>
      <span className="grid size-11 place-items-center overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-brand-100 transition-transform duration-300 group-hover:-rotate-6">
        <Image src={withBase("/images/clinic/logo-mark.png")} alt="" width={44} height={44} unoptimized className="size-full object-contain" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn("font-serif text-lg font-semibold", light ? "text-white" : "text-ink")}>
          {clinicConfig.name}
        </span>
        <span className={cn("hidden text-xs sm:block", light ? "text-brand-200" : "text-muted")}>
          {clinicConfig.tagline}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-300",
        scrolled ? "border-brand-100 shadow-soft" : "border-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.main.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-brand",
                      "after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100",
                      active && "text-brand after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book-appointment" className={cn(buttonClasses("primary", "md"), "max-sm:hidden")}>
            Book an Appointment
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink ring-1 ring-brand/20 transition hover:bg-brand-50 active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <MobileNav open={open} onClose={close} pathname={pathname} />
    </header>
  );
}
