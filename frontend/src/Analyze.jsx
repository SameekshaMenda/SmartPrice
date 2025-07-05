import { useNavigate } from "react-router-dom";
import Squares from "./Squares";

export default function Analyze() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-[#80CBC4]">Analyze Product</h1>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/analyze/image")}
            className="bg-[#FFB433] text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Upload Image
          </button>

          <button
            onClick={() => navigate("/analyze/text")}
            className="bg-[#B4EBE6] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#80CBC4] transition"
          >
            Enter Text
          </button>
        </div>
      </div>
    </div>
  );
}
