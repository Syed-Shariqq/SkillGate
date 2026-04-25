import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Card from "@/components/ui/Card";

const PAIN_POINTS = [
  "Spending hours reading resumes that don't match the role",
  "No repeatable way to compare 200 candidates objectively",
  "Unqualified applicants burn your interview calendar",
];

const SOLUTIONS = [
  "AI screens every candidate before they reach you",
  "Every candidate scored on the exact same rubric",
  "Only qualified candidates enter your pipeline",
];

export default function ProblemSolution() {
  return (
    <SectionWrapper id="problem" bg="primary">
      <ScrollReveal className="text-center mb-12" delay={0}>
        <SectionLabel>The Problem</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          The Old Way Is Broken
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ScrollReveal delay={0} className="h-full">
          <Card hoverable={false} className="border-error/20 hover:border-error/80 transition-all duration-300 hover:-translate-y-1 bg-error/5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">❌</span>
              <h3 className="text-white font-bold text-lg">The Old Way</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {PAIN_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-error/40 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-error" />
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={150} className="h-full">
          <Card hoverable={false} className="border-success/20 hover:border-success/80 transition-all duration-300 hover:-translate-y-1 bg-success/5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">✅</span>
              <h3 className="text-white font-bold text-lg">The SkillGate Way</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {SOLUTIONS.map((sol) => (
                <li key={sol} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-success/40 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">{sol}</span>
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
