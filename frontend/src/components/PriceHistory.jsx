// frontend/src/components/PriceHistory.js (Complete)

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function PriceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch history only if there is a logged-in user
    if (currentUser) {
      axios.get(`http://localhost:5000/history/${currentUser.uid}`)
        .then(response => {
          // Format the Firestore timestamp for easier display
          const formattedHistory = response.data.map(item => ({
            ...item,
            date: new Date(item.timestamp.seconds * 1000).toLocaleDateString(),
            time: new Date(item.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));
          setHistory(formattedHistory);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch history:", err);
          setLoading(false);
        });
    } else {
      setLoading(false); // If no user, we're not loading anything
    }
  }, [currentUser]); // Re-run the effect if the user logs in or out

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading history...</div>
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#17153B]">
        Price History
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {history.length === 0 ? (
          <p className="text-center text-[#2E236C] text-lg">
            Your search history is empty. Start a new search to see your results here!
          </p>
        ) : (
          history.map((item) => (
            <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.id} className="block border border-[#C8ACD6] rounded-xl p-6 hover:shadow-lg transition duration-300 bg-white flex items-center gap-6">
              <img src={item.image} alt={item.product} className="w-20 h-20 object-contain rounded-md border" />
              <div className="flex-grow">
                <p className="text-sm text-[#433D8B]">{item.platform}</p>
                <div className="text-lg font-semibold text-[#17153B] mb-1">
                  {item.product}
                </div>
                <div className="text-[#2E236C] font-medium mb-1">Price Found: {item.price}</div>
                <div className="text-sm text-gray-500">Searched on: {item.date} at {item.time}</div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}