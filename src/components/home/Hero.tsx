"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CalendarCheck, HeartHandshake, MessageSquareText, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Counter } from "@/components/ui/Counter";
import { Photo } from "@/components/ui/Photo";
import { useMotionAllowed } from "@/components/ui/MotionProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const chips = [
  { icon: HeartHandshake, text: "Gentle, patient-first care" },
  { icon: MessageSquareText, text: "Clear explanations" },
  { icon: ShieldCheck, text: "Family-friendly" },
];

/** Cinematic hero: layered imagery, gradient depth, scroll parallax and staggered entrance. */
export function Hero() {
  const { hero } = clinicConfig.home;
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, allowed ? 70 : 0]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [0, allowed ? -40 : 0]);

  return (
    <section
      ref={ref}
      data-dark=""
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-brand-900 text-white"
    >
      {/* Depth layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 85% 10%, color-mix(in oklab, var(--brand) 70%, transparent), transparent 60%), radial-gradient(40rem 30rem at 0% 100%, color-mix(in oklab, var(--brand-accent) 35%, transparent), transparent 60%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-brand-900/80" />

      <Container className="grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-20 lg:pb-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 ring-1 ring-white/20 backdrop-blur"
          >
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {hero.eyebrow} · {clinicConfig.seo.primaryCity}
          </motion.p>
          <motion.h1
            id="hero-heading"
            variants={rise}
            className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.headline}
          </motion.h1>
          <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
            {hero.subheadline}
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book-appointment" variant="light" size="lg">
              <CalendarCheck className="size-5" aria-hidden="true" />
              Book an Appointment
            </Button>
            <WhatsAppButton size="lg" />
          </motion.div>
          <motion.ul variants={rise} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-100">
            {chips.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4 text-brand-200" aria-hidden="true" />
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Layered imagery */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <motion.div style={{ y: yMain }} className="relative">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] shadow-lift ring-1 ring-white/25">
              <Photo
                src={clinicConfig.images.hero}
                alt="Dental Valley's clinical team treating a patient in the surgery room"
                ratio="aspect-[4/5]"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: ySecondary }}
            className="absolute -bottom-6 -left-4 hidden w-40 overflow-hidden rounded-3xl shadow-lift ring-4 ring-brand-900 sm:block lg:-left-10 lg:w-48"
          >
            <Photo
              src={clinicConfig.images.heroSecondary}
              alt="Portrait of a dentist at Dental Valley"
              ratio="aspect-[4/5]"
              sizes="200px"
            />
          </motion.div>

          <motion.div
            className="absolute top-8 -right-2 rounded-2xl bg-white/90 p-4 text-ink shadow-lift backdrop-blur sm:-right-6"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-wider text-brand uppercase">Care team</p>
            <p className="font-serif text-base font-semibold">{clinicConfig.doctor.name}</p>
            <p className="max-w-40 text-xs text-muted">{clinicConfig.doctor.qualifications || clinicConfig.doctor.role}</p>
          </motion.div>
        </motion.div>
      </Container>

      {/* Trust indicators */}
      <div className="border-t border-white/10 bg-brand-900/60 backdrop-blur">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 py-8 lg:grid-cols-4">
            {clinicConfig.home.stats.map((s) => (
              <div key={s.label} className="flex flex-col text-center lg:border-l lg:border-white/10 lg:first:border-0">
                <dt className="order-2 mt-1 text-sm text-brand-200">{s.label}</dt>
                <dd className="order-1 font-serif text-3xl font-semibold text-white sm:text-4xl">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
