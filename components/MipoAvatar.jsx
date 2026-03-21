// MipoAvatar.jsx — MIPO Design System
import React from "react";

/**
 * MipoAvatar — אווטאר משתמש / חיית מחמד
 *
 * @param {string}   src       — URL לתמונה (אופציונלי)
 * @param {string}   name      — שם (לראשי תיבות + alt)
 * @param {string}   size      — xs | sm | md | lg | xl | 2xl
 * @param {boolean}  online    — מציג נקודת "מחובר"
 * @param {boolean}  pet       — עיצוב חיית מחמד (גבול fuchsia + 🐾)
 * @param {string}   badge     — אמוג'י/תוכן על-גבי הפינה (למשל "👑")
 * @param {string}   className — קלאסים נוספים לעטיפה
 */
const MipoAvatar = ({
  src = null,
  name = "?",
  size = "md",
  online = false,
  pet = false,
  badge = null,
  className = "",
}) => {
  const sizes = {
    xs:  { wrap: "w-6 h-6",   text: "text-[10px]", dot: "w-1.5 h-1.5 border",    badge: "text-[8px] -top-0.5 -end-0.5" },
    sm:  { wrap: "w-8 h-8",   text: "text-xs",     dot: "w-2 h-2 border",        badge: "text-[9px] -top-1 -end-1" },
    md:  { wrap: "w-10 h-10", text: "text-sm",     dot: "w-2.5 h-2.5 border-2",  badge: "text-xs -top-1 -end-1" },
    lg:  { wrap: "w-14 h-14", text: "text-base",   dot: "w-3 h-3 border-2",      badge: "text-sm -top-1.5 -end-1.5" },
    xl:  { wrap: "w-20 h-20", text: "text-xl",     dot: "w-3.5 h-3.5 border-2",  badge: "text-base -top-2 -end-2" },
    "2xl": { wrap: "w-28 h-28", text: "text-2xl",  dot: "w-4 h-4 border-2",      badge: "text-lg -top-2 -end-2" },
  };

  const s = sizes[size] ?? sizes.md;

  // ראשי תיבות — מנסה לקחת 2 אותיות ראשונות מהשם
  const initials = name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* עיגול האווטאר */}
      <div
        className={[
          "rounded-full flex items-center justify-center font-bold overflow-hidden",
          s.wrap,
          s.text,
          pet
            ? "ring-2 ring-fuchsia-400 ring-offset-2"
            : "ring-2 ring-purple-200 ring-offset-1",
        ].join(" ")}
        role="img"
        aria-label={name}
        title={name}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
            {pet ? "🐾" : initials}
          </div>
        )}
      </div>

      {/* נקודת "מחובר" — בפינה שמאל-תחתון (end ב-RTL) */}
      {online && (
        <span
          className={[
            "absolute bottom-0 end-0",
            "bg-emerald-400 border-white rounded-full",
            s.dot,
          ].join(" ")}
          aria-label="מחובר"
          role="status"
        />
      )}

      {/* Badge — פינה ימין-עליון (start ב-RTL) */}
      {badge && (
        <span
          className={[
            "absolute start-0 top-0",
            "leading-none",
            s.badge,
          ].join(" ")}
          aria-hidden="true"
        >
          {badge}
        </span>
      )}
    </div>
  );
};

/**
 * MipoAvatarGroup — קבוצת אווטארים חופפים
 *
 * @param {Array}  avatars — מערך של props ל-MipoAvatar
 * @param {number} max     — מקסימום אווטארים לפני "+N"
 * @param {string} size    — גודל אחיד לכולם
 */
export const MipoAvatarGroup = ({ avatars = [], max = 4, size = "md" }) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  const textSizes = {
    xs: "text-[9px]", sm: "text-[10px]", md: "text-xs",
    lg: "text-sm", xl: "text-base", "2xl": "text-lg",
  };

  const wrapSizes = {
    xs: "w-6 h-6", sm: "w-8 h-8", md: "w-10 h-10",
    lg: "w-14 h-14", xl: "w-20 h-20", "2xl": "w-28 h-28",
  };

  return (
    <div dir="rtl" className="flex flex-row-reverse -space-x-3 space-x-reverse">
      {overflow > 0 && (
        <div
          className={[
            "rounded-full flex items-center justify-center font-bold",
            "bg-purple-100 text-purple-600 border-2 border-white ring-1 ring-purple-200",
            wrapSizes[size] ?? wrapSizes.md,
            textSizes[size] ?? textSizes.md,
          ].join(" ")}
          aria-label={`ועוד ${overflow} נוספים`}
        >
          +{overflow}
        </div>
      )}
      {[...visible].reverse().map((avatar, i) => (
        <div key={i} className="border-2 border-white rounded-full">
          <MipoAvatar {...avatar} size={size} />
        </div>
      ))}
    </div>
  );
};

export default MipoAvatar;
