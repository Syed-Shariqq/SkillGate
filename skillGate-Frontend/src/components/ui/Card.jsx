export default function Card({ children, className = "", hoverable = true, theme = "dark" }) {
  const baseTheme = theme === "light" 
    ? "bg-white border border-slate-200 shadow-sm"
    : "bg-bg-card border border-border";

  const hoverTheme = theme === "light"
    ? hoverable ? "transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent-primary hover:shadow-md" : ""
    : hoverable ? "transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent-primary" : "";

  return (
    <div className={`${baseTheme} rounded-xl p-6 ${hoverTheme} ${className}`}>
      {children}
    </div>
  );
}
