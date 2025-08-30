import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Statistics() {
  const data = [
    { product: "iPhone 14", count: 12 },
    { product: "Samsung TV", count: 8 },
    { product: "Sony Headphones", count: 5 },
    { product: "MacBook Pro", count: 3 },
    { product: "Nike Shoes", count: 9 },
  ];

  return (
    <div className="min-h-screen bg-[#17153B] py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#C8ACD6] text-center">
        Product Analysis Statistics
      </h1>

      <div className="max-w-5xl mx-auto bg-[#17153B] p-8 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#C8ACD6" />
            <XAxis dataKey="product" stroke="#C8ACD6" tick={{ fill: "#C8ACD6", fontWeight: "bold" }} />
            <YAxis stroke="#C8ACD6" tick={{ fill: "#C8ACD6", fontWeight: "bold" }} />
            <Tooltip
              cursor={{ fill: "transparent" }} // Remove hover effect on the chart background
              contentStyle={{
                backgroundColor: "#17153B",
                borderColor: "#C8ACD6",
                color: "white",
              }}
              labelStyle={{ color: "#C8ACD6" }}
              itemStyle={{ color: "white" }}
            />
            <Bar
              dataKey="count"
              fill="#C8ACD6"
              isAnimationActive={false} // Optional: remove animation
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
