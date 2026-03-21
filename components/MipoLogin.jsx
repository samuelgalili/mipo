// MipoLogin.jsx — MIPO Design System
import React, { useState } from "react";

/**
 * MipoLogin — מסך כניסה RTL-first
 *
 * @param {function} onSubmit       — (email, password) => void
 * @param {function} onForgot       — לחיצה על "שכחתי סיסמה"
 * @param {function} onRegister     — לחיצה על "הרשמה"
 * @param {boolean}  loading        — מצב טעינה
 * @param {string}   error          — שגיאה כללית (שם משתמש/סיסמה שגויים וכו')
 * @param {string}   className      — קלאסים נוספים לעטיפה
 */
const MipoLogin = ({
  onSubmit,
  onForgot,
  onRegister,
  loading = false,
  error = null,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(email, password, remember);
  };

  /* ── אייקונים ── */
  const IconEmail = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
    </svg>
  );

  const IconLock = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.125A4.125 4.125 0 008.25 7.125V10.5m-3 0h13.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
    </svg>
  );

  const IconEye = ({ off }) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      {off ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )}
    </svg>
  );

  const Spinner = () => (
    <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );

  return (
    <div dir="rtl" className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-4 ${className}`}>
      <div className="w-full max-w-md">

        {/* כרטיס */}
        <div className="bg-white rounded-3xl shadow-xl shadow-purple-100/40 border border-purple-100 px-8 py-10 flex flex-col gap-7">

          {/* לוגו + כותרת */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white text-2xl font-bold leading-none" style={{ fontFamily: "'DM Serif Display', serif" }}>M</span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
                ברוכים הבאים ל-MIPO 🐾
              </h1>
              <p className="text-sm text-gray-400 mt-1">התחברו לחשבון שלכם</p>
            </div>
          </div>

          {/* שגיאה כללית */}
          {error && (
            <div role="alert" className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3">
              <span aria-hidden="true" className="mt-0.5 shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* טופס */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* אימייל */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mipo-login-email" className="text-sm font-semibold text-gray-700">
                דוא"ל <span className="text-fuchsia-500 text-xs" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" aria-hidden="true">
                  <IconEmail />
                </span>
                <input
                  id="mipo-login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  className="w-full text-sm text-gray-800 bg-white placeholder:text-gray-300 outline-none transition-all duration-200 border border-purple-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 rounded-xl py-3 pe-10 ps-4"
                />
              </div>
            </div>

            {/* סיסמה */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="mipo-login-password" className="text-sm font-semibold text-gray-700">
                  סיסמה <span className="text-fuchsia-500 text-xs" aria-hidden="true">*</span>
                </label>
                {onForgot && (
                  <button
                    type="button"
                    onClick={onForgot}
                    className="text-xs text-purple-500 hover:text-purple-700 transition-colors duration-200 focus:outline-none focus:underline"
                  >
                    שכחתי סיסמה
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" aria-hidden="true">
                  <IconLock />
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500 transition-colors duration-200 focus:outline-none"
                >
                  <IconEye off={showPassword} />
                </button>
                <input
                  id="mipo-login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  className="w-full text-sm text-gray-800 bg-white placeholder:text-gray-300 outline-none transition-all duration-200 border border-purple-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 rounded-xl py-3 pe-10 ps-10"
                />
              </div>
            </div>

            {/* זכור אותי */}
            <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <div className="w-4 h-4 rounded border border-purple-300 bg-white peer-checked:bg-gradient-to-br peer-checked:from-purple-500 peer-checked:to-fuchsia-500 peer-checked:border-transparent transition-all duration-200 flex items-center justify-center">
                  {remember && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600">זכור אותי</span>
            </label>

            {/* כפתור כניסה */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className={[
                "relative w-full inline-flex items-center justify-center gap-2",
                "font-semibold rounded-2xl px-6 py-3 text-sm",
                "transition-all duration-300 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2",
                "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 text-white",
                "shadow-lg shadow-purple-500/30",
                loading || !email || !password
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:from-purple-600 hover:via-violet-600 hover:to-fuchsia-600 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95",
              ].join(" ")}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>מתחבר...</span>
                </>
              ) : (
                <span>כניסה</span>
              )}
            </button>
          </form>

          {/* מפריד */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-purple-100" />
            <span className="text-xs text-gray-400 shrink-0">או</span>
            <div className="flex-1 h-px bg-purple-100" />
          </div>

          {/* הרשמה */}
          <p className="text-center text-sm text-gray-500">
            עדיין אין לכם חשבון?{" "}
            <button
              type="button"
              onClick={onRegister}
              className="font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 focus:outline-none focus:underline"
            >
              הרשמה חינמית
            </button>
          </p>
        </div>

        {/* פוטר */}
        <p className="text-center text-xs text-gray-400 mt-6">
          MIPO © {new Date().getFullYear()} · כל הזכויות שמורות 🐾
        </p>
      </div>
    </div>
  );
};

export default MipoLogin;
