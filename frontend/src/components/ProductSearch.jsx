// frontend/src/components/ProductSearch.js (Complete, Updated File)

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- IMPORT useNavigate

export default function ProductSearch() {
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- INITIALIZE navigate

  const performSearch = async (endpoint, payload, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: payload ? 'POST' : 'GET',
        url: `http://localhost:5000${endpoint}`,
        data: payload,
        params: params,
      });

      // --- KEY CHANGE ---
      // On success, navigate to the results page and pass the data in the state
      navigate('/analyzeresults', { state: { results: response.data } });

    } catch (err) {
      console.error("Error fetching data:", err);
      const errorMessage = err.response?.data?.error || "Failed to fetch results. Please try another link or product.";
      setError(errorMessage);
    } finally {
      // We set loading to false, but the user will be on a new page anyway
      setLoading(false);
    }
  };

  const handleTextSearch = () => {
    if (!textInput.trim()) return;
    performSearch('/search', null, { query: textInput });
  };

  const handleUrlSearch = () => {
    if (!urlInput.trim()) return;
    performSearch('/url-search', { url: urlInput });
  };

  return (
    <div className="min-h-screen bg-[#F8F8FF] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl border border-[#C8ACD6]">
        <h1 className="text-4xl font-bold mb-4 text-[#2E236C] text-center">
          SmartPrice Comparator
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter a product name or paste a URL to compare prices.
        </p>

        {/* Text Search Section */}
        {/* <div className="mb-8">
            <input
              type="text"
              className="w-full p-4 border border-[#C8ACD6] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#433D8B] text-[#17153B]"
              placeholder="Search by product name..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="flex justify-center">
                <button
                    onClick={handleTextSearch}
                    disabled={loading}
                    className="mt-4 bg-[#433D8B] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300 disabled:bg-gray-400"
                >
                    {loading ? 'Searching...' : 'Search by Name'}
                </button>
            </div>
        </div> */}

        <div className="text-center my-4 text-gray-500 font-bold">OR</div>

        {/* URL Search Section */}
        <div>
            <input
              type="url"
              className="w-full p-4 border border-[#C8ACD6] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#433D8B] text-[#17153B]"
              placeholder="Paste a product URL from Amazon or Flipkart..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <div className="flex justify-center">
                <button
                    onClick={handleTextSearch}
                    disabled={loading}
                    className="mt-4 bg-[#433D8B] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300 disabled:bg-gray-400"
                >
                    {loading ? 'Analyzing...' : 'Search by URL'}
                </button>
            </div>
        </div>

        {/* Display errors on this page if they occur */}
        {error && <div className="text-center mt-8 font-semibold text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
      </div>
    </div>
  );
}