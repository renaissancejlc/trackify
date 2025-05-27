import { useState } from "react";

interface Song {
  title: string;
  artist: string;
  albumArt: string;
}

const mockSongs: Song[] = [
  {
    title: "Midnight Reverie",
    artist: "Echo Muse",
    albumArt: "https://via.placeholder.com/150/000000/FFFFFF?text=Midnight+Reverie",
  },
  {
    title: "Neon Pulse",
    artist: "The Flashlights",
    albumArt: "https://via.placeholder.com/150/111111/FFFFFF?text=Neon+Pulse",
  },
  {
    title: "Silhouettes",
    artist: "Dusk Tides",
    albumArt: "https://via.placeholder.com/150/222222/FFFFFF?text=Silhouettes",
  },
  {
    title: "Lush Language",
    artist: "Whisper Bloom",
    albumArt: "https://via.placeholder.com/150/333333/FFFFFF?text=Lush+Language",
  },
  {
    title: "Storm Season",
    artist: "Noir Garden",
    albumArt: "https://via.placeholder.com/150/444444/FFFFFF?text=Storm+Season",
  },
];

export default function Posters() {
  const [posterType, setPosterType] = useState<"movie" | "concert">("movie");
  const [selectedSongs, setSelectedSongs] = useState<Song[] | null>(null);

  const generatePoster = () => {
    const shuffled = [...mockSongs].sort(() => 0.5 - Math.random());
    setSelectedSongs(shuffled.slice(0, 3));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide text-yellow-300 drop-shadow-md">
        🎬 Your Personalized Poster
      </h1>
      <p className="text-sm text-gray-300 mb-6 italic">
        Transform your top tracks into a cinematic or electric concert showcase.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          value={posterType}
          onChange={(e) => setPosterType(e.target.value as "movie" | "concert")}
          className="bg-gray-800 border border-gray-600 px-4 py-2 rounded text-white"
        >
          <option value="movie">Movie Poster</option>
          <option value="concert">Concert Poster</option>
        </select>

        <button
          onClick={generatePoster}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-semibold"
        >
          Generate Poster
        </button>
      </div>

      {selectedSongs && (
        <div className={`mx-auto max-w-md rounded-2xl shadow-2xl border border-yellow-400 p-6 text-white transition-all duration-500 ${
          posterType === "movie"
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-purple-700 via-pink-600 to-red-500"
        }`}>
          <h2 className="text-2xl font-extrabold mb-4 text-center uppercase tracking-widest text-yellow-400">
            {posterType === "movie" ? "A Film Inspired by Your Vibe" : "Live in Concert!"}
          </h2>
          <div className="grid grid-cols-3 gap-3 my-6">
            {selectedSongs.map((song, idx) => (
              <img
                key={idx}
                src={song.albumArt}
                alt={song.title}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
          <ul className="text-sm text-gray-200 font-mono space-y-1 mt-4 text-left">
            {selectedSongs.map((song, idx) => (
              <li key={idx}>
                {song.title} — <span className="italic">{song.artist}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Poster Guide Character */}
      <div className="absolute bottom-10 right-6 z-20 animate-bounce-soft text-[2.5rem] select-none flex flex-col items-center space-y-2">
        <div className="drop-shadow text-white leading-none flex flex-col items-center">
          📸
          <div className="-mt-2 text-sm">~‿~</div>
        </div>
        <div className="relative px-4 py-2 bg-white/80 text-yellow-900 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[180px] text-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
          Let’s make your taste worthy of a marquee.
        </div>
      </div>
    </div>
  );
}
// Animation for guide character
// You can move this to your global CSS if needed
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounceSoft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-bounce-soft {
  animation: bounceSoft 4s ease-in-out infinite;
}
`;
if (typeof document !== "undefined" && !document.getElementById("bounce-soft-style")) {
  style.id = "bounce-soft-style";
  document.head.appendChild(style);
}