import Aurora from "./Aurora";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
      <Aurora
  colorStops={["#80CBC4", "#B4EBE6", "#FBF8EF", "#FFB433"]}
  amplitude={0.3}   // Less intense wave
  blend={0}       // Softer blending
  speed={0.7}       // Optional: control the animation speed
/>

      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-6">
        <h1 className="text-5xl font-bold mb-6 text-center">Welcome Meghana 👋</h1>
        <p className="text-lg mb-8 text-center max-w-xl">
          SmartPrice helps you compare product prices across platforms, track your history, and make smarter purchases.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#FFB433] text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Welcome;
