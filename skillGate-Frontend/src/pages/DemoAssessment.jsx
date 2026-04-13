import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

const ROLES = [
  { id: "frontend", title: "Frontend Developer", icon: "⚛️" },
  { id: "backend", title: "Backend Developer", icon: "⚙️" },
  { id: "data", title: "Data Analyst", icon: "📊" },
];

const MOCK_QUESTIONS = {
  frontend: [
    {
      id: 1,
      type: "mcq",
      question: "Which hook should be used for data fetching on component mount in modern React?",
      options: ["useEffect", "useMemo", "useContext", "useReducer"],
      correct: "useEffect",
      weight: 30,
    },
    {
      id: 2,
      type: "text",
      question: "Explain the purpose of the virtual DOM in React.",
      expectedKeywords: ["memory", "reconciliation", "sync", "diffing", "performance"],
      weight: 40,
    },
    {
      id: 3,
      type: "mcq",
      question: "What does the CSS property 'display: flex' do?",
      options: ["Creates a grid", "Turns element into a flex container", "Hides element", "Adds inline padding"],
      correct: "Turns element into a flex container",
      weight: 30,
    },
  ],
  backend: [
    {
      id: 1,
      type: "mcq",
      question: "Which HTTP method is idempotent?",
      options: ["POST", "PATCH", "PUT", "CONNECT"],
      correct: "PUT",
      weight: 30,
    },
    {
      id: 2,
      type: "text",
      question: "Explain what a REST API is.",
      expectedKeywords: ["stateless", "http", "resource", "representation", "client", "server"],
      weight: 40,
    },
    {
      id: 3,
      type: "mcq",
      question: "What is an index in a database?",
      options: ["A primary key", "A data structure to improve speed", "A foreign key", "A stored procedure"],
      correct: "A data structure to improve speed",
      weight: 30,
    },
  ],
  data: [
    {
      id: 1,
      type: "mcq",
      question: "Which type of join returns all rows from the left table?",
      options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
      correct: "LEFT JOIN",
      weight: 30,
    },
    {
      id: 2,
      type: "text",
      question: "Describe what P-value represents in hypothesis testing.",
      expectedKeywords: ["probability", "null hypothesis", "significance", "evidence", "reject"],
      weight: 40,
    },
    {
      id: 3,
      type: "mcq",
      question: "What is pandas used for in Python?",
      options: ["Web scraping", "Data manipulation and analysis", "Building APIs", "Game development"],
      correct: "Data manipulation and analysis",
      weight: 30,
    },
  ],
};

export default function DemoAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Role, 2: Questions
  const [selectedRole, setSelectedRole] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setStep(2);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const buildEvaluationData = () => {
    const questions = MOCK_QUESTIONS[selectedRole];
    let totalScore = 0;
    let maxPossibleScore = 0;
    const strengths = [];
    const weaknesses = [];
    const questionBreakdown = [];

    for (const q of questions) {
      maxPossibleScore += q.weight;
      const userAnswer = answers[q.id] || "";

      if (q.type === "mcq") {
        const correct = userAnswer === q.correct;
        if (correct) {
          totalScore += q.weight;
          strengths.push(q.question.replace(/\?$/, "").trim());
        } else {
          weaknesses.push(q.question.replace(/\?$/, "").trim());
        }
        questionBreakdown.push({ question: q.question, type: "mcq", correct, userAnswer, correctAnswer: q.correct });
      } else if (q.type === "text") {
        const text = userAnswer.toLowerCase();
        const matched = q.expectedKeywords.filter((kw) => text.includes(kw.toLowerCase()));
        const missing = q.expectedKeywords.filter((kw) => !text.includes(kw.toLowerCase()));
        const matchRatio = q.expectedKeywords.length > 0 ? matched.length / q.expectedKeywords.length : 0;

        totalScore += q.weight * Math.min(matchRatio, 1);
        matched.forEach((kw) => strengths.push(kw));
        missing.forEach((kw) => weaknesses.push(kw));
        questionBreakdown.push({ question: q.question, type: "text", matched, missing, matchRatio });
      }
    }

    const normalizedScore = maxPossibleScore > 0
      ? Math.max(0, Math.min(100, Math.round((totalScore / maxPossibleScore) * 100)))
      : 0;

    return { score: normalizedScore, strengths, weaknesses, questionBreakdown, role: selectedRole };
  };

  const handleSubmit = () => {
    const questions = MOCK_QUESTIONS[selectedRole];

    // Validation
    const allAnswered = questions.every((q) => answers[q.id] && answers[q.id].trim() !== "");
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    const evalData = buildEvaluationData();
    navigate("/result", { state: evalData });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-bg-primary text-text-primary">
        <div className="max-w-3xl flex items-center justify-center flex-col gap-10 mx-auto px-6">

          <div className="mb-10 animate-fade-in-up">
            <h1 className="text-3xl font-bold bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-3">
              {step === 1 ? "Choose a Role to Assess" : `Assessment: ${ROLES.find(r => r.id === selectedRole)?.title}`}
            </h1>
            <p className="text-text-secondary text-sm md:text-base">
              {step === 1
                ? "Experience our AI evaluation engine in action. Select a demo scenario below."
                : "Answer the following questions. Our engine will evaluate your responses in real-time."}
            </p>
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg shadow-black/20">
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-3">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="flex cursor-pointer flex-col items-center justify-center p-6 text-center rounded-lg border border-border bg-bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  >
                    <span className="text-4xl mb-3">{role.icon}</span>
                    <span className="font-semibold text-text-primary">{role.title}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && selectedRole && (
              <div className="space-y-8 animate-fade-in-up">
                {MOCK_QUESTIONS[selectedRole].map((q, idx) => (
                  <div key={q.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <p className="font-medium text-lg mb-4">
                      <span className="text-accent-primary mr-2">{idx + 1}.</span>
                      {q.question}
                    </p>

                    {q.type === "mcq" ? (
                      <div className="space-y-3">
                        {q.options.map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${answers[q.id] === opt
                                ? "border-accent-primary bg-accent-primary/10"
                                : "border-border bg-bg-secondary hover:border-slate-500"
                              }`}
                          >
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className="w-4 h-4 text-accent-primary bg-transparent border-slate-500 focus:ring-accent-primary focus:ring-offset-bg-card accent-accent-primary"
                            />
                            <span className="text-sm md:text-base">{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        rows={4}
                        placeholder="Type your answer here..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="w-full bg-bg-secondary border border-border rounded-md p-4 text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors resize-y"
                      />
                    )}
                  </div>
                ))}

                {error && (
                  <div className="bg-error/10 border border-error/20 text-error p-4 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit Assessment
                  </Button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-primary border-2 hover:bg-white/90 font-semibold cursor-pointer hover:text-black border-gray-500 text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors">
            ← Back to Home
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
