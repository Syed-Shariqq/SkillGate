import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    tag: "For candidates",
    features: ["Unlimited assessments", "Score feedback", "Skill gap report"],
    cta: "Get Started Free",
    variant: "ghost",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    tag: "For small hiring teams",
    badge: "Most Popular",
    features: [
      "Up to 10 active jobs",
      "AI screening + ranking",
      "Email notifications",
      "Candidate breakdown",
    ],
    cta: "Start Pro Trial",
    variant: "primary",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " pricing",
    tag: "For large organizations",
    features: ["Unlimited jobs", "API access", "ATS integration", "Dedicated support"],
    cta: "Contact Sales",
    variant: "ghost",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <SectionWrapper id="pricing" bg="secondary">
      <ScrollReveal className="text-center mb-12">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Scale as you grow. No hidden fees. No surprises.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {PLANS.map((plan, i) => (
          <ScrollReveal key={plan.name} delay={i * 100} className={`h-full ${plan.highlighted ? "scale-105 z-10" : ""}`}>
            <div
              className={`relative bg-bg-card rounded-xl p-6 transition-all duration-300 h-full flex flex-col ${plan.highlighted
                  ? "border-2 border-accent-primary"
                  : "border border-border hover:border-accent-primary/35 hover:-translate-y-1 "
                }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-xs font-medium px-3 py-1 rounded-full bg-linear-to-r from-accent-primary to-accent-secondary text-white whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-3">{plan.tag}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-medium text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <div className="border-t border-border my-5" />

              <ul className="flex flex-col gap-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-success/10 border border-success/30 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    </span>
                    <span className="text-slate-400 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} className="w-full mt-auto">
                {plan.cta}
              </Button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
