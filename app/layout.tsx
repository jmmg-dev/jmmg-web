import { ThemeProviders } from "@/app/theme/ThemeProviders";
import { Lang, Theme } from "@/models/enums";
import { Analytics } from "@vercel/analytics/next";
import { Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1d2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value as Theme) || Theme.dark;
  const lang = cookieStore.get("lang")?.value as Lang;
  return (
    <html lang={lang} className={theme} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProviders initialTheme={theme}>{children}</ThemeProviders>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
