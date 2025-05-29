import { useState, useEffect, useRef } from "react";
import TarotCard from "../components/TarotCard";
import TarotBackground from "../components/TarotBackground";

interface AlbumCard {
  title: string;
  image: string;
  meaning: string;
}

export default function TarotReading() {
  const accessToken = localStorage.getItem("spotify_access_token");
  const [topAlbums, setTopAlbums] = useState<AlbumCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<AlbumCard[]>([]);
  const [guideMessage, setGuideMessage] = useState("Seek the truth within... and your albums shall reveal it.");
  const [guideGrowKey, setGuideGrowKey] = useState(0);
  const chimeRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);

  const generateAlbumMeaning = (title: string, genres: string[], popularity: number): string => {
    const keywords = title.toLowerCase();
    const genreMatch = genres.map((g) => g.toLowerCase());

    if (popularity > 90) return "Fame follows you, but so does the pressure. Balance is key.";
    if (popularity > 75 && genreMatch.includes("pop")) return "You're embracing vulnerability in the spotlight—your emotions lead.";
    if (popularity > 75 && genreMatch.includes("hip hop")) return "Recognition rises. Your words shape perception—choose them well.";
    if (popularity < 50 && genreMatch.includes("indie")) return "Your path may be quiet, but its depth holds wisdom.";
    if (genreMatch.includes("metal")) return "Intensity brews within—face your inner chaos fearlessly.";
    if (genreMatch.includes("classical")) return "You seek structure, harmony, and the beauty in tradition.";
    if (genreMatch.includes("ambient") || genreMatch.includes("lo-fi")) return "You crave stillness in noise—protect your peace.";
    if (keywords.includes("love") && keywords.includes("lost")) return "Love once bloomed, but its echo lingers—grieve, then grow.";
    if (keywords.includes("dream") || keywords.includes("star") || keywords.includes("sky")) return "You’re chasing something cosmic. Keep your heart open to serendipity.";
    if (keywords.includes("fire") || keywords.includes("burn")) return "Passion blazes, but beware—it can consume as much as it warms.";
    if (keywords.includes("night") || keywords.includes("dark") || keywords.includes("shadow")) return "You're doing shadow work—what is hidden demands light.";
    if (keywords.includes("home") || keywords.includes("safe")) return "Security matters. Find peace in your roots before you bloom further.";

    // Additional specific mappings
    if (genreMatch.includes("jazz")) return "Improvisation and freedom guide your path—trust the rhythm of spontaneity.";
    if (genreMatch.includes("blues")) return "A soulful journey—your strength lies in embracing vulnerability.";
    if (keywords.includes("moon") || keywords.includes("luna")) return "Emotions ebb and flow—honor your tides, not just your clarity.";
    if (keywords.includes("sun") || keywords.includes("light")) return "You radiate energy—share it wisely, as it’s a rare gift.";
    if (keywords.includes("road") || keywords.includes("journey")) return "Every step has shaped you. Look back with pride, ahead with purpose.";
    if (keywords.includes("war") || keywords.includes("fight")) return "You've overcome much—battle scars are stories of survival.";
    if (keywords.includes("girl") && genreMatch.includes("pop")) return "Empowerment rises through softness—your femininity is your strength.";
    if (keywords.includes("void") || keywords.includes("space")) return "You exist between worlds—stillness holds revelation.";
    if (popularity < 30) return "You're in your introspective era—quiet but powerful transformation brews.";

    if (popularity > 95) return "You're not just visible—you're iconic. The world watches; how will you lead?";
    if (popularity < 10) return "In the quiet corners, your soul sings the rarest truths.";
    if (title.toLowerCase().includes("heart") && popularity > 70) return "Your heart is wide open, and it’s drawing people in.";
    if (genres.includes("dance") && popularity > 80) return "Joy is your rebellion—keep dancing through the chaos.";
    if (keywords.includes("cold") || keywords.includes("ice")) return "You’ve learned to stay composed when the world demands fire.";
    if (keywords.includes("blue") && keywords.includes("eyes")) return "You see clarity in melancholy—an old soul’s gift.";
    if (keywords.includes("gold") || keywords.includes("crown")) return "There’s royalty in your spirit—own your worth.";
    if (keywords.includes("mirror") || keywords.includes("reflection")) return "You’re confronting truth in unexpected places—lean into it.";

    // Simulated valence/tempo-based interpretations (replace with real data if available)
    const pseudoValence = Math.random(); // placeholder for valence
    const pseudoTempo = 60 + Math.random() * 100; // placeholder for BPM

    if (pseudoValence > 0.75) return "Happiness flows easily right now—embrace the lightness.";
    if (pseudoValence < 0.25) return "Melancholy is your muse. Channel it into something beautiful.";
    if (pseudoTempo > 140) return "Life feels like a sprint—don’t forget to breathe.";
    if (pseudoTempo < 70) return "Stillness surrounds you. It’s okay to slow down and listen.";

    const generalMeanings = [
      "A chapter closed, echoing lessons of resilience from heartbreak.",
      "The spark of self-belief ignites a new creative journey.",
      "You’re carrying emotions that don’t belong to you—release them.",
      "Loyalty and nostalgia are guiding your current path forward.",
      "An unexpected opportunity is hiding in your daily routine.",
      "Passion is driving you—be careful not to burn out.",
      "Trust your instincts over the noise of others' opinions.",
      "A transformation awaits, but it demands sacrifice first.",
      "Silence and solitude are needed to hear your inner truth.",
      "Balance your dreams with action—one without the other fails.",
      "What you're building now will outlast your present fears.",
      "An old connection may resurface to deliver closure or clarity.",
      "Romantic ideals may clash with reality—discern fantasy from truth.",
      "Let go of control; flow with the rhythm of change.",
      "A season of healing is near—nurture what was once neglected.",
      "Your voice matters more than you realize. Speak your truth.",
      "Cycles repeat until the lesson is learned. Reflect deeply.",
      "A restless spirit seeks adventure—satisfy it wisely.",
      "Someone is watching you thrive—share your success generously.",
      "The universe rewards your courage. Take the leap."
    ];
    return generalMeanings[Math.floor(Math.random() * generalMeanings.length)];
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
            meaning: generateAlbumMeaning(album.name, artist.genres || [], artist.popularity),
          })) || []
        );

        // Fallback: if artist.albums is not available, just return artist images
        if (albums.length === 0) {
          const fallbackAlbums: AlbumCard[] = data.items.map((artist: any) => ({
            title: artist.name,
            image: artist.images?.[0]?.url,
            meaning: generateAlbumMeaning(artist.name, artist.genres || [], artist.popularity),
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
    if (!accessToken) {
      setGuideMessage("You must log in with Spotify before the spirits will speak.");
      setGuideGrowKey((prev) => prev + 1);
      return;
    }
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
        @keyframes growGuide {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-grow-guide {
          animation: growGuide 1s ease-in-out;
        }
        [class*="key-"] {}
      `}</style>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-purple-950 via-indigo-900 to-black text-white px-4 py-10">
        <TarotBackground />
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
          <div className="relative group">
            <div className="absolute inset-0 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
            <button
              onClick={drawNextCard}
              className="relative z-20 px-6 py-3 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-purple-800 hover:brightness-110 transition rounded-full text-white font-bold shadow-lg"
            >
              Reveal {["Past", "Present", "Future"][drawnCards.length]}
            </button>
          </div>
        )}

        {drawnCards.length > 0 && (
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-red-900 via-purple-950 to-black shadow-2xl border-4 border-yellow-900">
            <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3 justify-center z-10 relative">
              {drawnCards.map((card, idx) => (
                <TarotCard
                  key={["Past", "Present", "Future"][idx]}
                  position={["Past", "Present", "Future"][idx] as "Past" | "Present" | "Future"}
                  title={card.title}
                  image={card.image}
                  vintageClassName="sepia contrast-125 saturate-50 brightness-[0.85] grayscale-[0.15] blur-[0.3px]"
                  meaning={card.meaning}
                />
              ))}
            </div>
          </div>
        )}

        {drawnCards.length === 3 && (
          <div className="mt-10 w-full max-w-3xl">
            <details className="bg-indigo-950/70 backdrop-blur-md border border-purple-800 rounded-xl shadow-lg text-white text-sm p-4">
              <summary className="cursor-pointer text-purple-300 font-semibold text-base mb-2">
                🪶 Interpret My Reading
              </summary>
              <div className="mt-4 space-y-4 text-gray-300">
                <p>
                  Your <strong>past</strong> was shaped by <em>{drawnCards[0].title}</em>, reflecting a time where {drawnCards[0].meaning.toLowerCase()}.
                </p>
                <p>
                  In the <strong>present</strong>, <em>{drawnCards[1].title}</em> calls your attention to {drawnCards[1].meaning.toLowerCase()}—a pivotal moment to pause and reflect.
                </p>
                <p>
                  As you step into the <strong>future</strong>, <em>{drawnCards[2].title}</em> hints that {drawnCards[2].meaning.toLowerCase()}—an omen of what lies ahead.
                </p>
                <p className="italic text-indigo-400">
                  Together, these signs weave a unique path shaped by rhythm, memory, and transformation.
                </p>
              </div>
            </details>
          </div>
        )}

        {/* Mystical Guide Character */}
        <div className="fixed bottom-6 left-6 z-50 max-w-[150px] sm:max-w-[180px] md:max-w-[220px] pointer-events-none">
          <div className="animate-bounce-soft text-[3rem] select-none flex flex-col items-center space-y-2">
            <div className="animate-wiggle drop-shadow text-white leading-none flex flex-col items-center">
              <div className="text-[2.75rem] animate-slow-float">🔮</div>
              <div className="-mt-3 text-sm text-gray-800 hover:text-[#1DB954] transition-colors duration-300">◉‿◉</div>
            </div>
            <div
              key={guideGrowKey}
              className={`relative px-4 py-2 bg-white/80 text-purple-800 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[180px] text-center ${
                guideMessage === "You must log in with Spotify before the spirits will speak." ? "animate-grow-guide" : ""
              }`}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
              {guideMessage}
            </div>
          </div>
        </div>
        {/* Audio elements for sound effects */}
        <audio ref={chimeRef} src="/sounds/chime.mp3" preload="auto" />
        <audio ref={ambientRef} src="/sounds/ambient-loop.mp3" preload="auto" />
      </div>
    </>
  );
}