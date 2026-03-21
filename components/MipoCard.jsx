// MipoCard.jsx — MIPO Design System
import React from "react";

/**
 * MipoCard — כרטיס תוכן RTL-first
 *
 * @param {node}     children    — תוכן הכרטיס
 * @param {string}   title       — כותרת ראשית
 * @param {string}   subtitle    — כותרת משנה
 * @param {node}     footer      — תוכן footer (מופרד בקו)
 * @param {node}     headerRight — אלמנט בצד שמאל של הכותרת (end ב-RTL — כפתורים, תגיות)
 * @param {string}   image       — URL לתמונת header
 * @param {string}   imageAlt    — alt לתמונה
 * @param {boolean}  hover       — אנימציית hover
 * @param {function} onClick     — הופך את הכרטיס ללחיץ
 * @param {string}   variant     — default | elevated | flat | gradient
 * @param {string}   padding     — none | sm | md | lg
 * @param {string}   className   — קלאסים נוספים
 */
const MipoCard = ({
  children,
  title = null,
  subtitle = null,
  footer = null,
  headerRight = null,
  image = null,
  imageAlt = "",
  hover = false,
  onClick = null,
  variant = "default",
  padding = "md",
  className = "",
}) => {
  const isClickable = hover || Boolean(onClick);

  const variants = {
    default: "bg-white border border-purple-100 shadow-md shadow-purple-100/40",
    elevated: "bg-white border border-purple-100 shadow-xl shadow-purple-200/50",
    flat: "bg-purple-50/50 border border-purple-100",
    gradient:
      "bg-gradient-to-br from-white via-purple-50/30 to-fuchsia-50/30 border border-purple-100 shadow-md shadow-purple-100/40",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const base = [
    "rounded-3xl overflow-hidden transition-all duration-300",
    variants[variant] ?? variants.default,
    isClickable
      ? "cursor-pointer hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1 active:scale-[0.99]"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasHeader = title || subtitle || headerRight;

  return (
    <div
      dir="rtl"
      className={base}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick(e)
          : undefined
      }
    >
      {/* תמונת header */}
      {image && (
        <div className="w-full h-44 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* גוף הכרטיס */}
      <div className={paddings[padding] ?? paddings.md}>
        {/* כותרת */}
        {hasHeader && (
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-bold text-gray-800 leading-snug truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {headerRight && (
              <div className="shrink-0">{headerRight}</div>
            )}
          </div>
        )}

        {/* תוכן */}
        {children && <div>{children}</div>}

        {/* footer */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-purple-50 text-sm text-gray-500">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default MipoCard;
