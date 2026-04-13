import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DemoAssessment from "./pages/DemoAssessment";
import DemoResult from "./pages/DemoResult";

import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoAssessment />} />
      <Route path="/result" element={<DemoResult />} />
    </Routes>
  );
}