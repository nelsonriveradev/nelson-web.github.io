"use client";

import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    root.style.colorScheme = nextIsDark ? "dark" : "light";

    try {
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable in private browsing; the class change still works.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
      className={`inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-mint transition-colors hover:border-sage hover:bg-sage hover:text-charcoal ${className}`}
    >
      <Sun className="size-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
