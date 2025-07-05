import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyzeText() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      alert("⚠️ Please enter some text to analyze.");
      return;
    }

    // Optional: pass data via state or URL if needed
    navigate("/analyzeresults");
  };

  return (
    <div className="min-h-screen bg-[#FBF8EF] flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8 text-[#80CBC4]">Analyze Product Description</h1>

      <textarea
        className="w-full max-w-xl h-40 p-4 border border-[#B4EBE6] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#80CBC4] text-gray-700"
        placeholder="Enter product description..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-6 bg-[#80CBC4] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#4DB6AC] transition duration-300"
      >
        Analyze
      </button>
    </div>
  );
}
