import { useEffect, useState } from "react";

export default function PriceHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulated data (replace with actual API/localStorage)
    const dummyHistory = [
      { product: "iPhone 14", price: "$999", date: "2025-07-03", time: "10:00 AM" },
      { product: "Samsung TV", price: "$799", date: "2025-07-02", time: "03:30 PM" },
      { product: "Sony Headphones", price: "$299", date: "2025-06-30", time: "08:45 PM" },
    ];
    setHistory(dummyHistory);
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#17153B]">
        Price History
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {history.length === 0 ? (
          <p className="text-center text-[#2E236C] text-lg">No price history found.</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="border border-[#C8ACD6] rounded-xl p-6 hover:shadow-md transition duration-300 bg-white"
            >
              <div className="text-xl font-semibold text-[#17153B] mb-1">
                {item.product}
              </div>
              <div className="text-[#2E236C] font-medium mb-1">Price: {item.price}</div>
              <div className="text-sm text-[#433D8B]">{item.date} at {item.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
