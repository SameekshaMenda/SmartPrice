import SpotlightCard from "./SpotlightCard"; // Reuse your card component
import { useNavigate } from "react-router-dom";

export default function AnalyzeResults() {
  const navigate = useNavigate();

  // Example: replace these with actual scraped data later
  const scrapedResults = [
    { site: "Amazon", price: "₹1,299", link: "https://www.amazon.in/" },
    { site: "Flipkart", price: "₹1,249", link: "https://www.flipkart.com/" },
    { site: "Reliance Digital", price: "₹1,299", link: "https://www.reliancedigital.in/" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8EF] py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#80CBC4]">
        Analysis Results
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Your Product Details */}
        <SpotlightCard spotlightColor="rgba(128, 203, 196, 0.3)">
          <h2 className="text-2xl font-bold mb-3 text-[#FFB433]">Your Product</h2>
          <p className="text-gray-700 mb-2">Name: Samsung Galaxy M14 5G</p>
          <p className="text-gray-700 mb-2">Features: 6GB RAM, 128GB Storage, 6000mAh Battery</p>
          <p className="text-gray-700">Description: Great battery backup and performance for the price.</p>
        </SpotlightCard>

        {/* Scraped Results */}
        <SpotlightCard spotlightColor="rgba(180, 235, 230, 0.3)">
          <h2 className="text-2xl font-bold mb-3 text-[#FFB433]">Price Comparison</h2>
          <ul className="space-y-3">
            {scrapedResults.map(({ site, price, link }) => (
              <li key={site} className="flex justify-between items-center">
                <span className="text-gray-700">{site}</span>
                <div className="flex gap-4 items-center">
                  <span className="font-bold">{price}</span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#80CBC4] underline hover:text-[#4DB6AC]"
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#FFB433] text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
