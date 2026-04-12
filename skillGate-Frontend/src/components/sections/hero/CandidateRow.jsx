import ScoreBar from "./ScoreBar";

export default function CandidateRow({ name, score, badge, badgeColor, barColor, barDelay }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
        {name.split(" ").map((n) => n[0]).join("")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-white truncate">{name}</span>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="font-mono text-xs font-medium" style={{ color: barColor }}>
              {score}%
            </span>
            <span
              className="font-mono text-xs font-medium px-2 py-0.5 rounded-full border"
              style={{ color: badgeColor, borderColor: badgeColor, backgroundColor: `${badgeColor}15` }}
            >
              {badge}
            </span>
          </div>
        </div>
        <ScoreBar percent={score} color={barColor} delay={barDelay} />
      </div>
    </div>
  );
}
