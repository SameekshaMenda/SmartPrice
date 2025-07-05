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
    <div className="min-h-screen bg-[#FBF8EF] flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8 text-[#80CBC4]">Analyze Product Image</h1>

      <div className="mt-10 text-center">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-[#80CBC4] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#4DB6AC] transition duration-300"
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
            <p className="text-[#B4EBE6] font-medium mb-2">Preview:</p>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-xs rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#FFB433] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#FFA726] transition duration-300"
        >
          Analyze Image
        </button>
      </div>
    </div>
  );
}
