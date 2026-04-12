import SectionWrapper from "../../ui/SectionWrapper";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import MicroLabel from "../../ui/MicroLabel";

const RECRUITER_FEATURES = [
  "Post jobs, get assessments auto-generated",
  "Review only pre-qualified candidates",
  "See detailed scores and answer breakdowns",
  "Save 10+ hours per hiring cycle",
];

const CANDIDATE_FEATURES = [
  "Get assessed on real skills, not resume keywords",
  "Complete assessments on your own time",
  "Receive detailed feedback on your performance",
  "Stand out based on ability, not connections",
];

function SplitFeatureList({ items, color }) {
  return (
    <ul className="flex flex-col gap-3 mb-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          </span>
          <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Split() {
  return (
    <SectionWrapper id="split" bg="secondary">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Built for Both Sides</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          One Platform. Two Wins.
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollReveal delay={0} className="h-full">
          <Card className="border-accent-primary/30 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-lg">
                🏢
              </div>
              <MicroLabel color="purple">AI Insight</MicroLabel>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Built for Hiring Teams</h3>
            <p className="text-text-secondary text-sm mb-5">
              Stop filtering resumes. Start interviewing talent that&apos;s already proven on skill.
            </p>
            <SplitFeatureList items={RECRUITER_FEATURES} color="#6C47FF" />
            <Button variant="outline">Start Posting Jobs</Button>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={150} className="h-full">
          <Card className="border-accent-secondary/30 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-lg">
                👤
              </div>
              <MicroLabel color="cyan">Ranked by Skill</MicroLabel>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Fair for Every Applicant</h3>
            <p className="text-text-secondary text-sm mb-5">
              Your skills deserve to be seen. SkillGate evaluates ability, not background.
            </p>
            <SplitFeatureList items={CANDIDATE_FEATURES} color="#00D4FF" />
            <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg border border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-95">
              Find Opportunities
            </button>
          </Card>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
