import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
// import Dashboard from "./Dashboard";
import PriceHistory from "./components/PriceHistory";
import Analyze from "./components/Analyze";
import AnalyzeImage from "./components/AnalyzeImage";
import AnalyzeText from "./components/AnalyzeText";
import AnalyzeResults from "./components/AnalyzeResults";
import Statistics from "./components/Statistics";
import ProductSearch from "./components/ProductSearch";
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} /> {/* Start from Signin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/history" element={<PriceHistory />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/analyze/analyzeimage" element={<AnalyzeImage />} />
        <Route path="/analyze/analyzetext" element={<AnalyzeText />} />
        <Route path="/productsearch" element={<ProductSearch />} />
        <Route path="/analyzeresults" element={<AnalyzeResults />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
