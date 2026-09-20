// Generates lightweight SVG placeholder images into /public/images.
// Replace any file with a real photo (same name, or update the path in the config/data files).
// Run: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(out, { recursive: true });

const TOOTH =
  "M12 5c-1.6-1.2-4-1.3-5.4.2C5 7 5.5 9.5 6.3 12c.6 1.9.7 3.7 1.1 5.4.3 1.3 1.4 1.7 2 .6.7-1.2.8-2.6 1.4-3.4.5-.6 1.3-.6 1.8 0 .6.8.7 2.2 1.4 3.4.6 1.1 1.7.7 2-.6.4-1.7.5-3.5 1.1-5.4.8-2.5 1.3-5-.3-6.8C16 3.7 13.6 3.8 12 5z";

const palettes = {
  teal: ["#0f5f59", "#2aa198", "#a7e3d8"],
  sand: ["#e9dcc8", "#f6efe4", "#ffffff"],
  sage: ["#4f7a6b", "#9cc3b0", "#e6f2ec"],
  warm: ["#c98a4b", "#f0c891", "#fff4e2"],
  deep: ["#0b3f3b", "#146b63", "#5fc4b5"],
};

const tooth = (cx, cy, s, fill, stroke = "none", op = 1) =>
  `<g transform="translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})" opacity="${op}"><path d="${TOOTH}" fill="${fill}" stroke="${stroke}" stroke-width="0.4"/></g>`;

function scene({ w, h, palette, label, hero = false, glyph = true, blobs = true }) {
  const [a, b, c] = palettes[palette];
  const s = Math.min(w, h) / 24 * 0.34;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label ?? "Placeholder image"}">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<radialGradient id="r" cx="0.3" cy="0.25" r="0.8"><stop offset="0" stop-color="${c}" stop-opacity="0.55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="${h * 0.02}" stdDeviation="${h * 0.02}" flood-color="#000" flood-opacity="0.22"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect width="${w}" height="${h}" fill="url(#r)"/>
${blobs ? `<circle cx="${w * 0.85}" cy="${h * 0.15}" r="${h * 0.28}" fill="${c}" opacity="0.18"/><circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.32}" fill="${c}" opacity="0.14"/><circle cx="${w * 0.75}" cy="${h * 0.85}" r="${h * 0.12}" fill="#fff" opacity="0.12"/>` : ""}
${hero ? `<path d="M0 ${h * 0.72} C ${w * 0.3} ${h * 0.6}, ${w * 0.6} ${h * 0.85}, ${w} ${h * 0.68} L ${w} ${h} L 0 ${h} Z" fill="#000" opacity="0.10"/>` : ""}
${glyph ? `<g filter="url(#sh)">${tooth(w / 2, h / 2, s, "#fff")}</g>` : ""}
${label ? `<text x="${w / 2}" y="${h - h * 0.06}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(14, h * 0.028)}" fill="#fff" opacity="0.75" letter-spacing="1.5">${label.toUpperCase()}</text>` : ""}
</svg>`;
}

function person({ w, h, palette }) {
  const [a, b, c] = palettes[palette];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder portrait">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<circle cx="${w * 0.8}" cy="${h * 0.2}" r="${h * 0.25}" fill="${c}" opacity="0.2"/>
<ellipse cx="${w / 2}" cy="${h * 1.02}" rx="${w * 0.42}" ry="${h * 0.34}" fill="#fff" opacity="0.92"/>
<circle cx="${w / 2}" cy="${h * 0.42}" r="${w * 0.17}" fill="#fff" opacity="0.92"/>
<text x="${w / 2}" y="${h - h * 0.04}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${h * 0.026}" fill="${a}" opacity="0.8" letter-spacing="1.5">PHOTO PLACEHOLDER</text>
</svg>`;
}

function teethRow({ w, h, before, label }) {
  const fill = before ? "#e6d49a" : "#ffffff";
  const gum = before ? "#c9707a" : "#e88f99";
  const bg = before ? ["#5b4a4a", "#8a6b6b"] : ["#7b4b52", "#b8737d"];
  const n = 6;
  let teeth = "";
  for (let i = 0; i < n; i++) {
    const cx = w * (0.16 + (i * 0.68) / (n - 1));
    const skew = before ? (i % 2 ? 6 : -4) : 0;
    const dy = before ? (i % 3) * 8 : 0;
    teeth += tooth(cx, h * 0.5 + dy, (w / 24) * 0.115, fill, before ? "#b9a462" : "#dfe6e6", 1).replace(
      "<g transform=",
      `<g data-t="${skew}" transform=`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<path d="M0 ${h * 0.3} Q ${w / 2} ${h * 0.18} ${w} ${h * 0.3} L ${w} ${h * 0.4} Q ${w / 2} ${h * 0.3} 0 ${h * 0.4} Z" fill="${gum}" opacity="0.9"/>
${teeth}
<text x="${w / 2}" y="${h * 0.93}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${h * 0.03}" fill="#fff" opacity="0.8" letter-spacing="2">SAMPLE · ${before ? "BEFORE" : "AFTER"}</text>
</svg>`;
}

const write = (name, svg) => {
  const file = join(out, name);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg);
};

write("hero.svg", scene({ w: 1000, h: 1250, palette: "deep", hero: true }));
write("about-1.svg", scene({ w: 900, h: 1100, palette: "sage", label: "Clinic photo" }));
write("about-2.svg", scene({ w: 1200, h: 900, palette: "teal", label: "Clinic photo" }));
["sand", "sage", "warm"].forEach((p, i) => write(`facility-${i + 1}.svg`, scene({ w: 1200, h: 900, palette: p, label: "Facility photo" })));
["teal", "sage", "warm"].forEach((p, i) => write(`team-${i + 1}.svg`, person({ w: 800, h: 1000, palette: p })));
["teal", "sage", "warm", "deep"].forEach((p, i) => write(`blog-${i + 1}.svg`, scene({ w: 1200, h: 800, palette: p, label: "Article image" })));
for (let i = 1; i <= 6; i++) {
  write(`gallery-${i}-before.svg`, teethRow({ w: 1200, h: 900, before: true, label: "Sample placeholder image before treatment" }));
  write(`gallery-${i}-after.svg`, teethRow({ w: 1200, h: 900, before: false, label: "Sample placeholder image after treatment" }));
}
console.log("Placeholders written to", out);
