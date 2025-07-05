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
    <div className="min-h-screen bg-[#FBF8EF] py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#80CBC4] text-center">Product Analysis Statistics</h1>

      <div className="max-w-5xl mx-auto">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FFB433" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
