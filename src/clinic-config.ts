/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLINIC CONFIGURATION  —  the single place to customise this website.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything client-specific lives here: name, contact details, WhatsApp
 *  number, brand colours, opening hours, social links and SEO settings.
 *
 *  Client: Dental Valley (Model Town Humak, Islamabad).
 *  Source: the clinic's Google Business Profile (limited/signed-out view — no
 *  rating, dentist names, hours beyond the current day, or email were shown).
 *  Items marked "CONFIRM" need to be confirmed with the client before launch.
 *  Longer content (services, team, FAQs, blog, gallery) is in `src/data/`.
 */

export interface DaySchedule {
  /** Full English day name, Monday → Sunday (keep this order). */
  day: string;
  /** 24h "HH:MM". Omit `open`/`close` to mark the day as closed. */
  open?: string;
  close?: string;
}

export const clinicConfig = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: "Dental Valley",
  tagline: "Friendly, modern dental care in Model Town Humak", // CONFIRM – not on the profile, edit freely

  /** Face of the clinic shown in the hero and About page. CONFIRM — no dentist was named on the profile. */
  doctor: {
    name: "Dental Valley Team", // CONFIRM – replace with the lead dentist's name if the clinic wants one featured
    qualifications: "", // CONFIRM – hidden while empty
    yearsOfExperience: "", // CONFIRM – hidden while empty
    role: "General & family dentistry",
  },

  /* ── Contact ──────────────────────────────────────────────────────────── */
  contact: {
    /** Digits with country code. CONFIRM this number is on WhatsApp (profile lists only a phone). */
    whatsapp: "923445432013",
    phone: "+92 344 5432013",
    /** CONFIRM – no email on the profile. The email row is hidden while this is empty. */
    email: "",
    /** CONFIRM – no separate emergency line listed, so the main number is used. */
    emergencyPhone: "+92 344 5432013",
    address: "Dental Valley, Nayi Abadi, near Ahmad Marriage Hall, Model Town Humak",
    cityCountry: "Islamabad, Pakistan",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dental+Valley+Model+Town+Humak+Islamabad",
    mapEmbedUrl: "https://www.google.com/maps?q=Dental+Valley,+Model+Town+Humak,+Islamabad&output=embed",
  },

  /**
   * Public Google rating — CONFIRM. The profile showed no star rating or review
   * count in the limited view checked (likely a new or low-review listing), so
   * none is shown on the site. Fill these in once the clinic has visible reviews.
   */
  googleReviews: {
    rating: "",
    count: "",
    url: "https://www.google.com/maps/search/?api=1&query=Dental+Valley+Model+Town+Humak+Islamabad",
  },

  /* ── Opening hours ─────────────────────────────────────────────────────── */
  hours: {
    timeZone: "Asia/Karachi",
    /**
     * CONFIRM – the profile's limited view only showed today's hours
     * (Wednesday, 9 AM–6 PM). The same hours are assumed Monday–Saturday
     * with Sunday closed; confirm the real weekly schedule with the client.
     */
    schedule: [
      { day: "Monday", open: "09:00", close: "18:00" },
      { day: "Tuesday", open: "09:00", close: "18:00" },
      { day: "Wednesday", open: "09:00", close: "18:00" },
      { day: "Thursday", open: "09:00", close: "18:00" },
      { day: "Friday", open: "09:00", close: "18:00" },
      { day: "Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday" },
    ] as DaySchedule[],
  },

  /* ── Brand colours (any valid CSS colour) ─────────────────────────────── */
  brand: {
    primary: "#0f766e",
    secondary: "#f4ede3",
    accent: "#d08a3c",
  },

  /* ── Social (CONFIRM – none on the profile; icons hidden while empty) ─── */
  social: {
    facebook: "",
    instagram: "",
  },

  languages: ["English", "Urdu"], // CONFIRM
  currency: "PKR",

  /* ── SEO & local search ───────────────────────────────────────────────── */
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-clinic.com", // CONFIRM – the real domain, no trailing slash
    primaryCity: "Islamabad",
    serviceArea: "Model Town Humak and nearby neighbourhoods",
    primaryKeyword: "dentist in Model Town Humak Islamabad", // CONFIRM
    secondaryKeywords: ["dental clinic Islamabad", "teeth cleaning Islamabad", "dentist near Humak"], // CONFIRM
    defaultDescription:
      "Dental Valley in Model Town Humak, Islamabad — general and family dental care with a focus on patient comfort.",
    locale: "en_PK",
  },

  /* ── Homepage copy ────────────────────────────────────────────────────── */
  home: {
    hero: {
      eyebrow: "Dental care in Model Town Humak",
      headline: "Comfortable, clearly explained dental care for your whole family",
      subheadline:
        "From check-ups and cleaning to fillings and more, our team takes the time to listen, explain your options and plan treatment around you.",
    },
    /** None of these are verified for this clinic yet — replace with real figures once confirmed. */
    stats: [
      { label: "Years of experience", value: "[00]+" },
      { label: "Patients served", value: "[0,000]+" },
      { label: "Patient rating", value: "[0.0]/5" },
      { label: "Certifications", value: "[00]" },
    ],
    featuredServiceSlugs: [
      "general-dentistry",
      "dental-checkups",
      "teeth-cleaning",
      "teeth-whitening",
      "dental-fillings",
      "braces-and-orthodontics",
    ],
  },

  /* ── Insurance & payment (CONFIRM with the clinic) ────────────────────── */
  payments: {
    insurance: "Please contact the clinic before your visit to ask whether your insurance or company panel is accepted.",
    methods: ["Please ask the clinic which payment methods are accepted"],
    financing: "Ask our team about payment options for longer treatments.",
  },

  /* ── Booking form ─────────────────────────────────────────────────────── */
  booking: {
    slotMinutes: 30,
  },

  /* ── Images — CONFIRM: no real photography supplied yet, so placeholder
     illustrations are used. Swap these paths for real clinic photography. ── */
  images: {
    hero: "/images/clinic/treatment-room.webp",
    heroSecondary: "/images/clinic/doctor-portrait.webp",
    about: "/images/about-2.svg", // CONFIRM – swap for a real reception/waiting-area photo when supplied
    facilities: ["/images/facility-1.svg", "/images/facility-2.svg", "/images/facility-3.svg"], // CONFIRM – placeholders until more real photos are supplied
  },
} as const;

export type ClinicConfig = typeof clinicConfig;

/* ── Navigation ─────────────────────────────────────────────────────────── */
export const navigation = {
  main: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  more: [
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} as const;
