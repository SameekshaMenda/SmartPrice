// frontend/src/components/Statistics.js (Complete)

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Statistics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:5000/history/${currentUser.uid}`)
        .then(response => {
          // Process the history data to get search counts for each product
          const searchCounts = response.data.reduce((acc, item) => {
            // Shorten long product names for better chart display
            const productName = item.product.length > 25 ? item.product.substring(0, 22) + '...' : item.product;
            acc[productName] = (acc[productName] || 0) + 1;
            return acc;
          }, {});

          // Convert the aggregated data into the format required by the chart
          const chartData = Object.keys(searchCounts).map(key => ({
            product: key,
            count: searchCounts[key],
          }));

          setData(chartData);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch statistics data:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <div className="text-center text-white text-xl mt-10">Loading statistics...</div>
  }

  return (
    <div className="min-h-screen bg-[#17153B] py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#C8ACD6] text-center">
        Your Search Statistics
      </h1>
      <div className="max-w-5xl mx-auto bg-[#2E236C] p-8 rounded-lg shadow-lg">
        {data.length === 0 ? (
          <p className="text-center text-white text-lg">No statistics to show yet. Your search history is empty.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#433D8B" />
              <XAxis dataKey="product" stroke="#C8ACD6" tick={{ fill: "#C8ACD6", fontSize: 12 }} />
              <YAxis stroke="#C8ACD6" tick={{ fill: "#C8ACD6" }} />
              <Tooltip
                cursor={{ fill: "rgba(177, 156, 200, 0.2)" }}
                contentStyle={{ backgroundColor: "#17153B", borderColor: "#C8ACD6", color: "white" }}
                labelStyle={{ color: "#C8ACD6" }}
              />
              <Bar dataKey="count" fill="#C8ACD6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}