import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyzeText() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to analyze.");
      return;
    }

    navigate("/analyzeresults");
  };

  return (
    <div className="min-h-screen bg-[#F8F8FF] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl border border-[#C8ACD6]">
        <h1 className="text-3xl font-bold mb-6 text-[#2E236C] text-center">
          Analyze Product Description
        </h1>

        <textarea
          className="w-full h-40 p-4 border border-[#C8ACD6] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#433D8B] text-[#17153B]"
          placeholder="Enter product description..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            className="mt-6 bg-[#433D8B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}
