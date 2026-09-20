import { clinicConfig } from "../clinic-config";
import { digitsOnly } from "./utils";
import { parseLocalDate } from "./hours";

/** WhatsApp number as digits only — no "+", spaces, brackets or dashes. */
export const whatsappNumber = digitsOnly(clinicConfig.contact.whatsapp);

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function generalMessage(): string {
  return `Hello ${clinicConfig.name}, I would like to ask about booking a dental appointment.`;
}

export function serviceMessage(serviceName: string): string {
  return `Hello ${clinicConfig.name}, I would like more information about ${serviceName}.`;
}

export interface AppointmentDetails {
  name: string;
  phone: string;
  email: string;
  service: string;
  dentist: string;
  date: string; // YYYY-MM-DD
  time: string;
  patientType: string;
  contactMethod: string;
  message: string;
}

export function formatDateLong(value: string): string {
  const date = parseLocalDate(value);
  if (!date) return value;
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildAppointmentMessage(d: AppointmentDetails): string {
  return [
    `Hello ${clinicConfig.name},`,
    "",
    "I would like to request a dental appointment.",
    "",
    `Patient Name: ${d.name.trim()}`,
    `Phone: ${d.phone.trim()}`,
    `Email: ${d.email.trim()}`,
    `Treatment/Service: ${d.service}`,
    `Preferred Dentist: ${d.dentist}`,
    `Preferred Date: ${formatDateLong(d.date)}`,
    `Preferred Time: ${d.time}`,
    `Patient Type: ${d.patientType}`,
    `Preferred Contact Method: ${d.contactMethod}`,
    `Concern/Message: ${d.message.trim() || "Not provided"}`,
    "",
    "Please confirm the available appointment time. Thank you.",
  ].join("\n");
}

export function appointmentWhatsappUrl(d: AppointmentDetails): string {
  return whatsappUrl(buildAppointmentMessage(d));
}
