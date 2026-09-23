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
 * No individual dentists were listed on this clinic's Google profile, so none
 * are invented here. Add real entries (with the clinic's confirmation) once
 * names, qualifications and photos are supplied — see README.md.
 */
export const team: Dentist[] = [];
