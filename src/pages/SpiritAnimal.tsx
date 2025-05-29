import { useState, useEffect } from "react";
import AnimalBackground from "../components/AnimalBackground";

interface AnimalProfile {
  name: string;
  image: string;
  description: string;
}

const spiritAnimals: AnimalProfile[] = [
  {
    name: "Cheetah",
    image: "/assets/animals/cheetah.png",
    description: "Fast-paced and high-energy. You’re always on the move, thriving in danceable beats and bold vibes.",
  },
  {
    name: "Owl",
    image: "/assets/animals/owl.png",
    description: "Mysterious and thoughtful. You gravitate toward deep lyrics and late-night playlists.",
  },
  {
    name: "Dolphin",
    image: "/assets/animals/dolphin.png",
    description: "Playful and upbeat. You live for happy, high-valence tracks that make you smile.",
  },
  {
    name: "Turtle",
    image: "/assets/animals/turtle.png",
    description: "Chill and introspective. You enjoy slow tempos, acoustic instruments, and calming melodies.",
  },
  {
    name: "Tiger",
    image: "/assets/animals/tiger.png",
    description: "Intense and powerful. You love songs with driving bass and strong emotional energy.",
  },
];

export default function SpiritAnimal() {
  const [animal, setAnimal] = useState<AnimalProfile | null>(null);
  const [animalExplanation, setAnimalExplanation] = useState<string>("");
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [topGenres, setTopGenres] = useState<string[]>([]);
  const [mode, setMode] = useState<"overall" | "song" | "genre" | "mood">("overall");
  const [features, setFeatures] = useState<{ energy: number; valence: number; danceability: number } | null>(null);
  const [guideMessage, setGuideMessage] = useState("🌿 Welcome, wanderer. Ready to meet your inner animal?");
  const [guideGrowKey, setGuideGrowKey] = useState(0);
  const accessToken = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    fetchTopTrackFeatures();
  }, [accessToken, mode]);

  async function fetchTopTrackFeatures() {
    if (!accessToken) {
      setGuideMessage("🔒 Log in with Spotify to discover your spirit animal!");
      setGuideGrowKey(prev => prev + 1);
      return;
    }

    try {
      const topTrackRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!topTrackRes.ok) {
        console.error("Failed to fetch top tracks:", await topTrackRes.text());
        return;
      }
      const topTracksData = await topTrackRes.json();
      const items = topTracksData.items || [];
      setTopTracks(items);

      const trackId = items[0]?.id;
      if (!trackId) {
        console.error("No top track found.");
        return;
      }

      const res = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        console.error("Failed to fetch audio features:", await res.text());
        return;
      }

      const featuresData = await res.json();
      setFeatures({
        energy: featuresData.energy,
        valence: featuresData.valence,
        danceability: featuresData.danceability,
      });

      // Extract genres from artists
      const artistIds = items.flatMap((track: any) => track.artists.map((a: any) => a.id));
      const uniqueIds = [...new Set(artistIds)].slice(0, 5);
      const genrePromises = (uniqueIds as string[]).map((id) =>
        fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then(res => res.json())
      );
      const artistData = await Promise.all(genrePromises);
      const allGenres = artistData.flatMap(a => a.genres || []);
      const uniqueGenres = [...new Set(allGenres)];
      setTopGenres(uniqueGenres.slice(0, 5));
      generateAnimal();

    } catch (err) {
      console.error("Error fetching Spotify data:", err);
    }
  }

  const generateAnimal = () => {
    if (!features) return;

    const { energy, valence, danceability } = features;
    let selected: AnimalProfile;
    let explanation = `Energy: ${energy.toFixed(2)}, Valence: ${valence.toFixed(2)}, Danceability: ${danceability.toFixed(2)}. `;

    if (energy > 0.7 && danceability > 0.6) {
      selected = spiritAnimals[0]; // Cheetah
      explanation += "You love lively tracks with energy and rhythm — that's pure cheetah energy!";
    } else if (energy < 0.3 && valence < 0.4) {
      selected = spiritAnimals[3]; // Turtle
      explanation += "Low energy and mood suggest a calm and introspective vibe — perfect for a Turtle.";
    } else if (valence > 0.7) {
      selected = spiritAnimals[2]; // Dolphin
      explanation += "Your music taste is full of happy, high-valence songs — very Dolphin of you!";
    } else if (energy > 0.6) {
      selected = spiritAnimals[4]; // Tiger
      explanation += "Powerful energy dominates your listening — Tiger spirit unleashed!";
    } else {
      selected = spiritAnimals[1]; // Owl
      explanation += "You prefer deep lyrics and late-night tracks — wise as an Owl.";
    }

    setAnimal(selected);
    setAnimalExplanation(explanation);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-green-100 via-blue-100 to-purple-100 px-4">
      <AnimalBackground />
      {/* Dynamic sky and grassy hill background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-green-200 via-sky-100 to-blue-200" />
        <div className="absolute bottom-0 w-full h-60 bg-green-300 rounded-t-[50%] blur-sm opacity-50 animate-hill" />
      </div>

      {/* Rainbow arc */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120%] h-48 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 to-blue-500 opacity-30 blur-2xl z-0" />

      {/* Floating leaves */}
      <div className="absolute w-full h-full pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-green-300 rounded-full opacity-30 blur-sm animate-leaf float-delay-1" />
        <div className="absolute top-1/3 left-2/3 w-8 h-8 bg-green-500 rounded-full opacity-20 blur-sm animate-leaf float-delay-2" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-green-400 rounded-full opacity-20 blur-md animate-leaf float-delay-3" />
      </div>

      {/* Animated butterflies */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`absolute text-xl animate-butterfly pointer-events-none`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            🦋
          </span>
        ))}
      </div>

      {/* Light mist layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-50 z-10 pointer-events-none" />

      {/* Animal footprints scattered */}
      <div className="absolute bottom-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-footprint"
            style={{
              left: `${i * 10 + Math.random() * 5}%`,
              top: `${80 + Math.random() * 10}%`,
              transform: `rotate(${Math.random() * 45 - 20}deg)`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            🐾
          </span>
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-20 text-center">
        <h1 className="text-4xl font-bold text-green-900 drop-shadow mb-4">🦄 Your Spirit Animal Awaits</h1>
        <p className="text-green-800 mb-6 text-lg">
          Step into the wild — discover which animal reflects your inner rhythm.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(["overall", "song", "genre", "mood"] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setMode(type);
                // TEMPORARY: Random animal assignment for testing
                const randomAnimal = spiritAnimals[Math.floor(Math.random() * spiritAnimals.length)];
                setAnimal(randomAnimal);
                setAnimalExplanation("🔮 This is a randomly chosen spirit animal for testing purposes.");
                fetchTopTrackFeatures();
              }}
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition ${
                mode === type
                  ? "bg-green-600 text-white"
                  : "bg-white/70 text-green-800 hover:bg-white"
              }`}
            >
              {type === "overall" && "🌿 Overall"}
              {type === "song" && "🎵 By Song"}
              {type === "genre" && "🎧 By Genre"}
              {type === "mood" && "🌈 By Mood"}
            </button>
          ))}
        </div>

        {animal && (
          <div className="relative mt-10 flex justify-center">
            {/* Cave background behind the rock */}
            <div className="absolute bottom-2 w-72 h-40 bg-gray-800/40 rounded-b-[50%] blur-sm z-0" />

            {/* Rock base behind the card */}
            <div className="absolute bottom-0 w-60 h-20 bg-gray-500/30 rounded-full blur-md z-10" />

            {/* Animal card with reveal animation */}
            <div
              key={`${mode}-${animal.name}`}
              className="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-sm border border-green-200 z-20 animate-fadeInZoom"
            >
              <img src={animal.image} alt={animal.name} className="w-24 h-24 object-contain mx-auto mb-2 drop-shadow-lg" />
              <h2 className="text-2xl font-bold text-green-800 mb-2 capitalize">
                {mode} Spirit Animal: {animal.name}
              </h2>
              <p className="text-gray-700">{animal.description}</p>
              <p className="text-green-700 mt-4">{animalExplanation}</p>
              <div className="mt-6">
                <h3 className="font-semibold text-green-800 mb-2">🎵 Your Top Tracks</h3>
                <ul className="text-sm text-gray-800 list-disc list-inside space-y-1">
                  {topTracks.map((track, index) => (
                    <li key={index}>{track.name} – {track.artists?.[0]?.name}</li>
                  ))}
                </ul>
                {topGenres.length > 0 && (
                  <>
                    <h3 className="font-semibold text-green-800 mt-4 mb-2">🎧 Your Top Genres</h3>
                    <ul className="text-sm text-gray-800 list-disc list-inside space-y-1">
                      {topGenres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guide Companion */}
      <div className="fixed bottom-6 left-6 z-50 max-w-[150px] sm:max-w-[180px] md:max-w-[220px] pointer-events-none">
        <div className="animate-bounce-soft text-[3rem] select-none flex flex-col items-center space-y-2">
          <div className="drop-shadow text-white leading-none flex flex-col items-center">
            <div className="text-[2.75rem] animate-slow-float">
              {mode === "overall" && <img src="/animals/fox.png" alt="Fox Guide" className="w-28 h-auto drop-shadow-lg animate-slow-float" />}
              {mode === "song" && <img src="/animals/dolphin.png" alt="Dolphin Guide" className="w-28 h-auto drop-shadow-lg animate-slow-float" />}
              {mode === "genre" && <img src="/animals/owl.png" alt="Owl Guide" className="w-28 h-auto drop-shadow-lg animate-slow-float" />}
              {mode === "mood" && <img src="/animals/turtle.png" alt="Turtle Guide" className="w-28 h-auto drop-shadow-lg animate-slow-float" />}
            </div>
            {/* 
            <div className="-mt-3 text-sm text-gray-800 hover:text-green-700 transition-colors duration-300">
              {mode === "overall" && "^ᴥ^"}
              {mode === "song" && "≋_≋"}
              {mode === "genre" && "•ᴥ•"}
              {mode === "mood" && "~ᴥ~"}
            </div>
            */}
          </div>
          <div
            key={guideGrowKey}
            className={`relative px-4 py-2 bg-white/80 text-green-800 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[160px] ${
              guideMessage.includes("Log in with Spotify") ? "animate-guide-grow" : ""
            }`}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
            {guideMessage}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes guideGrow {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-guide-grow {
          animation: guideGrow 1s ease-in-out;
        }
        @keyframes fadeInZoom {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeInZoom {
          animation: fadeInZoom 0.8s ease-out;
        }
        @keyframes floatLeaf {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(-5deg); }
        }

        .animate-leaf {
          animation: floatLeaf 6s ease-in-out infinite;
        }

        .float-delay-1 { animation-delay: 0s; }
        .float-delay-2 { animation-delay: 2s; }
        .float-delay-3 { animation-delay: 4s; }

        @keyframes gentleWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-hill {
          animation: gentleWave 6s ease-in-out infinite;
        }

        @keyframes spiritBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-spirit-bounce {
          animation: spiritBounce 4s ease-in-out infinite;
        }
        @keyframes butterflyFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0) rotate(-10deg); opacity: 0.7; }
        }

        .animate-butterfly {
          animation: butterflyFloat 8s ease-in-out infinite;
        }

        @keyframes staggeredFootprints {
          0% { opacity: 0; transform: translateY(10px) scale(0.9); }
          50% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.9); }
        }
        .animate-footprint {
          animation: staggeredFootprints 8s ease-in-out infinite;
        }

        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-soft {
          animation: bounceSoft 4s ease-in-out infinite;
        }

        @keyframes slowFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-slow-float {
          animation: slowFloat 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}