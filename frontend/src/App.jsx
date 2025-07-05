import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import PriceHistory from "./PriceHistory";
import Analyze from "./Analyze"; // if already added
import AnalyzeImage from "./AnalyzeImage";
import AnalyzeText from "./AnalyzeText";
import AnalyzeResults from "./AnalyzeResults";
import Statistics from "./Statistics";
// Add your other routes here...

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<PriceHistory />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/analyzeimage" element={<AnalyzeImage />} />
        <Route path="/analyzetext" element={<AnalyzeText />} />
        <Route path="/analyzeresults" element={<AnalyzeResults />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}
