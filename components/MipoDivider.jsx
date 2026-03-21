// MipoDivider.jsx — MIPO Design System
const MipoDivider = ({ label = null }) => {
  if (!label) {
    return <hr className="border-none h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent my-4" />;
  }

  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-200" />
      <span className="text-xs text-purple-400 font-medium whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-200" />
    </div>
  );
};

export default MipoDivider;
