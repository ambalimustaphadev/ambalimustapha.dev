"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/hooks";

const THEME_ORDER = ["light", "dark", "system"] as const;

const ICONS = {
  light: Sun,
  dark: Moon,
  system: SunMoon,
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const current = (theme as (typeof THEME_ORDER)[number]) ?? "system";
  const Icon = ICONS[current];

  function cycleTheme() {
    const nextIndex = (THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-secondary transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={mounted ? `Theme: ${current}. Click to change.` : "Change theme"}
    >
      {mounted ? <Icon size={16} strokeWidth={1.75} /> : <span className="h-4 w-4" />}
    </button>
  );
}
