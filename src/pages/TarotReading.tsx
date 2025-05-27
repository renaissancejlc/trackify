import { useState, useEffect, useRef } from "react";

interface AlbumCard {
  title: string;
  image: string;
  meaning: string;
}

const mockAlbums: AlbumCard[] = [
  {
    title: "Melancholy Dreams",
    image: "https://via.placeholder.com/150/1a1a1a/ffffff?text=Melancholy+Dreams",
    meaning: "Reflects a period of emotional depth and introspection.",
  },
  {
    title: "Electric Love",
    image: "https://via.placeholder.com/150/292929/ffffff?text=Electric+Love",
    meaning: "A vibrant time of connection, spark, and creative expression.",
  },
  {
    title: "Echoes of You",
    image: "https://via.placeholder.com/150/3a3a3a/ffffff?text=Echoes+of+You",
    meaning: "Memories from the past influencing current decisions.",
  },
  {
    title: "Golden Hour",
    image: "https://via.placeholder.com/150/444444/ffffff?text=Golden+Hour",
    meaning: "A moment of clarity and radiant self-awareness.",
  },
  {
    title: "Waves & Silence",
    image: "https://via.placeholder.com/150/555555/ffffff?text=Waves+%26+Silence",
    meaning: "Quiet transformation and inner peace are on the horizon.",
  },
  {
    title: "Neon Nights",
    image: "https://via.placeholder.com/150/666666/ffffff?text=Neon+Nights",
    meaning: "Chaos and excitement might cloud your judgment—stay grounded.",
  },
];

export default function TarotReading() {
  const [drawnCards, setDrawnCards] = useState<AlbumCard[]>([]);
  const chimeRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);
  const allCards = useRef<AlbumCard[]>([]);

  const drawNextCard = () => {
    if (drawnCards.length >= 3) return;
    if (allCards.current.length === 0) {
      allCards.current = [...mockAlbums].sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    const next = allCards.current[drawnCards.length];
    setDrawnCards([...drawnCards, next]);
    if (chimeRef.current) chimeRef.current.play();
  };

  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = 0.4;
      ambientRef.current.loop = true;
      ambientRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(236, 201, 255, 0.8); }
          50% { text-shadow: 0 0 25px rgba(236, 201, 255, 1); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-star-twinkle {
          animation: starTwinkle 4s ease-in-out infinite;
        }
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-soft {
          animation: bounceSoft 4s ease-in-out infinite;
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.8); opacity: 1; }
        }
        .animate-orb-pulse {
          animation: orbPulse 3s ease-in-out infinite;
        }
        @keyframes revealCard {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-reveal-card {
          animation: revealCard 0.6s ease-out;
        }
      `}</style>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-purple-950 via-indigo-900 to-black text-white px-4 py-10">
        {/* Twinkling stars background layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-star-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-3 text-white drop-shadow-xl animate-pulse-glow">🔮 Spotify Tarot Reading</h1>
        <p className="text-indigo-300 mb-6 text-sm">Let your top albums reveal the story of your past, present, and future.</p>
        {drawnCards.length < 3 && (
          <button
            onClick={drawNextCard}
            className="px-6 py-3 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-purple-800 hover:brightness-110 transition rounded-full text-white font-bold shadow-lg"
          >
            Reveal {["Past", "Present", "Future"][drawnCards.length]}
          </button>
        )}

        {drawnCards.length > 0 && (
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3 justify-center">
            {drawnCards.map((card, idx) => (
              <div
                key={["Past", "Present", "Future"][idx]}
                className="bg-indigo-950 p-4 rounded-xl shadow-2xl border border-purple-800 backdrop-blur-lg animate-reveal-card"
              >
                <h2 className="text-xl font-semibold mb-2 text-purple-400">{["Past", "Present", "Future"][idx]}</h2>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.meaning}</p>
              </div>
            ))}
          </div>
        )}

        {drawnCards.length === 3 && (
          <div className="mt-10 w-full max-w-3xl">
            <details className="bg-indigo-950/70 backdrop-blur-md border border-purple-800 rounded-xl shadow-lg text-white text-sm p-4">
              <summary className="cursor-pointer text-purple-300 font-semibold text-base mb-2">
                🪶 Interpret My Reading
              </summary>
              <div className="mt-4 space-y-4 text-gray-300">
                <p><strong>🕰 Past:</strong> {drawnCards[0].meaning}</p>
                <p><strong>🧭 Present:</strong> {drawnCards[1].meaning}</p>
                <p><strong>🔮 Future:</strong> {drawnCards[2].meaning}</p>
              </div>
            </details>
          </div>
        )}

        {/* Mystical Guide Character */}
        <div className="absolute top-10 right-6 z-20 animate-bounce-soft text-[2.75rem] select-none flex flex-col items-center space-y-2">
          <div className="drop-shadow text-white leading-none flex flex-col items-center">
            🔮
            <div className="-mt-2 text-sm">◉‿◉</div>
          </div>
          {/* Soft glow aura behind character */}
          <div className="absolute -top-4 -left-4 w-28 h-28 bg-purple-500 opacity-30 rounded-full blur-2xl z-0" />
          <div className="relative px-4 py-2 bg-white/80 text-purple-800 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[180px] text-center">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
            {!drawnCards.length && "Seek the truth within... and your albums shall reveal it."}
            {drawnCards.length > 0 && "The veil is lifted. Let us interpret the signs."}
          </div>
        </div>
        {/* Audio elements for sound effects */}
        <audio ref={chimeRef} src="/sounds/chime.mp3" preload="auto" />
        <audio ref={ambientRef} src="/sounds/ambient-loop.mp3" preload="auto" />
      </div>
    </>
  );
}