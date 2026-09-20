import { clinicConfig } from "../clinic-config";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  readTime: string;
  author: string;
  image: string;
  /** Service slugs for internal linking. */
  relatedServices: string[];
  sections: BlogSection[];
}

/** Sample articles — general education only. Replace with the clinic's own writing. */
export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-should-you-see-a-dentist",
    title: "How Often Should You See a Dentist?",
    excerpt:
      "Regular check-ups help catch small problems early. Here's how to think about the right schedule for your mouth.",
    category: "Preventive care",
    date: "2026-01-12",
    readTime: "4 min read",
    author: clinicConfig.name,
    image: "/images/blog-1.svg",
    relatedServices: ["dental-checkups", "teeth-cleaning"],
    sections: [
      {
        heading: "There is no single answer",
        paragraphs: [
          "Many people are advised to visit the dentist every six to twelve months, but the right interval depends on your own situation. Your dentist considers your gum health, how likely you are to develop cavities, your medical history and your habits.",
        ],
      },
      {
        heading: "Why regular visits matter",
        paragraphs: [
          "Dental problems often develop quietly. A check-up gives your dentist the chance to notice early changes — long before they cause pain — when treatment is often simpler.",
        ],
        list: [
          "Early detection of decay and gum changes",
          "Professional cleaning of areas that are hard to reach at home",
          "Personalised advice on brushing, flossing and diet",
          "A chance to ask any questions about your teeth",
        ],
      },
      {
        heading: "When to come in sooner",
        paragraphs: [
          "Do not wait for your next routine visit if you notice ongoing toothache, bleeding gums, swelling, a loose tooth or a change in how your teeth bite together. Contact the clinic and we will advise on the next step.",
        ],
      },
      {
        heading: "A note on this article",
        paragraphs: [
          "This article is general information and is not a substitute for advice from a qualified dental professional.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-your-first-dental-visit",
    title: "Preparing for Your First Dental Visit",
    excerpt:
      "A simple checklist to help you feel relaxed and ready, whether it's been a few months or many years.",
    category: "New patients",
    date: "2026-02-03",
    readTime: "3 min read",
    author: clinicConfig.name,
    image: "/images/blog-2.svg",
    relatedServices: ["general-dentistry", "dental-checkups"],
    sections: [
      {
        heading: "It's normal to feel a little nervous",
        paragraphs: [
          "If you haven't been to the dentist for a while, you are not alone. Our team will never judge — our job is to help you move forward at a pace that feels comfortable.",
        ],
      },
      {
        heading: "What to bring",
        paragraphs: ["A little preparation helps your first visit go smoothly."],
        list: [
          "A photo ID and insurance details if applicable",
          "A list of medicines and any medical conditions",
          "Previous dental X-rays or records, if you have them",
          "A list of questions or concerns you'd like to talk about",
        ],
      },
      {
        heading: "What will happen",
        paragraphs: [
          "We will start by talking through your history and goals. Your dentist will then examine your teeth and gums, and may recommend X-rays. Afterwards, we explain what we found and the options available — there is no pressure to decide on the spot.",
        ],
      },
    ],
  },
  {
    slug: "what-to-do-in-a-dental-emergency",
    title: "What to Do in a Dental Emergency",
    excerpt:
      "Quick, practical first steps for common dental emergencies — and when to seek urgent help.",
    category: "Emergency care",
    date: "2026-03-18",
    readTime: "5 min read",
    author: clinicConfig.name,
    image: "/images/blog-3.svg",
    relatedServices: ["dental-checkups", "dental-fillings"],
    sections: [
      {
        heading: "Stay calm and call us",
        paragraphs: [
          "If you have severe pain, swelling, a knocked-out tooth or bleeding that will not stop, call the clinic straight away. We can advise you over the phone and arrange to see you as soon as possible.",
        ],
      },
      {
        heading: "Common situations",
        paragraphs: ["These are general first-aid tips only — always follow the advice of a dental professional."],
        list: [
          "Knocked-out adult tooth: pick it up by the crown (not the root), gently rinse if dirty and seek urgent dental care. Ask us how to keep it moist on the way.",
          "Toothache: rinse with warm water, gently floss to remove trapped food and contact us. Avoid placing aspirin directly on the gum.",
          "Broken tooth: rinse your mouth, save any pieces and call us.",
          "Swelling of the face or jaw: seek prompt care, as this can be a sign of infection.",
        ],
      },
      {
        heading: "When to call emergency services",
        paragraphs: [
          "If you have difficulty breathing or swallowing, swelling that is spreading rapidly, or a serious injury to the face or head, contact your local emergency services immediately rather than waiting for a dental appointment.",
        ],
      },
    ],
  },
  {
    slug: "helping-children-feel-at-ease-at-the-dentist",
    title: "Helping Children Feel at Ease at the Dentist",
    excerpt:
      "Simple ways parents can make dental visits a positive experience for little ones.",
    category: "Family & children",
    date: "2026-04-09",
    readTime: "4 min read",
    author: clinicConfig.name,
    image: "/images/blog-4.svg",
    relatedServices: ["dental-checkups", "teeth-cleaning"],
    sections: [
      {
        heading: "Start early and keep it positive",
        paragraphs: [
          "Regular visits from an early age help children become familiar with the dental environment. Talk about the visit as something ordinary and friendly, and avoid using words that could cause worry.",
        ],
      },
      {
        heading: "Tips for parents",
        paragraphs: ["A few small things can make a big difference."],
        list: [
          "Choose a time of day when your child is usually rested and calm",
          "Read a picture book about visiting the dentist together",
          "Stay positive and let the team explain each step",
          "Praise your child afterwards for being brave",
        ],
      },
      {
        heading: "Building good habits at home",
        paragraphs: [
          "Brushing twice a day with an appropriate amount of toothpaste, limiting sugary snacks and drinks and attending regular check-ups all support healthy teeth as your child grows.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
