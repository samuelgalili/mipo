// MipoToast.jsx — MIPO Design System
// Usage: wrap your app with <MipoToastProvider> and use the useToast() hook

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const MipoToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ message, type = "success", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const icons = {
    success: "✅",
    error:   "❌",
    info:    "ℹ️",
    warning: "⚠️",
  };

  const colors = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error:   "bg-red-50 border-red-200 text-red-700",
    info:    "bg-purple-50 border-purple-200 text-purple-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-2xl border
              shadow-lg text-sm font-medium animate-slide-up
              ${colors[t.type]}
            `}
          >
            <span>{icons[t.type]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
