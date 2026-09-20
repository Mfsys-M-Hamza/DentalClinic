# Dental Clinic Website

A modern, fast, accessible dental-clinic website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion** and **Lucide** icons. Designed to be re-skinned for any clinic by editing one config file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Project structure

```
src/
  clinic-config.ts      ← ALL clinic details: name, contact, WhatsApp, hours, colours, SEO, home copy
  data/                 ← services, team, FAQs, blog posts, gallery, testimonials, marketing copy
  lib/                  ← whatsapp.ts, booking.ts (validation), hours.ts, seo.ts (metadata + JSON-LD)
  app/                  ← routes (home, about, services, services/[slug], team, gallery,
                          book-appointment, testimonials, faq, blog, blog/[slug], contact,
                          privacy-policy, terms-and-conditions, 404), sitemap, robots, OG image
  components/           ← layout/, ui/, cards/, sections/, home/, booking/, gallery/
public/images/          ← placeholder SVGs (replace with real photos)
scripts/generate-placeholders.mjs
```

## Customising for a new clinic

1. **`src/clinic-config.ts`** – replace every `[PLACEHOLDER]` and the marked `TODO` values (phone, WhatsApp, email, address, hours, time zone, social links, colours, `seo.siteUrl`, city/service area/keywords).
   Brand colours (`brand.primary/secondary/accent`) are injected as CSS variables, so the whole palette updates from there.
2. **`src/data/services.ts`** – edit/add/remove services. Each `slug` becomes `/services/<slug>`; the sitemap, footer, booking form and WhatsApp messages update automatically. Featured homepage services are chosen in `clinicConfig.home.featuredServiceSlugs`.
3. **`src/data/team.ts`, `faqs.ts`, `blog.ts`, `gallery.ts`, `testimonials.ts`, `content.ts`** – replace sample content. Have a qualified dentist review all clinical wording.
4. **Statistics** – values in `home.stats` that contain `[` show as static text. Enter real, verifiable numbers such as `"1200+"` or `"4.9/5"` and they animate as counters. Don't publish unverifiable figures.
5. **Testimonials** – the entries are marked *Sample* placeholders. Replace with genuine, consented reviews and set `isSample: false`.
6. **Legal pages** – templates in `app/privacy-policy` and `app/terms-and-conditions` are *not legal advice*; have them reviewed.

## WhatsApp configuration

- Set `contact.whatsapp` (country code + number; `+`, spaces and dashes are stripped automatically, e.g. `"447700900123"`).
- The booking form validates, shows a summary, then opens `https://wa.me/<number>?text=<URL-encoded message>` using the required message format. **Nothing is stored on a server** – the request is only sent when the patient presses Send in WhatsApp, and the UI states the appointment is *requested, not confirmed*.
- The floating WhatsApp button (desktop) and sticky action bar (mobile) prefill a message that adapts to the current service page (`serviceMessage()` in `lib/whatsapp.ts`).
- To add real submission later (email, database, CRM), add a Route Handler or Server Action and call it from `AppointmentForm.tsx`.

## Replacing images

Swap files in `public/images/` (same names) or change the paths in `clinic-config.ts` / `src/data/*`. Recommended sizes: hero 1000×1250, team 800×1000, gallery before/after 1200×900 (same framing), blog 1200×800. Use descriptive alt text. **Only publish before/after photos with written patient consent, unaltered.** Regenerate the SVG placeholders with `node scripts/generate-placeholders.mjs`.

## Accessibility & motion

Skip link, landmarks, visible focus, labelled form fields with error summaries, ARIA accordions, native `<dialog>` lightbox (focus trap, Esc, arrow keys), keyboard-operable comparison slider. `prefers-reduced-motion` and low-powered devices (≤2 CPU cores / ≤2 GB memory) fall back to opacity-only transitions (`components/ui/MotionProvider.tsx`).

## SEO

Per-page metadata and canonical URLs (`lib/seo.ts`), Open Graph image generated from the config, `sitemap.xml`, `robots.txt`, JSON-LD for Dentist/LocalBusiness, breadcrumbs, FAQ, blog articles and services. No fake ratings or reviews are marked up.

## Deployment

Deploy to Vercel (import the repo, no config needed) or any Node host with `npm run build && npm start`. Before launch: set `seo.siteUrl` to the real domain, replace all placeholders and samples, verify the WhatsApp number, optionally add a Google Maps embed URL, and submit `/sitemap.xml` to Google Search Console.

## Not included

Multi-language routing (the `languages` field is informational), a booking database, and analytics.
