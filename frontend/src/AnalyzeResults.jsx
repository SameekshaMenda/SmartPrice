// frontend/src/components/AnalyzeResults.js (Complete, Final Simplified Version)

import { useNavigate, useLocation } from "react-router-dom";

export default function AnalyzeResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const results = location.state?.results || [];
  const placeholderImage = "https://p-hold.com/300?text=No+Image";

  // Check if any high-confidence matches were found by the backend.
  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-[#17153B]">Could Not Find an Exact Match</h1>
        <p className="text-gray-600 mb-8">We couldn't find this exact product on other platforms. Please try another link.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#17153B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300"
        >
          Back to Search
        </button>
      </div>
    );
  }

  // The first result is always the product we are comparing against.
  const mainProduct = results[0];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#17153B]">
        Price Comparison Results
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Main Product Display */}
        <div className="bg-white border border-[#C8ACD6] p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={mainProduct.image || placeholderImage}
            alt={mainProduct.title}
            className="w-48 h-48 object-contain rounded-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#17153B]">{mainProduct.title}</h2>
          </div>
        </div>

        {/* Price List */}
        <div className="bg-white border border-[#C8ACD6] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#17153B]">Available Prices</h2>
          <ul className="space-y-4">
            {results.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="text-lg text-[#2E236C] font-semibold">{item.platform}</span>
                <div className="flex gap-4 items-center">
                  <span className="font-bold text-xl text-[#433D8B]">{item.price}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#433D8B] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#2E236C]"
                  >
                    View Deal
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="bg-[#17153B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300"
        >
          Start New Search
        </button>
      </div>
    </div>
  );
}