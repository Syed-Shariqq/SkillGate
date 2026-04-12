export default function MicroLabel({ children, color = "purple" }) {
  const colorMap = {
    purple: "text-[#6C47FF] border-[#6C47FF]/30 bg-[#6C47FF]/8",
    cyan: "text-[#00D4FF] border-[#00D4FF]/30 bg-[#00D4FF]/8",
    green: "text-[#00C48C] border-[#00C48C]/30 bg-[#00C48C]/8",
    gray: "text-[#94949F] border-[#2A2A35] bg-[#1A1A24]",
  };
  return (
    <span
      className={`inline-block font-mono text-[10px] font-medium px-2 py-0.5 rounded border tracking-widest uppercase ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}
