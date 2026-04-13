import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

export default function DemoResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;

  // Render fallback if no score is found (e.g. direct visit)
  if (score === undefined || score === null) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-16 bg-bg-primary flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">No Result Found</h1>
            <p className="text-text-secondary mb-8">Please complete the assessment flow first.</p>
            <Button variant="primary" onClick={() => navigate("/demo")}>
              Go to Demo
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Determine decision based on score
  let decisionTitle = "";
  let decisionDesc = "";
  let decisionColor = "";

  if (score >= 70) {
    decisionTitle = "Shortlisted";
    decisionDesc = "Candidate demonstrates strong proficiency in core concepts.";
    decisionColor = "text-success border-success bg-success/10";
  } else if (score >= 40) {
    decisionTitle = "Needs Review";
    decisionDesc = "Candidate shows partial understanding. Consider manual technical review.";
    decisionColor = "text-amber-400 border-amber-400 bg-amber-400/10";
  } else {
    decisionTitle = "Rejected";
    decisionDesc = "Candidate lacks fundamental knowledge required for the role.";
    decisionColor = "text-error border-error bg-error/10";
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-bg-primary text-text-primary">
        <div className="max-w-2xl mx-auto px-6 mt-10 animate-fade-in-up">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Evaluation Complete</h1>
            <p className="text-text-secondary">Here is the AI assessment summary.</p>
          </div>

          <div className="bg-bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/30 flex flex-col items-center">
            
            <div className="w-42 h-42 rounded-full border-8 border-bg-secondary flex items-center justify-center bg-bg-primary relative mb-8">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="76"
                  cy="76"
                  r="72"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-border"
                />
                <circle
                  cx="76"
                  cy="76"
                  r="72"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="452.39"
                  strokeDashoffset={452.39 - (452.39 * score) / 100}
                  className={`${score >= 70 ? "text-success" : score >= 40 ? "text-amber-400" : "text-error"} transition-all duration-1000 ease-out`}
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
                 <p className="text-xs text-text-secondary uppercase tracking-wider font-mono mb-1">Time Taken</p>
                 <p className="font-semibold text-white">4m 12s</p>
               </div>
               <div className="text-center">
                 <p className="text-xs text-text-secondary uppercase tracking-wider font-mono mb-1">Confidence</p>
                 <p className="font-semibold text-white">92%</p>
               </div>
            </div>
            
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button variant="primary" onClick={() => navigate("/demo")}>
              Evaluate Another
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
