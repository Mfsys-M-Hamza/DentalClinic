import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "whatsapp" | "light" | "ghost" | "outlineLight";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white shadow-soft hover:bg-brand-600 hover:shadow-lift",
  secondary: "bg-white text-brand-700 ring-1 ring-brand/25 hover:bg-brand-50 hover:ring-brand/50",
  whatsapp: "bg-wa text-white shadow-soft hover:bg-wa-dark hover:shadow-lift",
  light: "bg-white text-brand-800 shadow-soft hover:bg-brand-50 hover:shadow-lift",
  ghost: "text-brand-700 hover:bg-brand-50",
  outlineLight: "text-white ring-1 ring-white/50 hover:bg-white/10 hover:ring-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type NativeProps = CommonProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: LinkProps | NativeProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, external, ...rest } = props;
    const classes = buttonClasses(variant, size, className);
    if (external || /^(https?:|tel:|mailto:)/.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
