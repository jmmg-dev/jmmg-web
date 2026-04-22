"use client";

import { Theme } from "@/models/enums";
import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    //Create a cookie to store the theme
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `theme=${newTheme}; max-age=${maxAge}; path=/; SameSite=Lax`;

    // Apply the theme to the DOM immediately
    document.documentElement.className = newTheme;
    document.documentElement.style.colorScheme = newTheme;
  };

  const toggleTheme = () => {
    setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
