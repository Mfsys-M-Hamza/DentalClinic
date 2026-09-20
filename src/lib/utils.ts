export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Keeps only digits — used for wa.me links. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
