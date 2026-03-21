// MipoInput.jsx — MIPO Design System
import React, { useId } from "react";

/**
 * MipoInput — שדה קלט RTL-first
 *
 * @param {string}   label       — תווית (נגישות + תצוגה)
 * @param {string}   placeholder — טקסט placeholder
 * @param {*}        value       — ערך נשלט
 * @param {function} onChange    — handler לשינוי
 * @param {string}   type        — text | email | password | number | tel | search | textarea
 * @param {string}   error       — הודעת שגיאה (מאדים את הגבול)
 * @param {string}   hint        — רמז/הסבר מתחת לשדה
 * @param {node}     iconStart   — אייקון בצד ימין (start ב-RTL)
 * @param {node}     iconEnd     — אייקון בצד שמאל (end ב-RTL)
 * @param {boolean}  disabled    — מושבת
 * @param {boolean}  required    — שדה חובה
 * @param {number}   rows        — שורות (רק ל-textarea)
 * @param {string}   className   — קלאסים נוספים לעטיפה
 * @param {string}   inputClass  — קלאסים נוספים לאינפוט
 */
const MipoInput = ({
  label = null,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error = null,
  hint = null,
  iconStart = null,
  iconEnd = null,
  disabled = false,
  required = false,
  rows = 4,
  name,
  autoComplete,
  className = "",
  inputClass = "",
}) => {
  const uid = useId();
  const inputId = `mipo-input-${uid}`;
  const errorId = `mipo-error-${uid}`;
  const hintId = `mipo-hint-${uid}`;

  const isTextarea = type === "textarea";

  const inputBase = [
    "w-full text-sm text-gray-800 bg-white",
    "placeholder:text-gray-300",
    "outline-none transition-all duration-200",
    "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed",
    // padding — מתחשב באייקונים
    iconStart ? "pe-10" : "pe-4",
    iconEnd ? "ps-10" : "ps-4",
    isTextarea ? "py-3 rounded-2xl resize-none" : "py-3 rounded-xl",
    // גבולות
    error
      ? "border border-red-400 focus:ring-2 focus:ring-red-300 focus:border-red-400"
      : "border border-purple-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400",
    inputClass,
  ]
    .filter(Boolean)
    .join(" ");

  const sharedProps = {
    id: inputId,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    required,
    autoComplete,
    dir: "rtl",
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined,
    className: inputBase,
  };

  return (
    <div dir="rtl" className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* תווית */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && (
            <span className="text-fuchsia-500 text-xs" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* שדה + אייקונים */}
      <div className="relative">
        {/* אייקון ימין (start ב-RTL) */}
        {iconStart && (
          <span
            className="absolute end-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
            aria-hidden="true"
          >
            {iconStart}
          </span>
        )}

        {/* אייקון שמאל (end ב-RTL) */}
        {iconEnd && (
          <span
            className="absolute start-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
            aria-hidden="true"
          >
            {iconEnd}
          </span>
        )}

        {isTextarea ? (
          <textarea {...sharedProps} rows={rows} />
        ) : (
          <input {...sharedProps} type={type} />
        )}
      </div>

      {/* רמז (מוצג רק ללא שגיאה) */}
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-400">
          {hint}
        </p>
      )}

      {/* שגיאה */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-500 flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default MipoInput;
