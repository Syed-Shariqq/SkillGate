import CandidateRow from "./CandidateRow";
import MicroLabel from "@/components/ui/MicroLabel";

export default function HeroDashboard() {
  return (
    <div className="relative">
      <div className="relative backdrop-blur-xl bg-white/4 border border-white/8 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-success">AI Evaluated</span>
            <span className="font-mono text-xs text-border">•</span>
            <span className="font-mono text-xs text-slate-400">24 candidates screened</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-error" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
          </div>
        </div>

        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Active Role</p>
            <h3 className="text-white font-bold text-lg">Senior React Developer</h3>
          </div>
          <MicroLabel color="purple">AI Insight</MicroLabel>
        </div>

        <div className="border-t border-border my-3" />

        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Top Candidates
          </p>
          <MicroLabel color="purple">Ranked by Skill</MicroLabel>
        </div>

        <div className="flex flex-col divide-y divide-border/50">
          <CandidateRow
            name="Sarah Chen"
            score={91}
            badge="Top Match"
            badgeColor="var(--color-success)"
            barColor="var(--color-success)"
            barDelay={0}
          />
          <CandidateRow
            name="Ahmed Khan"
            score={87}
            badge="Strong"
            badgeColor="var(--color-accent-primary)"
            barColor="var(--color-accent-primary)"
            barDelay={150}
          />
          <CandidateRow
            name="Priya Patel"
            score={73}
            badge="Average"
            badgeColor="var(--color-text-secondary)"
            barColor="var(--color-text-secondary)"
            barDelay={300}
          />
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Confidence Score</span>
          <span className="font-mono text-[10px] text-accent-primary">High · 3 of 24 shortlisted</span>
        </div>

        <button className="mt-3 w-full py-2.5 rounded-lg border border-slate-600 text-sm text-white hover:border-slate-400 transition-all duration-200 font-medium tracking-wide">
          View Full Results →
        </button>
      </div>
    </div>
  );
}
