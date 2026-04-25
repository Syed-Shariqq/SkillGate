import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Card from "@/components/ui/Card";

const STATS = [
  { value: "10,000+", label: "Candidates Screened", desc: "Pre-screened by AI before reaching your inbox" },
  { value: "68%", label: "Average Time Saved", desc: "Recruiters reclaim hours every single hiring cycle" },
  { value: "3 mins", label: "Average Screening Time", desc: "Per candidate, start to ranked result" },
  { value: "94%", label: "Recruiter Satisfaction", desc: "Teams that switched never went back" },
];

export default function Stats() {
  return (
    <SectionWrapper id="stats" bg="secondary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 100} className="h-full">
            <Card className="h-full">
              <p className="font-mono text-4xl font-medium text-accent-primary mb-2">
                {stat.value}
              </p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{stat.desc}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
