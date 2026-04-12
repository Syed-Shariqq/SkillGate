export default function SectionWrapper({ id, children, className = "", bg = "primary" }) {
  const bgMap = {
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    "slate-50": "bg-slate-50",
    white: "bg-white",
    "how-it-works": "bg-[#0D0D14]",
  };
  return (
    <section id={id} className={`${bgMap[bg]} py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}
