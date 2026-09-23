/** Shared marketing copy for homepage / about sections. Edit freely. */

export type ContentIcon =
  | "message"
  | "clipboard"
  | "heart"
  | "shield"
  | "users"
  | "wallet"
  | "calendar"
  | "stethoscope"
  | "sparkles"
  | "scan"
  | "camera"
  | "microscope";

export const whyChooseUs: { icon: ContentIcon; title: string; text: string }[] = [
  { icon: "message", title: "Clear, honest explanations", text: "We explain what we find and your options in plain language, so you can decide with confidence." },
  { icon: "clipboard", title: "Personalised treatment plans", text: "No one-size-fits-all. Your plan is built around your health, goals and schedule." },
  { icon: "heart", title: "Comfort-focused care", text: "We work at your pace and discuss comfort options, especially if you feel anxious." },
  { icon: "users", title: "Care for the whole family", text: "From children's first visits to adult treatments, everyone can see us under one roof." },
  { icon: "calendar", title: "Convenient opening hours", text: "See our opening hours below, or message us on WhatsApp to check availability." },
  { icon: "wallet", title: "Transparent conversations about cost", text: "We aim to talk through options and expected costs before treatment begins." },
];

export const treatmentProcess: { icon: ContentIcon; title: string; text: string }[] = [
  { icon: "calendar", title: "Request your visit", text: "Book online, call, or message us on WhatsApp — we'll confirm a suitable time." },
  { icon: "stethoscope", title: "Consultation & examination", text: "We listen to your concerns and carry out a thorough check-up." },
  { icon: "clipboard", title: "Your personalised plan", text: "We explain your options, timing and costs so you can choose what's right for you." },
  { icon: "sparkles", title: "Treatment with care", text: "Treatment is carried out with your comfort in mind, step by step." },
  { icon: "heart", title: "Follow-up & support", text: "We give aftercare guidance and stay in touch as you recover." },
];

/**
 * Facilities and accessibility. CONFIRM with the clinic — the Google profile's
 * limited view didn't list accessibility features (wheelchair access, parking,
 * etc.), so only general, non-specific points are used until confirmed.
 */
export const facilities: { icon: ContentIcon; title: string; text: string }[] = [
  { icon: "sparkles", title: "Comfort-focused care", text: "Our approach puts patient comfort first, with clear explanations at every step." },
  { icon: "heart", title: "Welcoming for the whole family", text: "A calm, friendly environment for patients of all ages." },
  { icon: "clipboard", title: "Clear treatment planning", text: "We talk through your options and costs before any treatment begins." },
  { icon: "message", title: "Easy to reach us", text: "Call, message us on WhatsApp, or visit us in Model Town Humak." },
];

export const medicalDisclaimer =
  "The information on this website is general in nature and does not replace diagnosis, advice or treatment from a qualified dental professional. Individual results and suitability vary. If you have urgent symptoms, contact the clinic's emergency number or your local emergency service.";
