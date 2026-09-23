import type { Service } from "./types";

/**
 * Sample service content — general, patient-friendly information only.
 * Edit, add or remove entries freely. Each `slug` becomes /services/<slug>.
 * Have a qualified dentist review all clinical wording before publishing.
 */
export const services: Service[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    short: "Everyday care to keep your teeth and gums healthy, from fillings to preventive advice.",
    icon: "stethoscope",
    category: "Preventive",
    duration: "Usually 30–60 minutes, depending on the treatment",
    overview:
      "General dentistry covers the routine care that keeps your mouth comfortable and healthy: examinations, fillings, preventive advice and the early management of common problems. Your dentist will explain what they find and talk through the options before any treatment begins.",
    whoNeeds: [
      "Anyone who wants a regular home for their dental care",
      "People with a cavity, chipped tooth or worn filling",
      "Patients who feel sensitivity or occasional discomfort when eating or drinking",
      "Families looking for one clinic that can care for all ages",
    ],
    benefits: [
      "Problems can be found and managed at an earlier stage",
      "A clear, personalised plan for your oral health",
      "Practical advice you can use at home",
      "Continuity of care with a team who knows your history",
    ],
    process: [
      { title: "Discuss your concerns", text: "We listen to your goals, symptoms and medical history." },
      { title: "Examination", text: "Your dentist checks your teeth, gums and bite, and may recommend X-rays if appropriate." },
      { title: "Your options", text: "We explain what we found and the treatment choices available, including next steps." },
      { title: "Treatment & follow-up", text: "Any agreed treatment is carried out with your comfort in mind, and we arrange follow-up care." },
    ],
    preparation: [
      "Bring a list of any medicines you take and relevant medical conditions",
      "Bring previous dental records or X-rays if you have them",
      "Let us know if you feel anxious — we can adapt how we work",
    ],
    aftercare: [
      "Follow any specific advice your dentist gives after treatment",
      "Avoid eating until numbness wears off if you had local anaesthetic",
      "Contact us if discomfort increases or does not settle as expected",
    ],
    faqs: [
      { question: "How often should I visit the dentist?", answer: "Many people are advised to visit every six to twelve months, but your dentist will recommend a schedule that suits your own oral health." },
      { question: "Will I be told about costs before treatment?", answer: "Yes. We aim to explain the options and expected costs before you decide to go ahead." },
    ],
  },
  {
    slug: "dental-checkups",
    name: "Dental Checkups",
    short: "A thorough, unhurried examination of your teeth, gums and mouth, with clear advice.",
    icon: "clipboard-check",
    category: "Preventive",
    duration: "Typically 20–40 minutes",
    overview:
      "A dental checkup is a full look at the health of your teeth, gums and soft tissues. Regular checkups help your dentist spot changes early and give you the chance to ask questions and get personalised advice on caring for your teeth at home.",
    whoNeeds: [
      "Anyone who has not seen a dentist for some time",
      "Patients who want to keep on top of their oral health",
      "People starting orthodontic or cosmetic treatment who need a baseline assessment",
      "Anyone new to the area looking for a dentist",
    ],
    benefits: [
      "Changes can be noticed sooner, when treatment is often simpler",
      "Personalised guidance on brushing, flossing and diet",
      "A record of your oral health over time",
      "Peace of mind that nothing has been overlooked",
    ],
    process: [
      { title: "Health history review", text: "We update your medical and dental history and note any concerns." },
      { title: "Clinical examination", text: "Your dentist examines your teeth, gums, jaw and soft tissues." },
      { title: "Imaging if needed", text: "X-rays may be recommended when they will help with diagnosis." },
      { title: "Summary & plan", text: "We explain the findings in plain language and suggest a plan and recall interval." },
    ],
    preparation: [
      "Brush and floss as usual before your visit",
      "Note down any sensitivity, pain or changes you have noticed",
      "Bring your medication list and any insurance details",
    ],
    aftercare: [
      "Follow the home-care advice given at your visit",
      "Book any recommended follow-up treatment",
      "Keep to your suggested recall schedule",
    ],
    faqs: [
      { question: "Is a checkup uncomfortable?", answer: "A checkup is usually straightforward. If you have any sensitive areas, tell us and we will take extra care." },
      { question: "Do I need X-rays at every visit?", answer: "Not necessarily. Your dentist will only recommend X-rays when they are likely to help with diagnosis or planning." },
    ],
  },
  {
    slug: "teeth-cleaning",
    name: "Scaling and Polishing",
    short: "Professional scaling and polishing to remove plaque and tartar and leave your mouth feeling fresh.",
    icon: "sparkles",
    category: "Preventive",
    duration: "Around 30–45 minutes",
    overview:
      "Professional cleaning removes plaque and hardened tartar (calculus) that brushing at home cannot fully reach. It is followed by polishing to smooth tooth surfaces, and it is an important part of keeping gums healthy.",
    whoNeeds: [
      "Patients with visible tartar or plaque build-up",
      "People whose gums bleed or feel tender when brushing",
      "Anyone due for routine preventive care",
      "Patients preparing for whitening or orthodontic treatment",
    ],
    benefits: [
      "Removes deposits that home brushing may miss",
      "Supports healthier gums",
      "Leaves teeth feeling smooth and fresh",
      "Helps surface stains be removed so teeth look brighter",
    ],
    process: [
      { title: "Assessment", text: "We check the condition of your gums and teeth." },
      { title: "Scaling", text: "Plaque and tartar are gently removed using specialist instruments." },
      { title: "Polishing", text: "Teeth are polished to smooth the surface and remove light staining." },
      { title: "Home-care advice", text: "We show you techniques and products that suit your mouth." },
    ],
    preparation: [
      "Brush your teeth before you come, as you normally would",
      "Tell us if your teeth or gums are especially sensitive",
    ],
    aftercare: [
      "Your gums may feel slightly tender for a short time — this is usually mild",
      "Continue gentle brushing and flossing",
      "Contact us if bleeding or discomfort persists",
    ],
    faqs: [
      { question: "Does cleaning damage my teeth?", answer: "Professional cleaning is a routine procedure carried out with care. It removes deposits rather than enamel." },
      { question: "How often should I have my teeth cleaned?", answer: "This depends on your gum health and how quickly deposits build up. Your dentist will advise an interval for you." },
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Dentist-supervised whitening options to lighten the shade of your natural teeth.",
    icon: "sun",
    category: "Cosmetic",
    duration: "Roughly 60–90 minutes for in-clinic sessions; take-home plans vary",
    overview:
      "Teeth whitening lightens the natural shade of your teeth. Results vary between people, depending on the type and cause of discolouration. After an examination, your dentist can explain whether whitening is suitable for you and which approach may fit best.",
    whoNeeds: [
      "Adults with generally healthy teeth and gums who want a lighter shade",
      "People whose teeth have darkened with age, coffee, tea or other staining",
      "Patients preparing for a special occasion (with realistic expectations)",
    ],
    benefits: [
      "Can lighten the shade of natural teeth",
      "Supervised by a dental professional for safety",
      "Options for in-clinic or take-home use",
      "Non-surgical and conservative compared with other cosmetic treatments",
    ],
    process: [
      { title: "Suitability check", text: "We examine your teeth and gums and discuss what to expect." },
      { title: "Preparation", text: "Teeth are cleaned and your gums are protected." },
      { title: "Whitening", text: "The whitening agent is applied in clinic, or a take-home kit is fitted and explained." },
      { title: "Review", text: "We check the result and advise how to maintain it." },
    ],
    preparation: [
      "Have any decay or gum problems treated first",
      "Tell us about tooth sensitivity or existing restorations — whitening does not change their colour",
    ],
    aftercare: [
      "Temporary sensitivity can occur; let us know if it is bothersome",
      "Limit staining foods and drinks such as coffee, red wine and tobacco, especially in the first days",
      "Follow your dentist's advice on top-up treatments",
    ],
    faqs: [
      { question: "Is whitening suitable for everyone?", answer: "Not always. Pregnancy, certain dental conditions and existing restorations can affect suitability, so an examination comes first." },
      { question: "How long do results last?", answer: "This varies from person to person and depends on diet, habits and home care. Your dentist can give you an idea for your situation." },
    ],
  },
  {
    slug: "dental-fillings",
    name: "Dental Fillings",
    short: "Repair teeth affected by decay or minor damage, restoring their shape and function.",
    icon: "layers",
    category: "Restorative",
    duration: "Usually 30–60 minutes per tooth, depending on its size and position",
    overview:
      "A filling repairs a tooth that has been damaged by decay or a small fracture. Your dentist removes the affected part of the tooth, cleans the area and fills it with a suitable material so the tooth can work comfortably again. We explain the options for your tooth before starting.",
    whoNeeds: [
      "Patients with a cavity or a dark spot on a tooth",
      "People with a chipped or worn tooth",
      "Anyone with a filling that has cracked, worn down or come out",
      "Patients who feel sensitivity in a particular tooth when eating or drinking",
    ],
    benefits: [
      "Helps stop decay from progressing further in the treated tooth",
      "Restores the shape of the tooth for comfortable chewing",
      "Tooth-coloured materials can blend with your natural teeth",
      "Usually completed in a single visit",
    ],
    process: [
      { title: "Examination", text: "We check the tooth and may take an X-ray to see how far the problem extends." },
      { title: "Numbing", text: "Local anaesthetic is used so you stay comfortable during treatment." },
      { title: "Cleaning the tooth", text: "Decayed or damaged material is carefully removed." },
      { title: "Filling & finishing", text: "The filling is placed, shaped and polished, and your bite is checked." },
    ],
    preparation: [
      "Tell us about any allergies or medicines you take",
      "Eat beforehand if you can, as numbness can last a few hours",
      "Let us know if you feel anxious so we can go at your pace",
    ],
    aftercare: [
      "Avoid chewing on the treated side until the numbness has worn off",
      "Mild sensitivity can occur for a short time — tell us if it persists",
      "Keep brushing and flossing normally and attend regular check-ups",
    ],
    faqs: [
      { question: "Will a filling hurt?", answer: "The area is numbed first, so you should feel pressure rather than pain. Tell us straight away if you feel any discomfort." },
      { question: "How long does a filling last?", answer: "This varies with the material, the size of the filling and your oral hygiene. Regular check-ups help us monitor it." },
    ],
  },
  {
    slug: "prp-treatment",
    name: "PRP Treatment",
    short: "Platelet-rich plasma (PRP), prepared from a small sample of your own blood, used to support healing and rejuvenation.",
    icon: "droplets",
    category: "Cosmetic",
    duration: "Typically 45–60 minutes per session; the number of sessions depends on the goal",
    overview:
      "PRP (platelet-rich plasma) treatment uses a small sample of your own blood, which is processed to concentrate the platelets and then applied where your clinician recommends. Suitability, the number of sessions and expected benefits differ from person to person, so an assessment always comes first. Results cannot be guaranteed.",
    whoNeeds: [
      "Patients who would like to discuss PRP as part of their care plan",
      "People looking for options that use their own body's natural healing factors",
      "Those advised by their clinician that PRP may suit their situation",
    ],
    benefits: [
      "Uses your own blood, so no foreign material is introduced",
      "May support healing and tissue rejuvenation in suitable cases",
      "Can be combined with other treatments where appropriate",
    ],
    process: [
      { title: "Consultation", text: "We review your health history and goals and explain whether PRP may suit you." },
      { title: "Sample collection", text: "A small blood sample is taken, similar to a routine blood test." },
      { title: "Preparation", text: "The sample is processed to concentrate the platelets." },
      { title: "Application & review", text: "PRP is applied as planned, and we agree any follow-up sessions." },
    ],
    preparation: [
      "Tell us about medicines (especially blood thinners), medical conditions and allergies",
      "Stay well hydrated and eat normally beforehand unless advised otherwise",
    ],
    aftercare: [
      "Follow the specific care instructions given after your session",
      "Mild redness or tenderness can occur — contact us if it worsens",
      "Attend follow-up appointments as advised",
    ],
    faqs: [
      { question: "Is PRP suitable for everyone?", answer: "Not always. Some health conditions and medicines can affect suitability, so your clinician will assess you first." },
      { question: "What results can I expect?", answer: "Responses vary between individuals and no specific outcome can be promised. We will discuss realistic expectations at your consultation." },
    ],
  },
  {
    slug: "braces-and-orthodontics",
    name: "Braces and Orthodontics",
    short: "Fixed and removable orthodontic options to help align teeth and improve how they bite together.",
    icon: "ruler",
    category: "Orthodontics",
    duration: "Regular adjustment visits of 20–40 minutes; total treatment time varies widely",
    overview:
      "Orthodontic treatment gradually moves teeth into better positions to improve alignment and bite. Treatment length and the best approach vary with your goals and the complexity of your case, and will be discussed after an assessment.",
    whoNeeds: [
      "Children and teenagers with crowded or crooked teeth",
      "Adults who want to improve alignment",
      "Patients with bite concerns identified by their dentist",
    ],
    benefits: [
      "Straighter, more evenly spaced teeth",
      "Teeth that may be easier to clean",
      "A bite that works more comfortably",
      "Options to suit different ages and lifestyles",
    ],
    process: [
      { title: "Assessment", text: "Photos, X-rays and impressions or scans help us plan." },
      { title: "Treatment plan", text: "We discuss your options, expected timeline and costs." },
      { title: "Fitting", text: "Your appliance is fitted and you learn how to care for it." },
      { title: "Adjustments & retention", text: "Regular visits keep treatment on track, followed by retainers to hold the result." },
    ],
    preparation: [
      "Bring any previous dental X-rays if you have them",
      "Have any needed fillings or gum treatment completed first",
    ],
    aftercare: [
      "Clean carefully around brackets and wires as shown",
      "Avoid very hard or sticky foods that can damage the appliance",
      "Wear retainers exactly as instructed after treatment",
    ],
    faqs: [
      { question: "How long does orthodontic treatment take?", answer: "It varies with each patient. Your dentist will give an estimate after your assessment, and it may change as treatment progresses." },
      { question: "Are braces only for children?", answer: "No. Many adults have orthodontic treatment. Suitability depends on the health of your teeth and gums." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceCategories = Array.from(new Set(services.map((s) => s.category)));

/**
 * Original, copyright-free illustration for each service — a stylised row of teeth
 * (no faces) with a small accent themed to the treatment. See public/images/ and, for
 * the generator, git history of gen-teeth.mjs. Falls back to a generic image for any
 * service slug added later without one of its own.
 */
export const serviceImages: Record<string, string> = {
  "general-dentistry": "/images/service-general-dentistry.webp",
  "dental-checkups": "/images/service-dental-checkups.webp",
  "teeth-cleaning": "/images/service-teeth-cleaning.webp",
  "teeth-whitening": "/images/service-teeth-whitening.webp",
  "dental-fillings": "/images/service-dental-fillings.webp",
  "prp-treatment": "/images/service-prp-treatment.webp",
  "braces-and-orthodontics": "/images/service-braces-and-orthodontics.webp",
};
export const serviceImage = (slug: string) => serviceImages[slug] ?? "/images/service-general-dentistry.webp";
