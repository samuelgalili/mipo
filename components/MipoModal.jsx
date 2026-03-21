// MipoModal.jsx — MIPO Design System
import { useEffect } from "react";

const MipoModal = ({
  open = false,
  onClose,
  title = null,
  children,
  footer = null,
  size = "md", // sm | md | lg
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizes[size]} bg-white rounded-3xl shadow-2xl shadow-purple-200/50 p-6 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-right">{title}</h2>
        )}

        <div className="text-gray-700">{children}</div>

        {footer && (
          <div className="mt-6 pt-4 border-t border-purple-50 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default MipoModal;
