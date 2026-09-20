import {
  Anchor,
  Baby,
  Camera,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  Crown,
  Droplets,
  Gem,
  Heart,
  HeartPulse,
  Layers,
  MessageCircle,
  Microscope,
  Ruler,
  ScanLine,
  Scissors,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/types";
import type { ContentIcon } from "@/data/content";

export const serviceIcons: Record<IconName, LucideIcon> = {
  stethoscope: Stethoscope,
  "clipboard-check": ClipboardCheck,
  sparkles: Sparkles,
  sun: Sun,
  anchor: Anchor,
  "heart-pulse": HeartPulse,
  ruler: Ruler,
  smile: Smile,
  scissors: Scissors,
  crown: Crown,
  layers: Layers,
  droplets: Droplets,
  baby: Baby,
  gem: Gem,
  siren: Siren,
};

export const contentIcons: Record<ContentIcon, LucideIcon> = {
  message: MessageCircle,
  clipboard: ClipboardList,
  heart: Heart,
  shield: ShieldCheck,
  users: Users,
  wallet: Wallet,
  calendar: CalendarCheck,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  scan: ScanLine,
  camera: Camera,
  microscope: Microscope,
};

type SvgProps = React.SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 4.53 0 8.23 3.69 8.23 8.23 0 4.54-3.7 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function FacebookIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.28 4.4c-2.3 0-3.87 1.4-3.87 3.98v2.12H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function InstagramIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Brand mark — a simple tooth glyph. */
export function ToothMark(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 5c-1.6-1.2-4-1.3-5.4.2C5 7 5.5 9.5 6.3 12c.6 1.9.7 3.7 1.1 5.4.3 1.3 1.4 1.7 2 .6.7-1.2.8-2.6 1.4-3.4.5-.6 1.3-.6 1.8 0 .6.8.7 2.2 1.4 3.4.6 1.1 1.7.7 2-.6.4-1.7.5-3.5 1.1-5.4.8-2.5 1.3-5-.3-6.8C16 3.7 13.6 3.8 12 5z" />
    </svg>
  );
}
