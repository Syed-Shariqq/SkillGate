import SectionWrapper from "../../ui/SectionWrapper";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import Card from "../../ui/Card";
import MicroLabel from "../../ui/MicroLabel";

const TESTIMONIALS = [
  {
    quote:
      "We cut screening time from 3 days to 4 hours. Quality of candidates reaching interviews went through the roof.",
    name: "Riya Sharma",
    role: "Head of Talent @ NovaTech",
    initials: "RS",
    score: "4.9",
    tag: "Recruiter",
  },
  {
    quote:
      "Finally tests what I actually know, not just resume keywords. Got an interview I never would have otherwise.",
    name: "James Okafor",
    role: "Software Engineer",
    initials: "JO",
    score: "5.0",
    tag: "Candidate",
  },
  {
    quote:
      "Structured way to evaluate 200+ applicants for one role. Absolute game changer for our startup.",
    name: "David Chen",
    role: "Startup Founder",
    initials: "DC",
    score: "4.8",
    tag: "Recruiter",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials" bg="primary">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Real Outcomes. Real People.
        </h2>
        <p className="text-text-secondary text-base max-w-xl mx-auto">
          From startups to enterprise teams — and the candidates they hire.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100} className="h-full">
            <Card className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[#FFB800] text-sm">★</span>
                  ))}
                  <span className="font-mono text-xs text-text-secondary ml-1 mt-0.5">{t.score}</span>
                </div>
                <MicroLabel color={t.tag === "Recruiter" ? "purple" : "cyan"}>
                  {t.tag}
                </MicroLabel>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.role}</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
