// tailwind.config.ts — MIPO Design System
// מבוסס על design system של PETID — Light Blue (תכלת) palette
//
// ⚠️  MIPO משתמש ב-Tailwind v4 (@tailwindcss/vite).
//     כדי שהגדרות אלו ייטענו, הוסף לשורה הראשונה של src/index.css:
//       @config "../tailwind.config.ts";
//     מעל השורה @import "tailwindcss";

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      // ─── Typography ────────────────────────────────────────────────
      fontFamily: {
        sans: ["Assistant", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        assistant: ["Assistant", "Inter", "-apple-system", "sans-serif"],
        fredoka: ["Fredoka", "Assistant", "sans-serif"],
        mono: ["SF Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      fontSize: {
        xs:   ["0.8125rem", { lineHeight: "1.4",  letterSpacing: "0" }],
        sm:   ["0.9375rem", { lineHeight: "1.5",  letterSpacing: "0" }],
        base: ["1rem",      { lineHeight: "1.6",  letterSpacing: "0" }],
        lg:   ["1.125rem",  { lineHeight: "1.55", letterSpacing: "0" }],
        xl:   ["1.3125rem", { lineHeight: "1.5",  letterSpacing: "-0.005em" }],
        "2xl":["1.625rem",  { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "3xl":["2rem",      { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        "4xl":["2.5rem",    { lineHeight: "1.2",  letterSpacing: "-0.02em" }],
        "5xl":["3.25rem",   { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
      },

      // ─── Colors ────────────────────────────────────────────────────
      colors: {
        // Primary — Light Blue / תכלת (#0099E6, hsl 204 100% 48%)
        primary: {
          DEFAULT:    "hsl(204 100% 48%)",
          foreground: "hsl(0 0% 100%)",
          hover:      "hsl(204 100% 42%)",
          light:      "hsl(204 100% 58%)",
          dark:       "hsl(204 100% 38%)",
          pressed:    "hsl(204 100% 35%)",
          50:         "hsl(204 100% 97%)",
          100:        "hsl(204 100% 93%)",
          200:        "hsl(204 100% 85%)",
          300:        "hsl(204 100% 75%)",
          400:        "hsl(204 100% 63%)",
          500:        "hsl(204 100% 48%)",
          600:        "hsl(204 100% 42%)",
          700:        "hsl(204 100% 35%)",
        },

        // Accent — Deep Blue (hsl 210 85% 45%)
        accent: {
          DEFAULT:    "hsl(210 85% 45%)",
          foreground: "hsl(0 0% 100%)",
          hover:      "hsl(210 85% 40%)",
          light:      "hsl(210 85% 55%)",
        },

        // Gold — Loyalty / Premium (#FFB800, hsl 42 100% 50%)
        gold: {
          DEFAULT:    "hsl(42 100% 50%)",
          foreground: "hsl(0 0% 10%)",
          light:      "hsl(42 100% 60%)",
          50:         "hsl(42 100% 97%)",
          100:        "hsl(42 100% 90%)",
          400:        "hsl(42 100% 60%)",
          500:        "hsl(42 100% 50%)",
          600:        "hsl(42 100% 42%)",
        },

        // Coral — Love / Warmth (#E8725A, hsl 12 76% 61%)
        coral: {
          DEFAULT:    "hsl(12 76% 61%)",
          foreground: "hsl(0 0% 100%)",
          light:      "hsl(12 76% 70%)",
          50:         "hsl(12 76% 97%)",
          100:        "hsl(12 76% 90%)",
          400:        "hsl(12 76% 70%)",
          500:        "hsl(12 76% 61%)",
          600:        "hsl(12 76% 52%)",
        },

        // Pink — Accents / Heart (hsl 330 85% 55%)
        petidPink: {
          DEFAULT:    "hsl(330 85% 55%)",
          foreground: "hsl(0 0% 100%)",
          light:      "hsl(330 85% 65%)",
          50:         "hsl(330 85% 97%)",
          100:        "hsl(330 85% 90%)",
          500:        "hsl(330 85% 55%)",
          600:        "hsl(330 85% 47%)",
        },

        // Purple — Gradients (hsl 260 75% 55%)
        petidPurple: {
          DEFAULT:    "hsl(260 75% 55%)",
          foreground: "hsl(0 0% 100%)",
          light:      "hsl(260 75% 65%)",
          500:        "hsl(260 75% 55%)",
        },

        // Semantic
        success: {
          DEFAULT:    "hsl(152 60% 45%)",
          foreground: "hsl(0 0% 100%)",
          light:      "hsl(152 60% 55%)",
          dark:       "hsl(152 60% 35%)",
          50:         "hsl(152 60% 97%)",
          100:        "hsl(152 60% 90%)",
        },
        warning: {
          DEFAULT:    "hsl(38 92% 55%)",
          foreground: "hsl(0 0% 10%)",
          light:      "hsl(38 92% 65%)",
          50:         "hsl(38 92% 97%)",
          100:        "hsl(38 92% 90%)",
        },
        danger: {
          DEFAULT:    "hsl(350 80% 55%)",
          foreground: "hsl(0 0% 100%)",
          light:      "hsl(350 80% 65%)",
          50:         "hsl(350 80% 97%)",
          100:        "hsl(350 80% 90%)",
        },

        // Surfaces & Neutrals — cool undertone (petid style)
        background: "hsl(210 20% 99%)",
        foreground:  "hsl(210 10% 10%)",
        surface: {
          DEFAULT:  "hsl(210 20% 99%)",
          elevated: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT:    "hsl(210 15% 96%)",
          foreground: "hsl(210 10% 38%)",
        },
        border: "hsl(210 10% 88%)",
        input:  "hsl(210 15% 97%)",
        ring:   "hsl(204 100% 48%)",
        card: {
          DEFAULT:    "hsl(0 0% 100%)",
          foreground: "hsl(210 10% 10%)",
          border:     "hsl(210 10% 88%)",
        },
        popover: {
          DEFAULT:    "hsl(0 0% 100%)",
          foreground: "hsl(210 10% 10%)",
        },
      },

      // ─── Border Radius ─────────────────────────────────────────────
      // Organic, rounded feel (petid style)
      borderRadius: {
        sm:      "0.5rem",     // ~calc(--radius - 6px)
        md:      "0.625rem",   // ~calc(--radius - 4px)
        lg:      "0.875rem",   // --radius
        xl:      "1.375rem",   // --radius-lg
        "2xl":   "1.75rem",    // --radius-xl
        "3xl":   "2rem",
        "4xl":   "2.5rem",
        organic: "1.375rem",
      },

      // ─── Shadows — blue-tinted ─────────────────────────────────────
      boxShadow: {
        "2xs":          "0 1px 2px rgba(0, 120, 200, 0.05)",
        xs:             "0 1px 3px rgba(0, 120, 200, 0.08)",
        sm:             "0 2px 4px rgba(0, 120, 200, 0.08)",
        DEFAULT:        "0 4px 8px rgba(0, 120, 200, 0.10)",
        md:             "0 4px 8px rgba(0, 120, 200, 0.10)",
        lg:             "0 8px 16px rgba(0, 120, 200, 0.12)",
        xl:             "0 12px 24px rgba(0, 120, 200, 0.15)",
        "2xl":          "0 20px 40px rgba(0, 120, 200, 0.20)",
        card:           "0 2px 8px rgba(0, 120, 200, 0.08)",
        elevated:       "0 8px 24px rgba(0, 120, 200, 0.15)",
        button:         "0 2px 4px rgba(0, 120, 200, 0.20)",
        "button-hover": "0 4px 12px rgba(0, 120, 200, 0.25)",
      },

      // ─── Gradients ─────────────────────────────────────────────────
      backgroundImage: {
        "gradient-primary":  "linear-gradient(135deg, hsl(204 100% 48%) 0%, hsl(210 85% 45%) 100%)",
        "gradient-petid":    "linear-gradient(135deg, hsl(204 100% 48%) 0%, hsl(200 95% 55%) 100%)",
        "gradient-warm":     "linear-gradient(135deg, hsl(204 100% 52%) 0%, hsl(210 80% 50%) 100%)",
        "gradient-story":    "linear-gradient(135deg, hsl(330 85% 55%) 0%, hsl(280 75% 55%) 50%, hsl(204 100% 48%) 100%)",
        "gradient-subtle":   "linear-gradient(135deg, hsl(204 30% 97%) 0%, hsl(210 30% 98%) 100%)",
        "gradient-card":     "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(204 10% 99%) 100%)",
      },

      // ─── Spacing extras ───────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
