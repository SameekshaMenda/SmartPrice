import { useNavigate } from "react-router-dom";

export default function AnalyzeResults() {
  const navigate = useNavigate();

  const scrapedResults = [
    { site: "Amazon", price: "₹1,299", link: "https://www.amazon.in/" },
    { site: "Flipkart", price: "₹1,249", link: "https://www.flipkart.com/" },
    { site: "Reliance Digital", price: "₹1,299", link: "https://www.reliancedigital.in/" },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#17153B]">
        Analysis Results
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Product Details */}
        <div className="bg-white border border-[#C8ACD6] p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-3 text-[#17153B]">Your Product</h2>
          <p className="text-[#2E236C] mb-2">Name: Samsung Galaxy M14 5G</p>
          <p className="text-[#2E236C] mb-2">Features: 6GB RAM, 128GB Storage, 6000mAh Battery</p>
          <p className="text-[#2E236C]">Description: Great battery backup and performance for the price.</p>
        </div>

        {/* Price Comparison */}
        <div className="bg-white border border-[#C8ACD6] p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-3 text-[#17153B]">Price Comparison</h2>
          <ul className="space-y-3">
            {scrapedResults.map(({ site, price, link }) => (
              <li key={site} className="flex justify-between items-center">
                <span className="text-[#2E236C]">{site}</span>
                <div className="flex gap-4 items-center">
                  <span className="font-bold text-[#433D8B]">{price}</span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8ACD6] underline hover:text-[#A990C5]"
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/welcome")}
          className="bg-[#17153B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
