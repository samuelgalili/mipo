// tokens.js — MIPO Design System
// טוקני עיצוב משותפים לכל הקומפוננטים

export const colors = {
  primary: {
    gradient: "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500",
    gradientHover: "hover:from-purple-600 hover:via-violet-600 hover:to-fuchsia-600",
    ring: "ring-purple-200",
    border: "border-purple-200",
    borderLight: "border-purple-100",
    shadow: "shadow-purple-100/40",
    shadowMd: "shadow-purple-500/30",
    shadowHover: "hover:shadow-purple-500/50",
    text: "text-purple-600",
    textLight: "text-purple-400",
    bg: "bg-purple-50",
    bgMd: "bg-purple-100",
  },
  danger: {
    gradient: "bg-gradient-to-r from-red-500 to-rose-500",
    gradientHover: "hover:from-red-600 hover:to-rose-600",
    ring: "ring-red-300",
    border: "border-red-400",
    text: "text-red-600",
    bg: "bg-red-50",
    bgMd: "bg-red-100",
    shadow: "shadow-red-500/30",
  },
  success: {
    text: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  warning: {
    text: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  neutral: {
    text: "text-gray-600",
    bg: "bg-gray-100",
    border: "border-gray-200",
    dot: "bg-gray-400",
  },
};

export const radius = {
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-3xl",
  full: "rounded-full",
};

export const transition = "transition-all duration-300 ease-in-out";
export const transitionFast = "transition-all duration-150 ease-in-out";

export const focus =
  "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2";
