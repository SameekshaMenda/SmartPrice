// Dashboard.jsx
import { useNavigate } from "react-router-dom";
import SpotlightCard from "./SpotlightCard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF8EF] text-gray-800 py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#80CBC4]">
        Welcome to SmartPrice Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <SpotlightCard
          spotlightColor="rgba(180, 235, 230, 0.3)"
          onClick={() => navigate("/history")}
        >
          <h2 className="text-2xl font-bold mb-3 text-[#FFB433]">Price History</h2>
          <p className="text-gray-700">Check your previously compared product prices and track your shopping trends.</p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(180, 235, 230, 0.3)"
          onClick={() => navigate("/statistics")}
        >
          <h2 className="text-2xl font-bold mb-3 text-[#FFB433]">Statistics</h2>
          <p className="text-gray-700">View price trends and detailed comparison statistics with interactive charts.</p>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(180, 235, 230, 0.3)"
          onClick={() => navigate("/analyze")}
        >
          <h2 className="text-2xl font-bold mb-3 text-[#FFB433]">Analyze Product</h2>
          <p className="text-gray-700">Upload an image or description to analyze product details and pricing insights.</p>
        </SpotlightCard>
      </div>
    </div>
  );
}
