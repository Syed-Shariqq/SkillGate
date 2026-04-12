export default function SectionLabel({ children }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-widest uppercase bg-bg-card border border-border text-accent-primary mb-4">
      {children}
    </span>
  );
}
