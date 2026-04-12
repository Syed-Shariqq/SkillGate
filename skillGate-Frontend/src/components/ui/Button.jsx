export default function Button({ children, variant = "primary", size = "md", onClick, className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary focus:ring-accent-primary";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  const variants = {
    primary:
      "bg-accent-primary hover:bg-[#5a38e8] text-white hover:scale-105 active:scale-95",
    ghost:
      "bg-transparent hover:bg-white hover:text-black/70 border border-slate-600 text-white hover:border-slate-400 active:scale-95",
    "ghost-light":
      "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95",
    outline:
      "bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white active:scale-95",
    success:
      "bg-success text-white hover:opacity-90 hover:scale-105 active:scale-95",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
