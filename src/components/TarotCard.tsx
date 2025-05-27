import React from "react";

interface TarotCardProps {
  title: string;
  image: string;
  meaning: string;
  position: "Past" | "Present" | "Future";
  vintageClassName?: string;
}

export default function TarotCard({ title, image, meaning, position, vintageClassName }: TarotCardProps) {
  return (
    <div className="relative w-full max-w-[240px] h-[360px] p-3 bg-[url('/textures/tarot-bg.jpg')] bg-no-repeat bg-center bg-cover rounded-xl border-2 border-black shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex flex-col justify-between text-center text-white animate-reveal-card hover:scale-[1.03] transition-transform duration-300 font-tarot">
      {/* Golden Frame Overlay */}
      <div className="absolute inset-0 border-4 border-yellow-500 rounded-xl pointer-events-none" />

      {/* Card Header */}
      <div className="z-10 text-xs uppercase tracking-widest text-black drop-shadow-md font-tarot">
        {position}
      </div>

      {/* Album Art */}
      <img
        src={image}
        alt={title}
        className={`w-full h-40 object-cover rounded border border-black shadow-md z-10 ${vintageClassName || ''}`}
      />

      {/* Title */}
      <div className="z-10 text-xl font-semibold text-black mt-2 drop-shadow-md italic font-tarot">
        {title}
      </div>

      {/* Meaning */}
      <div className="z-10 text-sm text-black px-2 py-2 mt-2 bg-black/40 rounded-md italic font-tarot">
        {meaning}
      </div>

      {/* Glow and distress effect */}
      <div className="absolute inset-0 rounded-xl bg-yellow-100 opacity-5 blur-md mix-blend-overlay pointer-events-none" />
    </div>
  );
}