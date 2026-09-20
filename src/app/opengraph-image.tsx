import { ImageResponse } from "next/og";
import { clinicConfig } from "@/clinic-config";

export const alt = `${clinicConfig.name} — ${clinicConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Social-sharing card generated from the clinic config — no design work needed per clinic. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#fff",
          background: `linear-gradient(135deg, ${clinicConfig.brand.primary}, #0b2f2c)`,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", opacity: 0.8 }}>Dental care</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>{clinicConfig.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.9 }}>{clinicConfig.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 48, opacity: 0.8 }}>{clinicConfig.seo.primaryCity}</div>
      </div>
    ),
    size,
  );
}
