import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function CTA() {

  const navigate = useNavigate();
  
  return (
    <SectionWrapper id="cta" bg="secondary">
      <ScrollReveal>
        <div className="relative rounded-2xl overflow-hidden border border-border bg-bg-card">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-linear-to-r from-transparent via-accent-primary to-transparent" />

          <div className="relative text-center px-6 py-16 md:py-24">
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
              Stop Drowning in Resumes.
            </h2>
            <p className="font-mono text-sm text-accent-primary mb-4 tracking-wide">
              200 applicants → 5 interviews → 1 great hire. Automatically.
            </p>
            <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-8">
              Let AI do the screening. You do the hiring.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              variant="primary"
              size="xl"
            >
              Get Started Free →
            </Button>
            <p className="mt-4 text-xs text-slate-400">No credit card required. Free forever for candidates.</p>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
