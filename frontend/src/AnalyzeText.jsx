import { useState } from "react";
import axios from "axios";

export default function AnalyzeText() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      alert("⚠️ Please enter a product name or link.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(inputText)}`);
      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      alert("Something went wrong while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8EF] text-gray-800 flex flex-col items-center justify-start p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#80CBC4]">Analyze Product Description or Link</h1>

      {/* 🔍 Search Input */}
      <div className="w-full max-w-2xl flex items-center gap-4">
        <input
          type="text"
          className="flex-1 p-4 border border-[#B4EBE6] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#80CBC4]"
          placeholder="Enter product name or paste product link..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          className="bg-[#80CBC4] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4DB6AC] transition duration-300"
        >
          {loading ? "Analyzing..." : "Compare"}
        </button>
      </div>

      {/* 📊 Results Table */}
      {results.length > 0 && (
        <div className="mt-10 w-full max-w-5xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-[#B4EBE6] text-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Platform</th>
                <th className="py-3 px-4 text-left">Buy Now</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                  </td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.price}</td>
                  <td className="py-2 px-4">{item.platform}</td>
                  <td className="py-2 px-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
