import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import MicroLabel from "@/components/ui/MicroLabel";

const FLOW_NODES = [
  {
    id: "01",
    label: "Job Description",
    sublabel: "Input",
    desc: "Paste any JD. SkillGate extracts the skills that actually predict job performance.",
    icon: "📄",
    color: "#6C47FF",
    tag: "JD Parser",
  },
  {
    id: "02",
    label: "AI Questions",
    sublabel: "Generated",
    desc: "5–8 targeted, role-specific questions. No DSA. No generic trivia. Pure signal.",
    icon: "⚡",
    color: "#8B6AFF",
    tag: "Question Engine",
  },
  {
    id: "03",
    label: "Candidate Answers",
    sublabel: "Collected",
    desc: "Candidates complete on their own time via a secure, timed link. No scheduling.",
    icon: "✍️",
    color: "#4f46e5",
    tag: "Assessment Link",
  },
  {
    id: "04",
    label: "AI Evaluation",
    sublabel: "Processing",
    desc: "Every answer scored against the same rubric. Consistent. Objective. Instant.",
    icon: "🧠",
    color: "#00C48C",
    tag: "Scoring Engine",
  },
  {
    id: "05",
    label: "Ranked Results",
    sublabel: "Delivered",
    desc: "Candidates arrive pre-ranked in your dashboard. Interview only who matters.",
    icon: "🏆",
    color: "#00C48C",
    tag: "Confidence Score",
  },
];

function FlowNode({ node, index, isLast }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {!isLast && (
        <div
          className="hidden lg:block absolute top-9 left-[calc(50%+2.25rem)] right-0 h-px z-0"
          style={{
            background: `linear-gradient(90deg, ${node.color}60, ${FLOW_NODES[index + 1].color}40)`,
          }}
        />
      )}

      <div
        className="relative z-10 w-18 h-18 rounded-full flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${node.color}25, ${node.color}08)`,
          border: `1.5px solid ${node.color}40`,
          boxShadow: `0 0 0 0 ${node.color}00`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 20px ${node.color}30`;
          e.currentTarget.style.borderColor = `${node.color}80`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 0 ${node.color}00`;
          e.currentTarget.style.borderColor = `${node.color}40`;
        }}
      >
        {node.icon}
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-medium text-white"
          style={{ background: node.color }}
        >
          {node.id}
        </span>
      </div>

      <span
        className="font-mono text-[10px] font-medium px-2 py-0.5 rounded border mb-2 tracking-widest uppercase"
        style={{ color: node.color, borderColor: `${node.color}30`, backgroundColor: `${node.color}10` }}
      >
        {node.tag}
      </span>

      <h3 className="text-white font-bold text-sm mb-1">{node.label}</h3>
      <p className="text-slate-400 text-[11px] leading-relaxed max-w-35">{node.desc}</p>
    </div>
  );
}

export default function AIEvaluationFlow() {
  return (
    <section id="ai-flow" className="relative bg-bg-primary py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14" delay={0}>
          <SectionLabel>AI Evaluation Flow</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            How the AI Actually Works
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Not a filter. Not a keyword matcher.{" "}
            <span className="text-white font-medium">A judgment engine</span> — built to
            surface the candidates who will actually perform.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="hidden lg:grid grid-cols-5 gap-0 items-start relative">
            {FLOW_NODES.map((node, idx) => (
              <FlowNode
                key={node.id}
                node={node}
                index={idx}
                isLast={idx === FLOW_NODES.length - 1}
              />
            ))}
          </div>

          <div className="lg:hidden flex flex-col gap-8 relative">
            <div className="absolute left-9 top-18 bottom-0 w-px bg-linear-to-b from-accent-primary/40 via-accent-primary/20 to-success/20" />
            {FLOW_NODES.map((node) => (
              <div key={node.id} className="flex items-start gap-5">
                <div
                  className="relative z-10 w-18 h-18 shrink-0 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, ${node.color}25, ${node.color}08)`,
                    border: `1.5px solid ${node.color}40`,
                  }}
                >
                  {node.icon}
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-medium text-white"
                    style={{ background: node.color }}
                  >
                    {node.id}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{node.label}</h3>
                    <span
                      className="font-mono text-[10px] font-medium px-2 py-0.5 rounded border tracking-widest uppercase"
                      style={{ color: node.color, borderColor: `${node.color}30`, backgroundColor: `${node.color}10` }}
                    >
                      {node.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-14 rounded-xl border border-border bg-bg-secondary px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-slate-400">
                Average time from job post to ranked candidates:
              </span>
              <span className="font-mono text-sm text-white font-medium">under 3 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <MicroLabel color="green">Confidence Score</MicroLabel>
              <MicroLabel color="purple">AI Insight</MicroLabel>
              <MicroLabel color="purple">Ranked by Skill</MicroLabel>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
