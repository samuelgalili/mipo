// MipoBadge.jsx — MIPO Design System
import React from "react";

/**
 * MipoBadge — תגית/ניתוב צבעונית
 *
 * @param {string}   label     — טקסט התגית
 * @param {string}   variant   — purple | green | red | yellow | gray | gradient
 * @param {string}   size      — xs | sm | md | lg
 * @param {boolean}  dot       — מציג נקודת צבע
 * @param {node}     icon      — אייקון בצד ימין (start ב-RTL)
 * @param {function} onRemove  — אם מוגדר, מציג כפתור X להסרה
 * @param {boolean}  pill      — גלול מלא (ברירת מחדל)
 * @param {string}   className — קלאסים נוספים
 */
const MipoBadge = ({
  label,
  variant = "purple",
  size = "md",
  dot = false,
  icon = null,
  onRemove = null,
  pill = true,
  className = "",
}) => {
  const variants = {
    purple: {
      wrap: "bg-purple-100 text-purple-700 border border-purple-200",
      dot: "bg-purple-500",
    },
    green: {
      wrap: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    red: {
      wrap: "bg-red-100 text-red-600 border border-red-200",
      dot: "bg-red-500",
    },
    yellow: {
      wrap: "bg-amber-100 text-amber-700 border border-amber-200",
      dot: "bg-amber-500",
    },
    gray: {
      wrap: "bg-gray-100 text-gray-600 border border-gray-200",
      dot: "bg-gray-400",
    },
    blue: {
      wrap: "bg-blue-100 text-blue-700 border border-blue-200",
      dot: "bg-blue-500",
    },
    gradient: {
      wrap: "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 text-white border-0",
      dot: "bg-white",
    },
  };

  const sizes = {
    xs: "px-1.5 py-0.5 text-[10px] gap-1",
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  const dotSizes = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  };

  const v = variants[variant] ?? variants.purple;
  const s = sizes[size] ?? sizes.md;
  const ds = dotSizes[size] ?? dotSizes.md;

  return (
    <span
      dir="rtl"
      className={[
        "inline-flex items-center font-medium",
        pill ? "rounded-full" : "rounded-lg",
        v.wrap,
        s,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* נקודה */}
      {dot && (
        <span
          className={`rounded-full shrink-0 ${v.dot} ${ds}`}
          aria-hidden="true"
        />
      )}

      {/* אייקון */}
      {icon && (
        <span className="shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* טקסט */}
      {label}

      {/* כפתור הסרה */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`הסר ${label}`}
          className={[
            "shrink-0 rounded-full p-0.5 leading-none",
            "transition-colors duration-150",
            variant === "gradient"
              ? "hover:bg-white/20 text-white"
              : "hover:bg-black/10 text-current opacity-60 hover:opacity-100",
          ].join(" ")}
        >
          ✕
        </button>
      )}
    </span>
  );
};

export default MipoBadge;
