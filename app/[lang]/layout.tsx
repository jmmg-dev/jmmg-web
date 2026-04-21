import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Juan Manuel Muñoz González | Front End Architect",
  description:
    "Portfolio of Juan Manuel Muñoz González - Front End Architect with 20+ years of experience in software development, specializing in Angular, React, and enterprise architecture.",
  keywords: [
    "Front End Architect",
    "Angular",
    "React",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Software Architecture",
  ],
  authors: [{ name: "Juan Manuel Muñoz González" }],
  creator: "Juan Manuel Muñoz González",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    title: "Juan Manuel Muñoz González | Front End Architect",
    description:
      "Portfolio showcasing 20+ years of Front End development experience",
    siteName: "JM Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Manuel Muñoz González | Front End Architect",
    description:
      "Portfolio showcasing 20+ years of Front End development experience",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1d2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
};

export default RootLayout;
