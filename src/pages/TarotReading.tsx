import { useState, useEffect, useRef } from "react";
import TarotCard from "../components/TarotCard";

interface AlbumCard {
  title: string;
  image: string;
  meaning: string;
}

export default function TarotReading() {
  const accessToken = localStorage.getItem("spotify_access_token");
  const [topAlbums, setTopAlbums] = useState<AlbumCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<AlbumCard[]>([]);
  const chimeRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);

  const generateAlbumMeaning = (title: string): string => {
    const meanings = [
      "Reflects a period of emotional depth and introspection.",
      "A vibrant time of connection, spark, and creative expression.",
      "Memories from the past influencing current decisions.",
      "A moment of clarity and radiant self-awareness.",
      "Quiet transformation and inner peace are on the horizon.",
      "Chaos and excitement might cloud your judgment—stay grounded."
    ];
    return meanings[Math.floor(Math.random() * meanings.length)];
  };

  useEffect(() => {
    const loadTopAlbums = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        const albums: AlbumCard[] = data.items.flatMap((artist: any) =>
          artist.albums?.map((album: any) => ({
            title: album.name,
            image: album.images?.[0]?.url,
            meaning: generateAlbumMeaning(album.name),
          })) || []
        );

        // Fallback: if artist.albums is not available, just return artist images
        if (albums.length === 0) {
          const fallbackAlbums: AlbumCard[] = data.items.map((artist: any) => ({
            title: artist.name,
            image: artist.images?.[0]?.url,
            meaning: generateAlbumMeaning(artist.name),
          }));
          setTopAlbums(fallbackAlbums);
        } else {
          setTopAlbums(albums);
        }
      } catch (error) {
        console.error("Failed to fetch top albums:", error);
      }
    };
    loadTopAlbums();
  }, [accessToken]);

  const drawNextCard = () => {
    if (drawnCards.length >= 3 || topAlbums.length < 3) return;
    const next = topAlbums[drawnCards.length];
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
        .vintage-card-img {
          filter: sepia(0.4) contrast(1.1) brightness(0.95);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          border-radius: 0.5rem;
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
              <TarotCard
                key={["Past", "Present", "Future"][idx]}
                position={["Past", "Present", "Future"][idx] as "Past" | "Present" | "Future"}
                title={card.title}
                image={card.image}
                vintageClassName="vintage-card-img"
                meaning={card.meaning}
              />
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