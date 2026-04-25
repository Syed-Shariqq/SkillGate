import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Card from "@/components/ui/Card";

const TRUST_PILLARS = [
  {
    icon: "🛡️",
    title: "Bias-Free Screening",
    desc: "AI evaluates answers only. Never names, photos, or backgrounds. Pure merit.",
  },
  {
    icon: "🔒",
    title: "Data Privacy First",
    desc: "Candidate data encrypted, never sold, GDPR-aligned. Your data stays yours.",
  },
  {
    icon: "🔍",
    title: "Transparent Scoring",
    desc: "Every candidate sees exactly why they scored what they scored. No black boxes.",
  },
];

export default function Trust() {
  return (
    <SectionWrapper id="trust" bg="secondary">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Trust & Safety</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Built on Fairness. Backed by Ethics.
        </h2>
        <p className="text-text-secondary text-base max-w-xl mx-auto">
          We believe great hiring starts with a level playing field.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRUST_PILLARS.map((pillar, i) => (
          <ScrollReveal key={pillar.title} delay={i * 100} className="h-full">
            <Card className="text-center items-center flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/20 flex items-center justify-center text-2xl mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2">{pillar.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{pillar.desc}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
