import {
  Geist,
  Instrument_Sans,
  Inter_Tight,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

// Each project's typefaces, so its catalog section looks like its website.
// `preload: false`: they are only downloaded on the page that uses them.
const geist = Geist({ subsets: ["latin"], variable: "--font-p-geist", preload: false });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-p-jetbrains", preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-p-space-grotesk", preload: false });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-p-instrument", preload: false });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-p-inter-tight", preload: false });

export const projectFontVariables = [geist, jetbrains, spaceGrotesk, instrumentSans, interTight]
  .map((font) => font.variable)
  .join(" ");
