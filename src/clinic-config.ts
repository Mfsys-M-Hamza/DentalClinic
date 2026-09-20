/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLINIC CONFIGURATION  —  the single place to customise this website.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything client-specific lives here: name, contact details, WhatsApp
 *  number, brand colours, opening hours, social links and SEO settings.
 *
 *  Client: Dental Studio by Dr. Laila (Bahria Town Phase 7, Rawalpindi).
 *  Source: the clinic's Google Business Profile. Items marked "CONFIRM" were not
 *  on the profile and need to be confirmed with the client before launch.
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
  name: "Dental Studio by Dr. Laila",
  tagline: "Comfortable, skilled dental care in Bahria Town",

  /** Face of the clinic shown in the hero and About page. CONFIRM role/qualifications. */
  doctor: {
    name: "Dr. Laila",
    qualifications: "", // CONFIRM – e.g. "BDS, RDS" (hidden while empty)
    yearsOfExperience: "", // CONFIRM – hidden while empty
    role: "Founder",
  },

  /* ── Contact ──────────────────────────────────────────────────────────── */
  contact: {
    /** Digits with country code. CONFIRM this number is on WhatsApp (profile lists only a phone). */
    whatsapp: "923335237907",
    phone: "+92 333 5237907",
    /** CONFIRM – no email on the profile. The email row is hidden while this is empty. */
    email: "",
    /** CONFIRM – no separate emergency line listed, so the main number is used. */
    emergencyPhone: "+92 333 5237907",
    address: "China Center 2, Walayat Complex, Bahria Town Phase 7",
    cityCountry: "Rawalpindi, Pakistan",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dental+Studio+by+Dr.+Laila+Bahria+Town+Phase+7+Rawalpindi",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Dental+Studio+by+Dr.+Laila,+Walayat+Complex,+Bahria+Town+Phase+7,+Rawalpindi&output=embed",
  },

  /** Public Google rating from the business profile. Update when it changes. */
  googleReviews: {
    rating: "4.8",
    count: "341",
    url: "https://www.google.com/maps/search/?api=1&query=Dental+Studio+by+Dr.+Laila+Bahria+Town+Phase+7+Rawalpindi",
  },

  /* ── Opening hours (from the Google profile) ──────────────────────────── */
  hours: {
    timeZone: "Asia/Karachi",
    schedule: [
      { day: "Monday", open: "16:00", close: "21:00" },
      { day: "Tuesday", open: "16:00", close: "21:00" },
      { day: "Wednesday", open: "16:00", close: "21:00" },
      { day: "Thursday", open: "16:00", close: "21:00" },
      { day: "Friday", open: "16:00", close: "21:00" },
      { day: "Saturday", open: "16:00", close: "21:00" },
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
    siteUrl: "https://www.example-clinic.com", // CONFIRM – the real domain, no trailing slash
    primaryCity: "Rawalpindi",
    serviceArea: "Bahria Town and nearby areas of Rawalpindi and Islamabad",
    primaryKeyword: "dentist in Bahria Town Rawalpindi",
    secondaryKeywords: ["teeth whitening Rawalpindi", "braces Rawalpindi", "scaling and polishing Bahria Town"],
    defaultDescription:
      "Dental Studio by Dr. Laila in Bahria Town Phase 7, Rawalpindi — teeth whitening, fillings, scaling & polishing, PRP and braces with a focus on patient comfort. Open Monday to Saturday, 4–9 PM.",
    locale: "en_PK",
  },

  /* ── Homepage copy ────────────────────────────────────────────────────── */
  home: {
    hero: {
      eyebrow: "Dental care in Bahria Town",
      headline: "Comfortable, clearly explained dental care for your whole family",
      subheadline:
        "From scaling and whitening to fillings and braces, our team takes the time to listen, explain your options and plan treatment around you — with evening appointments six days a week.",
    },
    /** Verified on the Google profile. Plain numbers animate; text renders as-is. */
    stats: [
      { label: "Google rating", value: "4.8/5" },
      { label: "Google reviews", value: "341" },
      { label: "Days open each week", value: "6" },
      { label: "Dentists", value: "3" },
    ],
    featuredServiceSlugs: [
      "teeth-whitening",
      "teeth-cleaning",
      "dental-fillings",
      "braces-and-orthodontics",
      "prp-treatment",
      "dental-checkups",
    ],
  },

  /* ── Insurance & payment (CONFIRM with the clinic) ────────────────────── */
  payments: {
    insurance: "Please contact the clinic before your visit to ask whether your insurance or company panel is accepted.",
    methods: ["Please ask the clinic which payment methods are accepted"],
    financing: "Ask our team about payment options for longer treatments such as braces.",
  },

  /* ── Booking form ─────────────────────────────────────────────────────── */
  booking: {
    slotMinutes: 30,
  },

  /* ── Images (swap paths for real clinic photography) ──────────────────── */
  images: {
    hero: "/images/hero.svg",
    heroSecondary: "/images/about-1.svg",
    about: "/images/about-2.svg",
    facilities: ["/images/facility-1.svg", "/images/facility-2.svg", "/images/facility-3.svg"],
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
