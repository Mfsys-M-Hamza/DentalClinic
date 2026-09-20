export type IconName =
  | "stethoscope"
  | "clipboard-check"
  | "sparkles"
  | "sun"
  | "anchor"
  | "heart-pulse"
  | "ruler"
  | "smile"
  | "scissors"
  | "crown"
  | "layers"
  | "droplets"
  | "baby"
  | "gem"
  | "siren";

export type ServiceCategory =
  | "Preventive"
  | "Restorative"
  | "Cosmetic"
  | "Orthodontics"
  | "Surgical"
  | "Emergency"
  | "Children";

export interface Faq {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  category: ServiceCategory;
  duration: string;
  overview: string;
  whoNeeds: string[];
  benefits: string[];
  process: ProcessStep[];
  preparation: string[];
  aftercare: string[];
  faqs: Faq[];
}
