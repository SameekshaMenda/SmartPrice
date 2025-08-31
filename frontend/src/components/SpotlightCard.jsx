import { useRef, useState } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.3)",
  onClick,
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative rounded-3xl p-8 overflow-hidden shadow-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105 ${className}`}
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%), linear-gradient(135deg, #FBF8EF, #FBF8EF, #80CBC4 )`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
