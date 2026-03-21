// MipoLoader.jsx — MIPO Design System
const MipoLoader = ({
  size = "md",    // sm | md | lg
  fullScreen = false,
  label = null,
}) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          rounded-full animate-spin
          border-purple-200 border-t-purple-500
          ${sizes[size]}
        `}
      />
      {label && <p className="text-sm text-purple-400 font-medium">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default MipoLoader;
