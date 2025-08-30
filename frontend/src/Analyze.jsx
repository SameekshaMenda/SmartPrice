import { useNavigate } from "react-router-dom";
import Squares from "./Squares";

export default function Analyze() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {/* Background Squares */}
      <div className="absolute inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} color="#17153B" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-[#17153B]">
        <h1 className="text-4xl font-bold mb-8 text-[#17153B]">Analyze Product</h1>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/analyze/analyzeimage")}
            className="bg-[#17153B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2E236C] transition"
          >
            Upload Image
          </button>

          <button
            onClick={() => navigate("/productsearch")}
            className="bg-[#17153B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2E236C] transition"
          >
            Enter Text
          </button>
        </div>
      </div>
    </div>
  );
}
