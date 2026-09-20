"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CalendarCheck, CheckCircle2, LoaderCircle, Pencil, Phone } from "lucide-react";
import { clinicConfig } from "@/clinic-config";
import { services, serviceBySlug } from "@/data/services";
import { team } from "@/data/team";
import {
  NO_PREFERENCE,
  contactMethods,
  emptyBooking,
  patientTypes,
  validateBooking,
  type BookingErrors,
  type BookingValues,
} from "@/lib/booking";
import { dayNameForDate, getSlotsForDate, todayISO } from "@/lib/hours";
import { appointmentWhatsappUrl, formatDateLong } from "@/lib/whatsapp";
import { telHref, cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

const FIELD_ORDER: (keyof BookingValues)[] = [
  "name",
  "phone",
  "email",
  "contactMethod",
  "service",
  "dentist",
  "date",
  "time",
  "patientType",
  "message",
  "consent",
];

const LABELS: Record<keyof BookingValues, string> = {
  name: "Full name",
  phone: "Phone number",
  email: "Email address",
  contactMethod: "Preferred contact method",
  service: "Treatment / service",
  dentist: "Preferred dentist",
  date: "Preferred date",
  time: "Preferred time",
  patientType: "Patient type",
  message: "Message",
  consent: "Consent",
};

const inputClass =
  "h-12 w-full rounded-xl bg-white px-4 text-base text-ink ring-1 ring-brand-200 transition placeholder:text-muted/60 hover:ring-brand-300 focus:ring-2 focus:ring-brand disabled:bg-brand-50 disabled:text-muted aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";

const noopSubscribe = () => () => {};

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div id={id} aria-live="polite">
      {message && (
        <p className="mt-1.5 flex animate-fade-up items-start gap-1.5 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {message}
        </p>
      )}
    </div>
  );
}

function RadioGroup({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-semibold">
        {legend}
        <span className="text-red-700" aria-hidden="true">
          {" "}
          *
        </span>
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((o, i) => (
          <label
            key={o}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 text-[0.95rem] ring-1 transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
              value === o ? "bg-brand-50 font-semibold ring-2 ring-brand" : "ring-brand-200 hover:ring-brand-300",
              error && "ring-red-600",
            )}
          >
            <input
              type="radio"
              id={i === 0 ? name : undefined}
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="size-4 accent-[var(--brand)]"
            />
            {o}
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

type Step = "form" | "review" | "done";
type Status = "idle" | "sending" | "success" | "error";

export function AppointmentForm() {
  const search = useSearchParams();
  const [values, setValues] = useState<BookingValues>(() => ({
    ...emptyBooking,
    service: serviceBySlug(search.get("service") ?? "")?.name ?? "",
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const idFor = (k: keyof BookingValues) => `${uid}-${k}`;

  // Today's date in the visitor's time zone; empty on the server to avoid hydration mismatches.
  const today = useSyncExternalStore(noopSubscribe, todayISO, () => "");
  const slots = values.date ? getSlotsForDate(values.date) : [];
  const closedDay = values.date && slots === null;

  const update = <K extends keyof BookingValues>(key: K, value: BookingValues[K]) => {
    const next = { ...values, [key]: value };
    if (key === "date") next.time = ""; // slots differ per day
    setValues(next);
    if (submitted || touched[key]) {
      const fresh = validateBooking(next, today || todayISO());
      setErrors((prev) => ({ ...prev, [key]: fresh[key], ...(key === "date" ? { time: undefined } : {}) }));
    }
  };

  const blur = (key: keyof BookingValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateBooking(values, today || todayISO())[key] }));
  };

  const goToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateBooking(values, today || todayISO());
    setErrors(found);
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      requestAnimationFrame(() => document.getElementById(idFor(firstInvalid))?.focus());
      return;
    }
    setStep("review");
    requestAnimationFrame(() => document.getElementById("booking-card")?.scrollIntoView({ block: "start", behavior: "smooth" }));
  };

  const url = appointmentWhatsappUrl(values);

  const sendWhatsApp = () => {
    setStatus("sending");
    // Open synchronously inside the click so popup blockers allow it.
    const win = window.open(url, "_blank");
    if (!win) {
      setStatus("error");
      return;
    }
    win.opener = null;
    setTimeout(() => {
      setStatus("success");
      setStep("done");
    }, 700);
  };

  const reset = () => {
    setValues({ ...emptyBooking });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
    setStep("form");
  };

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const describedBy = (k: keyof BookingValues) => [errors[k] ? `${idFor(k)}-error` : null, `${idFor(k)}-hint`].filter(Boolean).join(" ");

  const summary: [string, string][] = [
    ["Name", values.name.trim()],
    ["Phone", values.phone.trim()],
    ["Email", values.email.trim()],
    ["Preferred contact", values.contactMethod],
    ["Treatment / service", values.service],
    ["Preferred dentist", values.dentist],
    ["Preferred date", formatDateLong(values.date)],
    ["Preferred time", values.time],
    ["Patient type", values.patientType],
    ["Message", values.message.trim() || "Not provided"],
  ];

  return (
    <div id="booking-card" className="scroll-mt-28 rounded-[2rem] bg-white p-5 shadow-lift ring-1 ring-brand-100 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {step === "form" && (
          <motion.form
            key="form"
            noValidate
            onSubmit={goToReview}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            aria-label="Appointment request form"
          >
            <h2 className="font-serif text-2xl font-semibold">Request an appointment</h2>
            <p className="mt-1 text-muted">Fields marked * are required. Takes about two minutes.</p>

            {submitted && errorList.length > 0 && (
              <div role="alert" className="mt-5 animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                <p className="font-semibold">
                  Please check {errorList.length} {errorList.length === 1 ? "field" : "fields"}:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {errorList.map((k) => (
                    <li key={k}>
                      <a href={`#${idFor(k)}`} className="underline underline-offset-2" onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(idFor(k))?.focus();
                        }}>
                        {LABELS[k]}
                      </a>
                      : {errors[k]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id={idFor("name")} label="Full name" required error={errors.name}>
                <input
                  id={idFor("name")}
                  className={inputClass}
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name") || undefined}
                  aria-required="true"
                />
              </Field>
              <Field id={idFor("phone")} label="Phone number" required error={errors.phone} hint="Include the country code if calling from abroad.">
                <input
                  id={idFor("phone")}
                  type="tel"
                  inputMode="tel"
                  className={inputClass}
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy("phone") || undefined}
                  aria-required="true"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field id={idFor("email")} label="Email address" required error={errors.email}>
                  <input
                    id={idFor("email")}
                    type="email"
                    className={inputClass}
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={describedBy("email") || undefined}
                    aria-required="true"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <RadioGroup
                  name={idFor("contactMethod")}
                  legend="Preferred contact method"
                  options={contactMethods}
                  value={values.contactMethod}
                  error={errors.contactMethod}
                  onChange={(v) => update("contactMethod", v)}
                />
              </div>

              <Field id={idFor("service")} label="Treatment / service" required error={errors.service}>
                <select
                  id={idFor("service")}
                  className={inputClass}
                  value={values.service}
                  onChange={(e) => update("service", e.target.value)}
                  onBlur={() => blur("service")}
                  aria-invalid={errors.service ? true : undefined}
                  aria-describedby={describedBy("service") || undefined}
                  aria-required="true"
                >
                  <option value="">Select a treatment…</option>
                  <option value="General consultation / not sure">General consultation / not sure</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={idFor("dentist")} label="Preferred dentist" error={errors.dentist}>
                <select
                  id={idFor("dentist")}
                  className={inputClass}
                  value={values.dentist}
                  onChange={(e) => update("dentist", e.target.value)}
                >
                  <option value={NO_PREFERENCE}>{NO_PREFERENCE}</option>
                  {team.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id={idFor("date")}
                label="Preferred date"
                required
                error={errors.date}
                hint={closedDay ? undefined : "Past dates can't be selected."}
              >
                <input
                  id={idFor("date")}
                  type="date"
                  min={today || undefined}
                  className={inputClass}
                  value={values.date}
                  onChange={(e) => update("date", e.target.value)}
                  onBlur={() => blur("date")}
                  aria-invalid={errors.date ? true : undefined}
                  aria-describedby={describedBy("date") || undefined}
                  aria-required="true"
                />
              </Field>
              <Field
                id={idFor("time")}
                label="Preferred time"
                required
                error={errors.time}
                hint={!values.date ? "Choose a date first to see available times." : undefined}
              >
                <select
                  id={idFor("time")}
                  className={inputClass}
                  value={values.time}
                  disabled={!values.date || Boolean(closedDay)}
                  onChange={(e) => update("time", e.target.value)}
                  onBlur={() => blur("time")}
                  aria-invalid={errors.time ? true : undefined}
                  aria-describedby={describedBy("time") || undefined}
                  aria-required="true"
                >
                  <option value="">{closedDay ? `Closed on ${dayNameForDate(values.date)}s` : "Select a time…"}</option>
                  {slots && slots.length > 0 && <option value={NO_PREFERENCE}>{NO_PREFERENCE} (any time that day)</option>}
                  {slots?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <RadioGroup
                  name={idFor("patientType")}
                  legend="Are you a new or existing patient?"
                  options={patientTypes}
                  value={values.patientType}
                  error={errors.patientType}
                  onChange={(v) => update("patientType", v)}
                />
              </div>

              <div className="sm:col-span-2">
                <Field
                  id={idFor("message")}
                  label="Short message or dental concern (optional)"
                  error={errors.message}
                  hint={`${values.message.length}/600 characters`}
                >
                  <textarea
                    id={idFor("message")}
                    rows={4}
                    className={cn(inputClass, "h-auto resize-y py-3")}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={describedBy("message") || undefined}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-brand-50 p-4 text-sm leading-relaxed">
                  <input
                    id={idFor("consent")}
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? `${idFor("consent")}-error` : undefined}
                    aria-required="true"
                    className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]"
                  />
                  <span>
                    I agree that {clinicConfig.name} may use the details I provide to contact me about this appointment
                    request, as described in the{" "}
                    <a href="/privacy-policy" target="_blank" className="font-semibold text-brand-700 underline underline-offset-2">
                      Privacy Policy
                    </a>
                    . <span className="text-red-700" aria-hidden="true">*</span>
                  </span>
                </label>
                <FieldError id={`${idFor("consent")}-error`} message={errors.consent} />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
                <CalendarCheck className="size-5" aria-hidden="true" />
                Review my request
              </button>
              <p className="text-sm leading-relaxed text-muted">
                This only <strong className="text-ink">requests</strong> an appointment. It is <strong className="text-ink">not confirmed</strong> until the clinic replies with an available time.
              </p>
            </div>
          </motion.form>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-serif text-2xl font-semibold">Check your appointment request</h2>
            <p className="mt-1 text-muted">Please make sure everything is correct, then send it to the clinic on WhatsApp.</p>

            <dl className="mt-6 divide-y divide-brand-100 rounded-2xl bg-brand-50/60 px-5 ring-1 ring-brand-100">
              {summary.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-muted">{k}</dt>
                  <dd className="break-words">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 ring-1 ring-amber-200">
              <p className="font-semibold">How this works</p>
              <p className="mt-1">
                Pressing the button opens WhatsApp with this message ready to send — you then press <em>Send</em> in WhatsApp. Your details are not saved on this website. Your appointment is <strong>requested, not confirmed</strong>, until the clinic replies with an available time.
              </p>
            </div>

            {status === "error" && (
              <div role="alert" className="mt-4 animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                <p className="font-semibold">We couldn&apos;t open WhatsApp automatically.</p>
                <p className="mt-1">
                  Your browser may have blocked the new window.{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                    Open WhatsApp manually
                  </a>{" "}
                  or call us on{" "}
                  <a href={telHref(clinicConfig.contact.phone)} className="font-semibold underline underline-offset-2">
                    {clinicConfig.contact.phone}
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={sendWhatsApp}
                disabled={status === "sending"}
                className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="size-5" /> Send Appointment Request on WhatsApp
                  </>
                )}
              </button>
              <a href={telHref(clinicConfig.contact.phone)} className={buttonClasses("secondary", "lg", "w-full sm:w-auto")}>
                <Phone className="size-5" aria-hidden="true" /> Call the Clinic
              </a>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setStep("form");
                }}
                className={buttonClasses("ghost", "lg", "w-full sm:w-auto")}
              >
                <Pencil className="size-4" aria-hidden="true" /> Edit details
              </button>
            </div>
            <p className="sr-only" role="status">
              {status === "sending" ? "Opening WhatsApp" : ""}
            </p>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="py-6 text-center"
          >
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="size-11" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-serif text-3xl font-semibold">Your request is ready to send</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-muted">
              WhatsApp should now be open with your message. Please press <strong className="text-ink">Send</strong> there to deliver it to the clinic.
            </p>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              Your appointment is <strong className="text-ink">not confirmed yet</strong> — our team will reply with an available time. If you don&apos;t hear back, call us on{" "}
              <a href={telHref(clinicConfig.contact.phone)} className="font-semibold text-brand-700 underline underline-offset-2">
                {clinicConfig.contact.phone}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "md")}>
                <WhatsAppIcon className="size-5" /> Reopen WhatsApp
              </a>
              <button type="button" onClick={reset} className={buttonClasses("secondary", "md")}>
                Start a new request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
