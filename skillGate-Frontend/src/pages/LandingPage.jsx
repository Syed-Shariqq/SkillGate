import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/sections/hero/Hero";
import AIEvaluationFlow from "../components/sections/aiFlow/AIEvaluationFlow";
import Stats from "../components/sections/stats/Stats";
import ProblemSolution from "../components/sections/problem/ProblemSolution";
import Features from "../components/sections/features/Features";
import HowItWorks from "../components/sections/howItWorks/HowItWorks";
import Split from "../components/sections/split/Split";
import Testimonials from "../components/sections/testimonials/Testimonials";
import Trust from "../components/sections/trust/Trust";
import Pricing from "../components/sections/pricing/Pricing";
import CTA from "../components/sections/cta/CTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIEvaluationFlow />
        <Stats />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Split />
        <Testimonials />
        <Trust />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
