export interface Testimonial {
  name: string;
  /** Short line under the name, e.g. the treatment mentioned or the review source. */
  detail: string;
  quote: string;
  /** Optional 1–5. Leave undefined to hide stars. */
  rating?: number;
  /** `true` shows a "Sample" badge. Only ever add REAL, consented patient reviews. */
  isSample: boolean;
  /** Featured reviews appear in the homepage reviews section (all reviews appear on /testimonials). */
  featured?: boolean;
}

/**
 * Real patient reviews, copied word-for-word from the clinic's public Google reviews.
 * Star ratings weren't included with the copied text, so none are displayed per review —
 * the overall Google rating is shown separately (see `googleReviews` in clinic-config.ts).
 * Only ever add genuine reviews here; keep the reviewer's own wording.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Saifullah",
    detail: "Root canal treatment · Google review",
    quote:
      "I recently visited Dr Laila's clinic for RCT, the ambiance of the clinic and the attitude of the staff is very welcoming. She did the procedure very smoothly and professionally, had no pain or discomfort afterwards. She is highly recommended.",
    isSample: false,
    featured: true,
  },
  {
    name: "Muhammad Abdul Mannan",
    detail: "Scaling & PRP · Google review",
    quote:
      "Had my scaling and PRP treatment done at Laila Hayat Clinic and I couldn’t be happier with the experience. Dr. Minahil was incredibly professional, gentle, and attentive throughout the procedure. She explained everything clearly and made sure I was comfortable at every step, which really put me at ease.",
    isSample: false,
    featured: true,
  },
  {
    name: "Ahmad",
    detail: "Google review",
    quote:
      "I had a wonderful experience today for my visit here. The staff was super nice and the doctor looked after each and everything very meticulously. She asked me questions which helped them get a complete picture. I would recommend this place to everyone for sure. I'm going to be a regular from now on\n\nP.s : Forgot the best part, the charges were super nominal for the place and the type of services that they provide.",
    isSample: false,
    featured: true,
  },
  {
    name: "Momin",
    detail: "Cleaning & filling · Google review",
    quote:
      "Best dental experience I've had. I went in for a routine cleaning/filling and it was completely painless. Dr. Laila is very efficient and the clinic's environment is very relaxing and management is top notch. Very reasonable fees for the high quality of service provided. Will definitely be coming back.",
    isSample: false,
    featured: true,
  },
  {
    name: "Sardar Imran",
    detail: "Scaling & polishing · Google review",
    quote:
      "Dr Numrah is extremely cooperative and truly passionate about her work. I have a strong gag reflex and honestly tried my best to avoid the scaling and polishing procedure, but her patience, encouragement, and genuine care for her patients never let me give up. She stays committed no matter how challenging the situation is and makes you feel supported throughout. Thank you so much, Dr. Numrah, I genuinely appreciate your dedication and care 5 STARSSS ⭐⭐⭐⭐⭐",
    isSample: false,
    featured: true,
  },
  {
    name: "Zahid Hussain",
    detail: "Fillings · Google review",
    quote:
      "I had a great experience getting multiple fillings done here. The dentist was incredibly gentle and fast—I didn't feel a thing! The entire team creates such a warm and welcoming atmosphere. If you're nervous about dental work, this is definitely the place to go.",
    isSample: false,
    featured: true,
  },
  {
    name: "Hanan Farzand",
    detail: "Scaling & polishing · Google review",
    quote:
      "Had a great experience at the clinic. I went in for scaling and polishing, and the dentist also carefully removed leftover adhesive from my old braces that had still been on my teeth for almost 5 years after my braces were removed. Dr Minahil was also very kind to redo a filling which had chipped off , with no additional charges :).The whole process was very smooth. Would definitely recommend the clinic and my Dentist ; Dr Minahil, to anyone needing dental work!",
    isSample: false,
  },
  {
    name: "Emmad Ahmad Naseer",
    detail: "Google review",
    quote:
      "10/10 for the professional staff alongside comfortable space. I’d highly recommend their services since I’m very conscious about these things myself. If I’m rating their service 10/10 (after being so picky about it) and getting a family package right away after getting my procedure done, then I’d highly recommend you a visit and witness the results yourself.",
    isSample: false,
  },
  {
    name: "Raja Khalid",
    detail: "Google review",
    quote:
      "I got to treat my wife. We found the ambiance neat clean rather ultra hygienic. Dr. Minahil reflected us a polite yet pure professional. My wife compared her clinic with other in the locality n marked it more patient friendy n comfort.",
    isSample: false,
  },
];
