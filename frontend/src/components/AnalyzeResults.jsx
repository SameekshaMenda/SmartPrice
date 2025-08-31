// frontend/src/components/AnalyzeResults.js (Complete)

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import auth hook
import axios from "axios"; // Import axios

export default function AnalyzeResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth(); // Get the current user

  const results = location.state?.results || [];
  const placeholderImage = "https://p-hold.com/300?text=No+Image";

  // --- SAVE TO HISTORY ---
  useEffect(() => {
    // Check if there is a logged-in user and if there are results to save
    if (currentUser && results.length > 0) {
      const bestMatch = results[0];
      
      // Send a POST request to our backend to save the history
      axios.post('http://localhost:5000/history', {
        userId: currentUser.uid, // The user's unique ID from Firebase
        searchResult: {
          product: bestMatch.title,
          price: bestMatch.price,
          platform: bestMatch.platform,
          image: bestMatch.image,
          url: bestMatch.url,
        }
      }).catch(err => {
        // Log an error if saving fails, but don't interrupt the user
        console.error("Failed to save search to history:", err);
      });
    }
    // This effect runs whenever the currentUser or results change
  }, [currentUser, results]);

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-[#17153B]">Could Not Find an Exact Match</h1>
        <p className="text-gray-600 mb-8">We couldn't find this exact product on other platforms. Please try another link.</p>
        <button onClick={() => navigate("/productsearch")} className="bg-[#17153B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition">
          Start New Search
        </button>
      </div>
    );
  }

  const mainProduct = results[0];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#17153B]">Price Comparison Results</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8 mb-8">
          <img src={mainProduct.image || placeholderImage} alt={mainProduct.title} className="w-48 h-48 object-contain rounded-md"/>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{mainProduct.title}</h2>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Prices</h2>
          <ul className="space-y-4">
            {results.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <img src={item.image || placeholderImage} alt={item.title} className="w-12 h-12 object-contain bg-white p-1 rounded-md border"/>
                  <span className="text-lg text-gray-700 font-semibold">{item.platform}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-xl text-indigo-600">{item.price}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
                    View Deal
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-12">
        <button onClick={() => navigate("/welcome")} className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}