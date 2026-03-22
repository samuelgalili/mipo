// tokens.js — MIPO Design System
// טוקני עיצוב — מבוסס על design system של PETID
// Primary palette: Light Blue (תכלת) #0099E6

export const colors = {
  // Primary — תכלת / Light Blue
  primary: {
    gradient: "bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600",
    gradientHover: "hover:from-sky-500 hover:via-sky-600 hover:to-blue-700",
    ring: "ring-sky-200",
    border: "border-sky-200",
    borderLight: "border-sky-100",
    shadow: "shadow-sky-100/40",
    shadowMd: "shadow-sky-500/30",
    shadowHover: "hover:shadow-sky-500/50",
    text: "text-sky-600",
    textLight: "text-sky-400",
    bg: "bg-sky-50",
    bgMd: "bg-sky-100",
  },

  // Danger — Rose/Red
  danger: {
    gradient: "bg-gradient-to-r from-rose-500 to-red-500",
    gradientHover: "hover:from-rose-600 hover:to-red-600",
    ring: "ring-rose-300",
    border: "border-rose-400",
    text: "text-rose-600",
    bg: "bg-rose-50",
    bgMd: "bg-rose-100",
    shadow: "shadow-rose-500/30",
  },

  // Success — Emerald Green
  success: {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },

  // Warning — Amber
  warning: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  // Neutral — Slate (cool undertone, matches petid gray palette)
  neutral: {
    text: "text-slate-600",
    bg: "bg-slate-100",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },

  // Gold — Premium / Loyalty (#FFB800)
  gold: {
    gradient: "bg-gradient-to-r from-amber-400 to-yellow-500",
    text: "text-amber-600",
    bg: "bg-amber-50",
    bgMd: "bg-amber-100",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },

  // Coral — Love / Warmth (#E8725A)
  coral: {
    gradient: "bg-gradient-to-r from-orange-400 to-red-400",
    text: "text-orange-600",
    bg: "bg-orange-50",
    bgMd: "bg-orange-100",
    border: "border-orange-200",
    dot: "bg-orange-400",
  },

  // Pink — Accents / Heart (#FF4081 area, hsl 330 85% 55%)
  pink: {
    gradient: "bg-gradient-to-r from-pink-400 to-fuchsia-500",
    text: "text-pink-600",
    bg: "bg-pink-50",
    bgMd: "bg-pink-100",
    border: "border-pink-200",
    dot: "bg-pink-500",
  },

  // Story / Instagram gradient — Pink → Violet → Sky
  story: {
    gradient: "bg-gradient-to-br from-pink-500 via-violet-500 to-sky-500",
  },
};

// Border radius — organic, rounded feel (petid style)
export const radius = {
  sm: "rounded-lg",     // ~0.5rem  (petid sm)
  md: "rounded-xl",     // ~0.875rem (petid lg / --radius)
  lg: "rounded-2xl",    // ~1.375rem (petid xl / --radius-lg)
  xl: "rounded-3xl",    // ~1.75rem  (petid 2xl / --radius-xl)
  full: "rounded-full",
};

// Box shadows — blue-tinted (petid style)
export const shadow = {
  xs: "shadow-[0_1px_3px_rgba(0,120,200,0.08)]",
  sm: "shadow-[0_2px_4px_rgba(0,120,200,0.08)]",
  md: "shadow-[0_4px_8px_rgba(0,120,200,0.10)]",
  lg: "shadow-[0_8px_16px_rgba(0,120,200,0.12)]",
  xl: "shadow-[0_12px_24px_rgba(0,120,200,0.15)]",
  card: "shadow-[0_2px_8px_rgba(0,120,200,0.08)]",
  elevated: "shadow-[0_8px_24px_rgba(0,120,200,0.15)]",
  button: "shadow-[0_2px_4px_rgba(0,120,200,0.20)]",
  buttonHover: "hover:shadow-[0_4px_12px_rgba(0,120,200,0.25)]",
};

// Gradients (standalone, for backgroundImage usage)
export const gradient = {
  primary: "bg-gradient-to-br from-sky-400 to-blue-600",
  petid: "bg-gradient-to-br from-sky-400 to-sky-600",
  warm: "bg-gradient-to-br from-sky-400 to-blue-500",
  story: "bg-gradient-to-br from-pink-500 via-violet-500 to-sky-500",
};

// Transitions
export const transition = "transition-all duration-300 ease-in-out";
export const transitionFast = "transition-all duration-150 ease-in-out";

// Focus ring — primary תכלת
export const focus =
  "focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2";
