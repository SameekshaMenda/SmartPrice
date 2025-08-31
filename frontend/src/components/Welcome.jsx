// frontend/src/components/Welcome.jsx (Complete, Final Dynamic Version)

import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // You already have this
import Aurora from "./Aurora"; // Assuming this component exists

export default function Welcome() {
  const { currentUser } = useAuth(); // You already have this
  const navigate = useNavigate();
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#17153B] to-[#2E236C] text-white">
      
      <div className="absolute inset-0 z-0 opacity-20">
        <Aurora
          colorStops={["#17153B", "#2E236C", "#433D8B", "#C8ACD6"]}
          amplitude={1.5}
          blend={0}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        
        {/* --- KEY CHANGE: Use the user's display name from the auth context --- */}
        <h1 className="text-5xl font-bold mb-6">Welcome {currentUser?.displayName || 'User'} 👋</h1>
        
        <p className="text-lg mb-12 max-w-2xl text-[#C8ACD6]">
          SmartPrice helps you compare product prices across platforms, track your history, and make smarter purchases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Price History", desc: "Check your previously compared product prices and track your shopping trends.", route: "/history" },
            { title: "Statistics", desc: "View price trends and detailed comparison statistics with interactive charts.", route: "/statistics" },
            { title: "Analyze Product", desc: "Start a new search by providing a product URL or name.", route: "/productsearch" },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.route)}
              className="cursor-pointer bg-white/5 backdrop-blur-md border border-[#433D8B] p-8 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/10 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-3 text-[#C8ACD6]">{item.title}</h2>
              <p className="text-gray-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}