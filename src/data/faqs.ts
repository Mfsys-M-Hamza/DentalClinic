import type { Faq } from "./types";

export interface FaqGroup {
  title: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Booking & visits",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Use the booking form on our website to prepare your request, then send it to us on WhatsApp — or simply call the clinic. A request is not a confirmed appointment until our team replies with an available time.",
      },
      {
        question: "What should I bring to my first visit?",
        answer:
          "Please bring a photo ID, a list of any medicines you take, details of relevant medical conditions and any previous dental records or X-rays. If you have insurance, bring your details too.",
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "Please let us know as early as you can by phone or WhatsApp so that we can offer the time to another patient and find a new slot for you.",
      },
      {
        question: "Do you see patients in an emergency?",
        answer:
          "If you have dental pain or an injury, call the clinic during opening hours and we will advise you on the next step. If you have difficulty breathing or swallowing, or a serious facial injury, contact your local emergency services immediately.",
      },
    ],
  },
  {
    title: "Costs & insurance",
    items: [
      {
        question: "Will I know the cost before treatment starts?",
        answer:
          "We aim to explain your options and the expected costs before you decide to go ahead. Costs can change if your treatment needs change, and we will talk to you first.",
      },
      {
        question: "Do you accept dental insurance?",
        answer:
          "Please contact us before your visit with your provider details and we will help you understand what may be possible. Coverage depends on your individual plan.",
      },
      {
        question: "Are payment plans available?",
        answer:
          "Ask our team about payment options for larger treatments. Availability depends on the treatment and clinic policy.",
      },
    ],
  },
  {
    title: "Comfort & care",
    items: [
      {
        question: "I feel nervous about the dentist. Can you help?",
        answer:
          "Many people feel that way. Tell us when you book, and we will take things at your pace, explain each step and pause whenever you need to. Ask us about the comfort options we can offer.",
      },
      {
        question: "Is treatment comfortable?",
        answer:
          "We use local anaesthetic where appropriate and always aim to keep you comfortable. Everyone's experience differs, so please tell us straight away if you feel any discomfort.",
      },
      {
        question: "Can I bring my children?",
        answer:
          "Absolutely. We welcome patients of all ages and take a gentle, friendly approach with children.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);
