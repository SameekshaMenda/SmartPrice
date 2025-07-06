import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyzeImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      alert("⚠️ Please upload an image before submitting.");
      return;
    }
    navigate("/analyzeresults");
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-10 overflow-hidden">
      {/* Abstract shapes at the borders */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left */}
        <div className="absolute top-4 left-6 w-16 h-16 bg-[#C8ACD6] rounded-full opacity-20"></div>
        <div className="absolute top-24 left-12 w-10 h-10 bg-[#17153B] opacity-20 rotate-12"></div>

        {/* Top-right */}
        <div className="absolute top-6 right-8 w-20 h-20 bg-[#17153B] rounded-full opacity-20"></div>
        <div className="absolute top-28 right-16 w-12 h-12 bg-[#C8ACD6] opacity-20 rotate-45"></div>

        {/* Bottom-left */}
        <div className="absolute bottom-8 left-4 w-24 h-24 bg-[#17153B] opacity-20 rotate-45"></div>
        <div className="absolute bottom-20 left-16 w-10 h-10 bg-[#C8ACD6] rounded-full opacity-20"></div>

        {/* Bottom-right */}
        <div className="absolute bottom-4 right-10 w-16 h-16 bg-[#C8ACD6] rounded-full opacity-20"></div>
        <div className="absolute bottom-28 right-20 w-12 h-12 bg-[#17153B] opacity-20 rotate-12"></div>
      </div>

      {/* Main content */}
      <h1 className="text-3xl font-bold mb-8 text-[#17153B] z-10">Analyze Product Image</h1>

      <div className="mt-10 text-center z-10">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-[#17153B] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2E236C] transition duration-300"
        >
          Upload Your Product Image
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedImage && (
          <div className="mt-6">
            <p className="text-[#17153B] font-medium mb-2">Preview:</p>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-xs rounded-lg shadow-md border border-[#C8ACD6]"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#C8ACD6] text-[#17153B] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#b29ac9] transition duration-300"
        >
          Analyze Image
        </button>
      </div>
    </div>
  );
}
