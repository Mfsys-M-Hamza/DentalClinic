import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ToothMark } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { navigation } from "@/clinic-config";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 sm:py-28">
      <Container className="text-center">
        <Reveal>
          <div className="mx-auto mb-6 grid size-20 place-items-center rounded-3xl bg-brand text-white shadow-lift">
            <ToothMark className="size-10" />
          </div>
          <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Error 404</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">This page has gone missing</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
            The page you&apos;re looking for may have moved or no longer exists. Try one of the links below, or get in
            touch and we&apos;ll help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/book-appointment" variant="secondary" size="lg">
              Book an appointment
            </Button>
            <WhatsAppButton size="lg" label="Ask on WhatsApp" />
          </div>
          <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Search className="size-4 text-brand-300" aria-hidden="true" />
            {[...navigation.main, ...navigation.more].map((l) => (
              <Link key={l.href} href={l.href} className="text-brand-700 underline-offset-4 hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
