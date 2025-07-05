// PriceHistory.jsx
import { useEffect, useState } from "react";

export default function PriceHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Example: Fetch user history from localStorage or API
    const dummyHistory = [
      { product: "iPhone 14", price: "$999", date: "2025-07-03", time: "10:00 AM" },
      { product: "Samsung TV", price: "$799", date: "2025-07-02", time: "03:30 PM" },
      { product: "Sony Headphones", price: "$299", date: "2025-06-30", time: "08:45 PM" },
    ];
    setHistory(dummyHistory);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8EF] py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#80CBC4] text-center">Your Price History</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-700">No history found.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
              <div className="text-lg font-semibold text-[#FFB433]">{item.product}</div>
              <div className="text-gray-600">Price: {item.price}</div>
              <div className="text-gray-500 text-sm">
                {item.date} at {item.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
