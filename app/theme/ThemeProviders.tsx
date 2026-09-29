"use client";

import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { Theme } from "@/models/enums";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
  initialTheme: Theme;
};

export function ThemeProviders({ children, initialTheme }: ProvidersProps) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
