export interface Dentist {
  slug: string;
  name: string;
  role: string;
  /** Leave empty until confirmed — hidden while empty. */
  qualifications: string;
  focus: string[];
  bio: string;
  photo: string;
}

/**
 * Dentists listed on the clinic's Google profile. Qualifications, specialities and
 * photos still need to be supplied by the client (CONFIRM), so they are left blank
 * rather than guessed.
 */
export const team: Dentist[] = [
  {
    slug: "dr-minahil",
    name: "Dr. Minahil",
    role: "Dentist",
    qualifications: "",
    focus: [],
    bio: "Dr. Minahil is part of the care team at Dental Studio by Dr. Laila, focused on comfortable treatment and explaining every option clearly before you decide.",
    photo: "/images/team-1.svg",
  },
  {
    slug: "dr-numrah",
    name: "Dr. Numrah",
    role: "Dentist",
    qualifications: "",
    focus: [],
    bio: "Dr. Numrah is part of the care team at Dental Studio by Dr. Laila, taking time to listen to patients and plan treatment around their needs.",
    photo: "/images/team-2.svg",
  },
  {
    slug: "dr-warda",
    name: "Dr. Warda",
    role: "Dentist",
    qualifications: "",
    focus: [],
    bio: "Dr. Warda is part of the care team at Dental Studio by Dr. Laila, committed to gentle, patient-first dental care.",
    photo: "/images/team-3.svg",
  },
];
