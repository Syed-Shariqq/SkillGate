import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ScrollReveal from "../../ui/ScrollReveal";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  const navigate = useNavigate();
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-bg-primary overflow-hidden pt-16"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-bg-card mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-xs text-slate-400">Decision Engine for Hiring</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Hire Smarter. <br />
              Screen Faster. <br />
              <span className="text-accent-primary">
                Zero Bias.
              </span>
            </h1>

            <p className="text-sm font-mono text-accent-primary mb-4 tracking-wide">
              From 200 applicants → 5 interview-ready candidates. Automatically.
            </p>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              SkillGate sits between your job post and inbox — auto-generating
              skill assessments, evaluating every candidate with AI, and
              delivering only the top matches.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button variant="primary" size="lg">
                Start Hiring Smarter →
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate("/demo")}
              >
                Try Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 pt-8 border-t border-border">
              <div>
                <p className="font-mono text-2xl font-medium text-white">10,000+</p>
                <p className="text-xs text-slate-400 mt-0.5">Candidates Screened</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-mono text-2xl font-medium text-white">68%</p>
                <p className="text-xs text-slate-400 mt-0.5">Time Saved</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-mono text-2xl font-medium text-white">94%</p>
                <p className="text-xs text-slate-400 mt-0.5">Recruiter Satisfaction</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="lg:pl-8">
            <HeroDashboard />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
