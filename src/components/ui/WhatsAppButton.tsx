import { Button, type ButtonVariant } from "./Button";
import { WhatsAppIcon } from "./icons";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";

interface Props {
  /** Prefilled chat message. Defaults to a general enquiry. */
  message?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WhatsAppButton({
  message = generalMessage(),
  label = "Chat on WhatsApp",
  variant = "whatsapp",
  size = "md",
  className,
}: Props) {
  return (
    <Button
      href={whatsappUrl(message)}
      external
      variant={variant}
      size={size}
      className={className}
      aria-label={`${label} (opens in a new tab)`}
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </Button>
  );
}
