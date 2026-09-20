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

/** Prefixes public-folder paths with the site's base path (needed on GitHub Pages sub-path hosting). */
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return path.startsWith("/") && base && !path.startsWith(`${base}/`) ? `${base}${path}` : path;
}
