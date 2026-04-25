import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "Post Your Job",
    desc: "Paste your job description into SkillGate. We extract the skills that actually matter.",
  },
  {
    step: "02",
    title: "AI Builds Assessment",
    desc: "AI extracts key skills, then generates 5–8 targeted interview questions. No fluff.",
  },
  {
    step: "03",
    title: "Candidates Are Screened",
    desc: "They receive a link, complete the timed assessment on their own schedule.",
  },
  {
    step: "04",
    title: "You Get Ranked Results",
    desc: "Review scored candidates instantly. Interview only the best. Skip the rest.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" bg="how-it-works">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Process</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          How SkillGate Works
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          From job post to ranked results — in minutes, not days.
        </p>
      </ScrollReveal>

      <div className="relative">
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 100} className="h-full">
              <div className="relative group flex flex-col items-center text-center lg:items-start lg:text-left h-full">
                <div className="relative group-hover:shadow-[0_0_20px_rgba(124,79,255,0.5)] group-hover:scale-115 transition-all duration-300 z-10 w-16 h-16 rounded-full bg-[#0D0D14] border-2 border-border flex items-center justify-center mb-4 group-hover:border-accent-primary">
                  <span className="font-mono group-hover:text-md text-sm font-medium text-accent-primary">{step.step}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
