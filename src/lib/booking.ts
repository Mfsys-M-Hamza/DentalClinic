import { getSlotsForDate, dayNameForDate, parseLocalDate, todayISO } from "./hours";

export interface BookingValues {
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  service: string;
  dentist: string;
  date: string;
  time: string;
  patientType: string;
  message: string;
  consent: boolean;
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export const contactMethods = ["WhatsApp", "Phone call", "Email"] as const;
export const patientTypes = ["New patient", "Existing patient"] as const;
export const NO_PREFERENCE = "No preference";

export const emptyBooking: BookingValues = {
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
  service: "",
  dentist: NO_PREFERENCE,
  date: "",
  time: "",
  patientType: "",
  message: "",
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

export function validateBooking(v: BookingValues, today: string = todayISO()): BookingErrors {
  const e: BookingErrors = {};

  if (v.name.trim().length < 2) e.name = "Please enter your full name.";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a phone number we can reach you on.";
  else if (!PHONE.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Enter a valid phone number, including the country code if abroad.";

  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address, e.g. name@example.com.";

  if (!v.contactMethod) e.contactMethod = "Choose how you would like us to contact you.";
  if (!v.service) e.service = "Please select a treatment or service.";
  if (!v.patientType) e.patientType = "Let us know if you are a new or existing patient.";

  if (!v.date) e.date = "Please choose your preferred date.";
  else if (!parseLocalDate(v.date)) e.date = "Enter a valid date.";
  else if (v.date < today) e.date = "Please choose today or a future date — past dates can't be booked.";
  else if (getSlotsForDate(v.date) === null)
    e.date = `The clinic is closed on ${dayNameForDate(v.date)}s. Please pick another day.`;

  if (!v.time) e.time = "Please choose a preferred time.";
  else if (v.date && !e.date) {
    const slots = getSlotsForDate(v.date);
    if (slots && v.time !== NO_PREFERENCE && !slots.includes(v.time))
      e.time = "That time isn't available on the selected day — please choose another.";
  }

  if (v.message.length > 600) e.message = "Please keep your message under 600 characters.";
  if (!v.consent) e.consent = "Please confirm your consent so we can contact you about this request.";

  return e;
}
