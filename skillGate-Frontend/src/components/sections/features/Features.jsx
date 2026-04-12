import SectionWrapper from "../../ui/SectionWrapper";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import Card from "../../ui/Card";
import MicroLabel from "../../ui/MicroLabel";

const FEATURES = [
  {
    icon: "⚡",
    title: "AI Question Generation",
    desc: "Paste a JD, get role-specific questions instantly. No DSA. No guesswork. Pure industry signal.",
    tag: "AI Insight",
    tagColor: "purple",
    wide: true,
  },
  {
    icon: "⚖️",
    title: "Objective Scoring",
    desc: "Every answer evaluated on the same rubric. Same standard. Every time. Zero bias.",
    tag: "Confidence Score",
    tagColor: "cyan",
    wide: false,
  },
  {
    icon: "🏆",
    title: "Candidate Ranking",
    desc: "Candidates ranked by actual skill score. Only the qualified reach your dashboard.",
    tag: "Ranked by Skill",
    tagColor: "green",
    wide: false,
  },
  {
    icon: "⏱️",
    title: "Timed Assessments",
    desc: "Real pressure. Real time. Reveals depth of knowledge that polished resumes hide.",
    tag: "AI Insight",
    tagColor: "purple",
    wide: false,
  },
  {
    icon: "📋",
    title: "Detailed Feedback",
    desc: "Every candidate gets a breakdown. Transparent, specific, defensible scores.",
    tag: "Confidence Score",
    tagColor: "cyan",
    wide: false,
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Track completion rates, score distributions, and skill gaps across your entire pipeline.",
    tag: "AI Insight",
    tagColor: "purple",
    wide: false,
  },
];

export default function Features() {
  return (
    <SectionWrapper id="features" bg="secondary">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Features</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Signal Over Noise. Always.
        </h2>
        <p className="text-text-secondary text-base max-w-xl mx-auto">
          Built for hiring teams who need decisions, not data dumps.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal className="lg:col-span-2 h-full" delay={0}>
          <Card className="h-full flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-xl shrink-0">
              {FEATURES[0].icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-bold text-base">{FEATURES[0].title}</h3>
                <MicroLabel color={FEATURES[0].tagColor}>{FEATURES[0].tag}</MicroLabel>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{FEATURES[0].desc}</p>
              <p className="mt-3 text-xs text-accent-primary font-mono">
                Avg. question generation time: &lt;12 seconds
              </p>
            </div>
          </Card>
        </ScrollReveal>

        {FEATURES.slice(1).map((feature, i) => (
          <ScrollReveal key={feature.title} delay={(i + 1) * 100} className="h-full">
            <Card className="h-full">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-lg mb-4">
                {feature.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-bold text-sm">{feature.title}</h3>
                <MicroLabel color={feature.tagColor}>{feature.tag}</MicroLabel>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
