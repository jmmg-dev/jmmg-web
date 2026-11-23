import { getInformationAction } from "@/actions/information";
import { Lang } from "@/models/enums";
import { ImageResponse } from "next/og";

/**
 * Social card (Open Graph and Twitter) for each language, 1200×630, in the site's dark theme:
 * the JMMG.dev brand, name, role and tagline. The home page and the CV share it.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dark theme tokens (styles/globals.css), converted from OKLCH
const BG = "#02060d";
const FG = "#eaeff5";
const MUTED = "#86909b";
const NEON = "#00cbc3";

/**
 * One image per language, with its alt text in that language. While collecting routes at build
 * time Next calls this without a language, so it falls back to the default one (only the id is
 * used then); on each request it receives the route's language.
 */
export async function generateImageMetadata({
  params,
}: {
  params: { lang?: Lang } | Promise<{ lang?: Lang }>;
}) {
  const { lang } = (await params) ?? {};
  const { seo } = await getInformationAction(
    lang && Object.values(Lang).includes(lang) ? lang : Lang.en,
  );
  return [{ id: "card", alt: seo.imageAlt, size, contentType }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const { personalInfo, info, hero } = await getInformationAction(lang);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: `radial-gradient(circle at 85% 15%, rgba(0, 203, 195, 0.22), transparent 55%), ${BG}`,
        color: FG,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          fontSize: 132,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        <span style={{ color: NEON }}>JM</span>
        <span style={{ color: MUTED }}>MG</span>
        <span style={{ color: NEON, fontSize: 64, letterSpacing: 0 }}>
          .dev
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 30,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: NEON,
        }}
      >
        {hero.subtitle}
      </div>
      <div
        style={{
          display: "flex",
          width: 140,
          height: 3,
          marginTop: 56,
          background: NEON,
        }}
      />
      <div style={{ display: "flex", marginTop: 40, fontSize: 48 }}>
        {personalInfo.name}
      </div>
      <div
        style={{ display: "flex", marginTop: 10, fontSize: 34, color: MUTED }}
      >
        {info.hero.frontEndArchitect}
      </div>
      <div
        style={{
          position: "absolute",
          right: 96,
          bottom: 64,
          display: "flex",
          fontSize: 28,
          color: MUTED,
        }}
      >
        jmmg.dev
      </div>
    </div>,
    size,
  );
}
