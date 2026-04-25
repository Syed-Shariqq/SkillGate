import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

// ─── Deterministic AI summary builder ───────────────────────────────────────
function buildAISummary(score, strengths, weaknesses) {
  const topStrength = strengths[0] || null;
  const topWeakness1 = weaknesses[0] || null;
  const topWeakness2 = weaknesses[1] || null;

  if (score >= 70) {
    const strengthPart = topStrength ? `particularly in ${topStrength}` : "across most evaluated areas";
    const weakPart = topWeakness1 ? ` However, there are minor gaps in ${topWeakness1}${topWeakness2 ? ` and ${topWeakness2}` : ""}.` : "";
    return `The candidate demonstrates a solid command of core concepts, ${strengthPart}.${weakPart} Overall proficiency is above the threshold for further technical evaluation.`;
  }
  if (score >= 40) {
    const strongPart = topStrength ? `Some understanding of ${topStrength} was evident.` : "Partial understanding was observed.";
    const gapPart = topWeakness1 ? ` Critical gaps were identified in ${topWeakness1}${topWeakness2 ? ` and ${topWeakness2}` : ""}.` : "";
    return `${strongPart}${gapPart} The candidate requires further preparation before progressing to a technical interview round.`;
  }
  const gapPart = topWeakness1 ? `Significant gaps were found in ${topWeakness1}${topWeakness2 ? ` and ${topWeakness2}` : ""}.` : "Responses lacked sufficient technical depth.";
  return `${gapPart} The candidate does not meet the minimum requirements for this role at this time. Foundational study is strongly recommended.`;
}

// ─── Deterministic suggestion map ────────────────────────────────────────────
const SUGGESTION_MAP = {
  // frontend keywords
  memory: "Study how JavaScript handles memory allocation and garbage collection.",
  reconciliation: "Deep-dive into React's reconciliation algorithm using the official docs.",
  sync: "Understand how React batches state updates and DOM sync cycles.",
  diffing: "Practice tracing virtual DOM diffing with React DevTools.",
  performance: "Explore React.memo, useMemo, and useCallback to optimize renders.",
  // backend keywords
  stateless: "Review REST constraints, especially statelessness and uniform interface.",
  http: "Study HTTP methods, status codes, and idempotency guarantees.",
  resource: "Learn how to design clean, noun-based resource URLs in REST.",
  representation: "Understand content negotiation and JSON vs. XML representation.",
  client: "Study the client-server separation principle in distributed systems.",
  server: "Explore server-side caching strategies and load balancing basics.",
  // data keywords
  probability: "Review conditional probability and the frequentist interpretation.",
  "null hypothesis": "Practice formulating and testing null hypotheses in statistics.",
  significance: "Study the meaning of significance levels (α) and Type I/II errors.",
  evidence: "Understand how p-values quantify evidence against a null hypothesis.",
  reject: "Learn the decision rule for rejecting/failing to reject a hypothesis.",
};

function getSuggestion(weakness) {
  const key = weakness.toLowerCase();
  return SUGGESTION_MAP[key] || `Review foundational concepts related to "${weakness}".`;
}

// ─── Staged thinking messages ─────────────────────────────────────────────────
const THINKING_STEPS = [
  "Analyzing candidate responses...",
  "Evaluating conceptual understanding...",
  "Checking problem-solving approach...",
  "Cross-referencing with domain benchmarks...",
  "Generating evaluation report...",
];

// ─── Rule-based chat engine ───────────────────────────────────────────────────
const FOLLOW_UP_QUESTIONS = {
  frontend: {
    mcq: [
      { question: "What is the difference between useMemo and useCallback in React?", type: "text" },
      { question: "Which of the following triggers a re-render in React?", type: "mcq", options: ["Changing a ref", "Calling setState", "Modifying a local variable", "Reading a prop"] },
    ],
    text: [
      { question: "Explain the concept of code-splitting in React and why it matters.", type: "text" },
    ],
  },
  backend: {
    mcq: [
      { question: "What does HTTP status code 429 indicate?", type: "mcq", options: ["Not Found", "Unauthorized", "Too Many Requests", "Internal Server Error"] },
    ],
    text: [
      { question: "Explain the difference between authentication and authorization.", type: "text" },
    ],
  },
  data: {
    mcq: [
      { question: "What does a correlation coefficient of -1 indicate?", type: "mcq", options: ["No correlation", "Perfect positive correlation", "Perfect negative correlation", "Weak correlation"] },
    ],
    text: [
      { question: "Explain the difference between supervised and unsupervised learning.", type: "text" },
    ],
  },
};

function getRuleBasedReply(input, { score, strengths, weaknesses, role }) {
  const msg = input.toLowerCase().trim();

  if (msg.includes("why") && (msg.includes("low") || msg.includes("score") || msg.includes("bad") || msg.includes("fail"))) {
    if (weaknesses.length === 0) return "Your score is actually strong! There were no critical gaps detected in your responses.";
    return `Your score reflects gaps in the following areas: **${weaknesses.slice(0, 3).join(", ")}**. These concepts were either missing from your answers or lacked sufficient depth. Revisiting them would improve your standing significantly.`;
  }

  if (msg.includes("improve") || msg.includes("better") || msg.includes("suggestion") || msg.includes("how")) {
    if (weaknesses.length === 0) return "Your performance was strong. To push further, explore advanced patterns and real-world implementation challenges in your domain.";
    const tips = weaknesses.slice(0, 3).map((w) => `• ${getSuggestion(w)}`).join("\n");
    return `Here are targeted improvement actions based on your gaps:\n\n${tips}`;
  }

  if (msg.includes("another question") || msg.includes("new question") || msg.includes("practice") || msg.includes("give me") || msg.includes("question")) {
    const roleQuestions = FOLLOW_UP_QUESTIONS[role];
    const pool = roleQuestions ? [...(roleQuestions.mcq || []), ...(roleQuestions.text || [])] : [];
    if (pool.length === 0) return "No additional questions are available for this role at the moment.";
    // Deterministic: pick based on score bucket
    const idx = score >= 70 ? 1 : 0;
    const q = pool[Math.min(idx, pool.length - 1)];
    if (q.type === "mcq") {
      return `**Practice Question:**\n\n${q.question}\n\nOptions:\n${q.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n")}`;
    }
    return `**Practice Question:**\n\n${q.question}`;
  }

  if (msg.includes("strength") || msg.includes("what did i do well") || msg.includes("good")) {
    if (strengths.length === 0) return "No clear strengths were detected in this evaluation. Focus on building foundational knowledge first.";
    return `You showed competency in: **${strengths.slice(0, 4).join(", ")}**. These are solid starting points to build on.`;
  }

  if (msg.includes("weakness") || msg.includes("what did i do wrong") || msg.includes("gap") || msg.includes("missed")) {
    if (weaknesses.length === 0) return "No significant weaknesses were identified. Your responses were comprehensive.";
    return `Areas that need attention: **${weaknesses.slice(0, 4).join(", ")}**. These were either absent from your answers or underdeveloped.`;
  }

  return "I can help you understand your score, identify weaknesses, suggest improvements, or give you a new practice question. Try asking one of those!";
}

// ─── Markdown-lite renderer (bolds **text**, newlines, bullets) ───────────────
function ChatMessage({ text }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        // Bold **...**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DemoResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const evalData = location.state;

  // ── Fallback ──
  if (!evalData || evalData.score === undefined || evalData.score === null) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-16 bg-bg-primary flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">No Result Found</h1>
            <p className="text-text-secondary mb-8">Please complete the assessment flow first.</p>
            <Button variant="primary" onClick={() => navigate("/demo")}>Go to Demo</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { score, strengths = [], weaknesses = [], role = "frontend" } = evalData;

  // ── Stage machine: "thinking" → "evaluating" → "result" → "chat" ──
  const [phase, setPhase] = useState("thinking"); // thinking | evaluating | result | chat
  const [visibleThinkingIdx, setVisibleThinkingIdx] = useState(0);
  const [evalLines, setEvalLines] = useState([]);
  const [visibleEvalCount, setVisibleEvalCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // Build evaluation lines from real data
  const allEvalLines = [
    ...strengths.slice(0, 5).map((s) => ({ type: "strength", text: `Strong understanding of ${s}` })),
    ...weaknesses.slice(0, 5).map((w) => ({ type: "weakness", text: `Limited explanation of ${w}` })),
  ];

  // Phase 1: march through thinking steps
  useEffect(() => {
    if (phase !== "thinking") return;
    if (visibleThinkingIdx < THINKING_STEPS.length) {
      const timer = setTimeout(() => {
        setVisibleThinkingIdx((i) => i + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      // All thinking steps done → transition to evaluating
      const timer = setTimeout(() => {
        setEvalLines(allEvalLines);
        setPhase("evaluating");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleThinkingIdx]);

  // Phase 2: reveal eval lines one by one
  useEffect(() => {
    if (phase !== "evaluating") return;
    if (visibleEvalCount < allEvalLines.length) {
      const timer = setTimeout(() => {
        setVisibleEvalCount((c) => c + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // All lines revealed → show result card
      const timer = setTimeout(() => setPhase("result"), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleEvalCount, allEvalLines.length]);

  // Phase 3: after result card shows → auto-open chat with first contextual message
  useEffect(() => {
    if (phase !== "result") return;
    const timer = setTimeout(() => {
      const topStrength = strengths[0];
      const topWeakness = weaknesses[0];
      let greeting = "I've analyzed your responses. ";
      if (score >= 70) {
        greeting += topStrength
          ? `You performed well in ${topStrength}.`
          : "You demonstrated strong knowledge overall.";
        greeting += " Would you like a new practice question to sharpen further?";
      } else if (score >= 40) {
        greeting += topStrength ? `You showed understanding in ${topStrength}, ` : "";
        greeting += topWeakness
          ? `but struggled with ${topWeakness}. Would you like to understand your gaps or get improvement tips?`
          : "but some areas need work. Ask me how to improve!";
      } else {
        greeting += topWeakness
          ? `There were significant gaps in ${topWeakness}. Would you like to understand why your score was low or get a study plan?`
          : "There are areas that need significant improvement. Ask me how to improve.";
      }
      setChatMessages([{ role: "ai", text: greeting }]);
      setPhase("chat");
    }, 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendChat = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const userMsg = { role: "user", text: trimmed };
    const aiReply = { role: "ai", text: getRuleBasedReply(trimmed, evalData) };
    setChatMessages((prev) => [...prev, userMsg, aiReply]);
    setChatInput("");
  };

  const handleChatKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  // ── Decision metadata ──
  let decisionTitle, decisionDesc, decisionColor;
  if (score >= 70) {
    decisionTitle = "Shortlisted";
    decisionDesc = buildAISummary(score, strengths, weaknesses);
    decisionColor = "text-success border-success bg-success/10";
  } else if (score >= 40) {
    decisionTitle = "Needs Review";
    decisionDesc = buildAISummary(score, strengths, weaknesses);
    decisionColor = "text-amber-400 border-amber-400 bg-amber-400/10";
  } else {
    decisionTitle = "Rejected";
    decisionDesc = buildAISummary(score, strengths, weaknesses);
    decisionColor = "text-error border-error bg-error/10";
  }

  const ringColor = score >= 70 ? "text-success" : score >= 40 ? "text-amber-400" : "text-error";
  const suggestions = weaknesses.slice(0, 4).map((w) => getSuggestion(w));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-bg-primary text-text-primary">
        <div className="max-w-2xl mx-auto px-6 mt-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Evaluation Complete</h1>
            <p className="text-text-secondary">Here is the AI assessment summary.</p>
          </div>

          {/* ── Phase: Thinking ── */}
          {(phase === "thinking" || (phase === "evaluating" && visibleEvalCount === 0)) && (
            <div className="bg-bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
                </span>
                <span className="text-sm font-mono text-accent-primary">SkillGate AI · Processing</span>
              </div>
              <div className="space-y-3">
                {THINKING_STEPS.slice(0, visibleThinkingIdx).map((msg, i) => (
                  <div key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                    <svg className="w-4 h-4 text-success shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {msg}
                  </div>
                ))}
                {visibleThinkingIdx < THINKING_STEPS.length && (
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <svg className="w-4 h-4 text-accent-primary animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    {THINKING_STEPS[visibleThinkingIdx]}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Phase: Progressive Evaluation Lines ── */}
          {(phase === "evaluating" || phase === "result" || phase === "chat") && allEvalLines.length > 0 && (
            <div className="bg-bg-card border border-border rounded-2xl p-6 shadow-xl shadow-black/30 mb-6">
              <p className="text-xs font-mono text-accent-primary uppercase tracking-widest mb-4">Evaluation Trace</p>
              <div className="space-y-2">
                {evalLines.slice(0, visibleEvalCount).map((line, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    {line.type === "strength" ? (
                      <span className="text-success font-bold shrink-0 mt-0.5">✔</span>
                    ) : (
                      <span className="text-error font-bold shrink-0 mt-0.5">✖</span>
                    )}
                    <span className={line.type === "strength" ? "text-text-primary" : "text-text-secondary"}>
                      {line.text}
                    </span>
                  </div>
                ))}
                {phase === "evaluating" && visibleEvalCount < allEvalLines.length && (
                  <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                    <svg className="w-3 h-3 text-accent-primary animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    <span className="text-xs">Analyzing...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Phase: Result Card (once evaluating is done) ── */}
          {(phase === "result" || phase === "chat") && (
            <>
              {/* Score Ring + Decision block — original layout preserved */}
              <div className="bg-bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/30 flex flex-col items-center mb-6">
                <div className="w-42 h-42 rounded-full border-8 border-bg-secondary flex items-center justify-center bg-bg-primary relative mb-8">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="76" cy="76" r="72" stroke="currentColor" strokeWidth="8" fill="none" className="text-border" />
                    <circle
                      cx="76" cy="76" r="72" stroke="currentColor" strokeWidth="8" fill="none"
                      strokeDasharray="452.39"
                      strokeDashoffset={452.39 - (452.39 * score) / 100}
                      className={`${ringColor} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <div className="text-center relative z-10">
                    <span className="text-4xl font-extrabold text-white">{score}</span>
                    <span className="text-lg font-medium text-slate-400">/100</span>
                  </div>
                </div>

                <div className={`w-full max-w-md border rounded-xl p-5 text-center mb-8 ${decisionColor}`}>
                  <h2 className="text-2xl font-bold mb-2 tracking-tight">{decisionTitle}</h2>
                  <p className="text-sm opacity-90">{decisionDesc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-mono mb-1">Questions</p>
                    <p className="font-semibold text-white">{evalData.questionBreakdown?.length ?? 3}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-mono mb-1">Keywords Matched</p>
                    <p className="font-semibold text-white">{strengths.length}</p>
                  </div>
                </div>
              </div>

              {/* ── Structured Insights ── */}
              {(strengths.length > 0 || weaknesses.length > 0) && (
                <div className="bg-bg-card border border-border rounded-2xl p-6 shadow-xl shadow-black/30 mb-6">
                  <p className="text-xs font-mono text-accent-primary uppercase tracking-widest mb-5">Structured Insights</p>

                  {strengths.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-success mb-2">Strengths</p>
                      <ul className="space-y-1.5">
                        {strengths.slice(0, 5).map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-success shrink-0">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {weaknesses.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-error mb-2">Weaknesses</p>
                      <ul className="space-y-1.5">
                        {weaknesses.slice(0, 5).map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-error shrink-0">•</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {suggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-amber-400 mb-2">Suggestions</p>
                      <ul className="space-y-1.5">
                        {suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-amber-400 shrink-0">→</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── Chat Interface ── */}
          {phase === "chat" && (
            <div className="bg-bg-card border border-border rounded-2xl shadow-xl shadow-black/30 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                </span>
                <p className="text-sm font-mono text-text-secondary">SkillGate AI · Post-Evaluation Chat</p>
              </div>

              <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-accent-primary/20 text-text-primary border border-accent-primary/30"
                        : "bg-bg-secondary border border-border text-text-secondary"
                    }`}>
                      <ChatMessage text={msg.text} />
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="px-6 py-4 border-t border-border flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleChatKeyDown}
                  placeholder="Ask about your score, weaknesses, or request a practice question..."
                  className="flex-1 bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                />
                <Button variant="primary" size="sm" onClick={handleSendChat}>
                  Send
                </Button>
              </div>
            </div>
          )}

          {/* ── Action Buttons ── */}
          {(phase === "result" || phase === "chat") && (
            <div className="flex justify-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/")}>Back to Home</Button>
              <Button variant="primary" onClick={() => navigate("/demo")}>Evaluate Another</Button>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
