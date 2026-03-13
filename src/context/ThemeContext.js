import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const lightColors = {
  backgroundApp: "#F8FAFC",
  backgroundSafe: "#E2E8F0",
  headerBackground: "#F8FAFC",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  accent: "#38BDF8",
  accentSoft: "#F1F5F9",
  danger: "#F97316",
  cardBackground: "#FFFFFF",
  inputBackground: "#FFFFFF",
  inputBorder: "#E2E8F0",
};

const darkColors = {
  backgroundApp: "#020617",
  backgroundSafe: "#020617",
  headerBackground: "#0F172A",
  textPrimary: "#E2E8F0",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  accent: "#38BDF8",
  accentSoft: "#1E293B",
  danger: "#FB923C",
  cardBackground: "#020617",
  inputBackground: "#0B1120",
  inputBorder: "#1E293B",
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  const value = useMemo(
    () => ({
      isDark,
      colors,
      toggleTheme,
    }),
    [isDark, colors, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus digunakan di dalam ThemeProvider");
  }
  return ctx;
};

