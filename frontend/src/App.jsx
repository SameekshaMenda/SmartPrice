import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Signin from "./Signin";
import Signup from "./Signup";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import PriceHistory from "./PriceHistory";
import Analyze from "./Analyze";
import AnalyzeImage from "./AnalyzeImage";
import AnalyzeText from "./AnalyzeText";
import AnalyzeResults from "./AnalyzeResults";
import Statistics from "./Statistics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} /> {/* Start from Signin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<PriceHistory />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/analyze/analyzeimage" element={<AnalyzeImage />} />
        <Route path="/analyze/analyzetext" element={<AnalyzeText />} />
        <Route path="/analyzeresults" element={<AnalyzeResults />} />
      </Routes>
    </Router>
  );
}
