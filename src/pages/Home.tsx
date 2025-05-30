import { useNavigate } from "react-router-dom";
import { loginWithSpotify } from "../utils/SpotifyAuth";
import { useEffect, useState } from "react";
import { SpotifyDataProvider } from "../context/SpotifyDataContext";
import HomeBackground from "../components/HomeBackground";
import { useRef } from 'react';
import { useSpotifyData } from "../context/SpotifyDataContext";
import { fetchTopTracks } from "../utils/spotify";
import { BookOpen, FileText, Music2, Youtube, Github, Twitter, Linkedin, Mail } from "lucide-react";
import SpotifyBar from '../components/SpotifyBar';

// Helper for fetching user streak from backend (DynamoDB)
async function fetchUserStreak(userId: string): Promise<{ streak: number } | null> {
  try {
    const resp = await fetch(`/api/user-stats?userId=${encodeURIComponent(userId)}`);
    if (!resp.ok) return null;
    const data = await resp.json();
    return { streak: data.streak };
  } catch {
    return null;
  }
}


function getRandomGreeting() {
  const greetings = [
    "Long time no float!",
    "Let’s spin some vibes!",
    "Your soundtrack awaits!",
    "Back in the groove!",
    "Welcome to your vibe zone!",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export default function Home() {
  return (
    <SpotifyDataProvider>
      <HomeContent />
    </SpotifyDataProvider>
  );
}

import type { Track } from "../types/Track";

async function getAccessToken(): Promise<string | null> {
  // Try to get from localStorage (or implement your own logic)
  return localStorage.getItem("spotify_access_token");
}

function HomeContent() {
  const navigate = useNavigate();
  const { profile: userProfile, topGenre } = useSpotifyData();
  const [topTracks, setTopTracks] = useState<Track[]>();
  const [streak, setStreak] = useState<number | null>(null);
  // Track current playing song index for SpotifyBar
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  function calculatePopularityScore(tracks: Track[] | undefined) {
    if (!tracks || tracks.length === 0) return "N/A";
    // Guard against missing popularity values
    const validTracks = tracks.filter((track) => typeof track.popularity === "number");
    if (validTracks.length === 0) return "N/A";
    console.log("All tracks:", tracks);
    console.log("Valid popularity values:", validTracks.map(t => t.popularity));
    const total = validTracks.reduce((sum, track) => sum + (track.popularity ?? 0), 0);
    const avg = total / validTracks.length;
    return `${Math.round(avg)} / 100`;
  }

  function getPopularityMessage(scoreStr: string): string {
    const match = scoreStr.match(/\d+/);
    if (!match) return "Your taste is uniquely undefinable.";
    const score = parseInt(match[0], 10);
    if (score >= 90) return "You're a chart chaser — all hits, all the time.";
    if (score >= 80) return "You ride the mainstream waves with style.";
    if (score >= 70) return "You enjoy popular picks but throw in surprises.";
    if (score >= 60) return "You balance hits with hidden gems.";
    if (score >= 50) return "You're in the middle — a little of everything.";
    if (score >= 40) return "You lean toward deep cuts and artist tracks.";
    if (score >= 30) return "You love underrated tracks and indie energy.";
    if (score >= 20) return "You're a certified crate digger.";
    if (score >= 10) return "Your taste is niche and intentionally off-radar.";
    return "You defy the algorithm — obscurity is your vibe.";
  }

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessToken();
      if (!token) return;
      const tracks = await fetchTopTracks(token);
      setTopTracks(tracks);
    };
    getData();
  }, []);

  // Fetch streak if userProfile exists
  useEffect(() => {
    if (userProfile?.id) {
      fetchUserStreak(userProfile.id).then((res) => {
        if (res && typeof res.streak === "number") setStreak(res.streak);
      });
    }
  }, [userProfile]);

  const handleLogin = () => {
    loginWithSpotify();
  };

  // Handler to skip to next track in the SpotifyBar
  const handleSkipForward = () => {
    if (!topTracks) return;
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % topTracks.length);
  };

  // Handler to skip to previous track in the SpotifyBar
  const handleSkipBack = () => {
    if (!topTracks) return;
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? topTracks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-y-auto scroll-smooth bg-gradient-to-t from-pink-100 via-white to-blue-100 px-4">
      <HomeBackground />
      {/* Animated pink clouds background */}
      <div className="absolute inset-0 z-0 animate-clouds bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] opacity-20 bg-repeat" />

      {/* Floating music notes */}
      <div className="absolute z-0 animate-float text-pink-300 text-3xl opacity-40 select-none">
        🎵 🎶 🎧 🎼
      </div>

      {/* Cloud Companion with PNG */}
      <div className="fixed bottom-6 left-6 z-50 max-w-[150px] sm:max-w-[180px] md:max-w-[220px] pointer-events-none">
        <div className="animate-bounce-soft select-none flex flex-col items-center space-y-2">
          <div className="drop-shadow flex flex-col items-center">
            <img
              src="/cloud-companion.png"
              alt="Cloud Companion"
              className="w-28 h-auto drop-shadow-lg animate-slow-float"
            />
          </div>
          <div className="relative px-4 py-2 bg-white/80 text-pink-700 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[160px]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
            ✨ Ready to float through your favorite songs?
          </div>
        </div>
      </div>

      {/* Glassmorphic login card */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center z-10">
        <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 drop-shadow-sm">
          ☁️ Trackify
        </h1>
        <p className="text-pink-600 italic mb-4 text-sm tracking-wide">
          where your music floats with the clouds 🎶
        </p>
        <p className="text-gray-700 mb-6">
          Dive into a playful music experience! Generate posters, discover your spirit animal,
          predict your music future, and test your album knowledge.
        </p>
        {!userProfile && (
          <button
            onClick={handleLogin}
            className="bg-[#1DB954] hover:bg-[#1ed760] transition text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Log in with Spotify
          </button>
        )}
        {userProfile && (
          <div className="mt-8 bg-white/60 rounded-3xl p-6 shadow-xl text-center max-w-lg w-full backdrop-blur-md">
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              {getRandomGreeting()} {userProfile.display_name}!
            </h2>
            <p className="text-sm text-gray-700 italic mb-4">
              We missed your musical vibes in the clouds!
            </p>
            {/* Streak display */}
            {typeof streak === "number" && (
              <div className="mb-3 text-base flex items-center justify-center gap-2 text-orange-500 font-semibold">
                <span role="img" aria-label="fire">🔥</span> {streak}-day streak
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="bg-white/70 rounded-2xl px-5 py-4 shadow text-gray-800 min-h-[72px] flex items-center justify-center text-center">
                Top Genre: <strong>{topGenre || "Genre not available"}</strong>
              </div>
              <div className="bg-white/70 rounded-2xl px-5 py-4 shadow text-gray-800 min-h-[72px] flex items-center justify-center text-center">
                {(() => {
                  // Log for debugging to check if the favorite track's name is being confused with the artist
                  if (topTracks && topTracks.length > 0) {
                    console.log("Favorite Track candidate:", topTracks[0]);
                  }
                  return (
                    <>
                      Favorite Track: <strong>{topTracks && topTracks.length > 0 ? topTracks[0].name : "Not available"}</strong>
                    </>
                  );
                })()}
              </div>
              <div className="bg-white/70 rounded-2xl px-5 py-4 shadow text-gray-800 min-h-[72px] flex items-center justify-center text-center">
                Top Artist: <strong>{useSpotifyData().topArtists?.[0]?.name || "Not available"}</strong>
              </div>
            </div>
            <div className="bg-white/70 rounded-2xl px-4 py-3 shadow text-sm text-gray-800">
                Popularity Score: <strong>{calculatePopularityScore(topTracks)}</strong>
            </div>
            <p className="text-xs text-gray-500 italic mt-1">
              {getPopularityMessage(calculatePopularityScore(topTracks))}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This score reflects how <strong>popular</strong> or <strong>obscure</strong> your top tracks are compared to global streaming trends.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("spotify_access_token");
                window.location.reload();
              }}
              className="mt-4 text-sm text-[#1DB954] hover:text-[#1ed760] underline"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Feature previews */}
      <div className="z-10 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center max-w-5xl">
        {/* Spirit Animal */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 via-white to-pink-200 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              🦊
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Meet Your Spirit Animal</h3>
          <p className="text-sm text-gray-600 text-center">Let your music taste reveal your true energy.</p>
        </div>

        {/* Album Guess */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-200 via-white to-blue-200 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              💿
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Guess the Album</h3>
          <p className="text-sm text-gray-600 text-center">Identify the album by its blurry cover.</p>
        </div>

        {/* Tarot Reading */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 via-white to-blue-200 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              🔮
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Get a Tarot Reading</h3>
          <p className="text-sm text-gray-600 text-center">Let your albums tell your past, present, and future.</p>
        </div>

        {/* Guess the Year */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 via-white to-pink-200 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              📅
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Guess the Year</h3>
          <p className="text-sm text-gray-600 text-center">Can you tell when a track was released?</p>
        </div>

        {/* Create Posters */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 via-white to-purple-200 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              🎬
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Create Posters</h3>
          <p className="text-sm text-gray-600 text-center">Turn your top songs into cinematic visuals.</p>
        </div>

        {/* Support the Developer */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 via-white to-yellow-200 flex items-center justify-center text-3xl shadow-inner border-2 border-white/60">
              ❓
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Mystery Feature</h3>
          <p className="text-sm text-gray-600 text-center">Something magical is on its way..</p>
        </div>
      </div>

        {/* Coming Soon / Mystery */}
        {/* <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 via-white to-blue-100 bg-opacity-90 flex items-center justify-center text-4xl shadow-inner border-2 border-white/60 contrast-125 brightness-110">
              ☕
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Support the Developer</h3>
          <p className="text-sm text-gray-600 text-center">Enjoying the vibes? Consider buying me a coffee!.</p>
        </div> */}

      <style>
        {`
          .glow-ring {
            background: conic-gradient(from 180deg, #fbc2eb 0%, #a6c1ee 30%, #fad0c4 60%, #fbc2eb 100%);
            filter: blur(8px) brightness(1.2);
            opacity: 0.9;
            box-shadow: 0 0 32px 8px #fbc2eb55, 0 0 12px 2px #a6c1ee33;
            z-index: 0;
            animation: pastelGlow 3.5s ease-in-out infinite alternate;
          }
          @keyframes pastelGlow {
            0% { filter: blur(8px) brightness(1.08); opacity: 0.85; }
            100% { filter: blur(14px) brightness(1.25); opacity: 1; }
          }
          @keyframes cloudFloat {
            0% { background-position: 0 0; }
            100% { background-position: 1000px 0; }
          }

          .animate-clouds {
            animation: cloudFloat 60s linear infinite;
            background-size: 400px;
          }

          @keyframes floatNotes {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          .animate-float {
            animation: floatNotes 5s ease-in-out infinite;
          }

          @keyframes bounceSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          .animate-bounce-soft {
            animation: bounceSoft 4s ease-in-out infinite;
          }

          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(3deg); }
            75% { transform: rotate(-3deg); }
          }
          .animate-wiggle {
            animation: wiggle 2.5s ease-in-out infinite;
          }

          @keyframes slowFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .animate-slow-float {
            animation: slowFloat 8s ease-in-out infinite;
          }

          /* Now Playing Simulator Animations */
          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spinSlow 20s linear infinite;
          }

          @keyframes playbar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-playbar {
            animation: playbar 5s linear infinite;
          }
        `}
      </style>
      {/* Now Playing Simulator */}
      <div className="mt-12" />
      {(() => {
        const currentTrack = topTracks?.[currentTrackIndex];
        return (
          currentTrack && (
            <SpotifyBar
              trackTitle={currentTrack?.name || "Unknown Track"}
              artist={currentTrack?.artists?.[0]?.name || "Unknown Artist"}
              isPlaying={true}
              onSkipForward={handleSkipForward}
              onSkipBack={handleSkipBack}
            >
              <div className="z-10 max-w-xl w-full flex flex-col items-center justify-center space-y-4 text-center">
                <div className="relative w-36 h-36 rounded-full border-4 border-[#1DB954] shadow-lg animate-spin-slow overflow-hidden">
                  <img
                    src={currentTrack?.album?.images?.[0]?.url}
                    alt="Now Playing Album"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="text-sm text-gray-700">
                  {/* <p className="font-semibold">Now Playing:</p> */}
                  {/* <p>
                    {currentTrack?.name || "Unknown Track"} –{" "}
                    {currentTrack?.artists?.[0]?.name || "Unknown Artist"}
                  </p> */}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1DB954] animate-playbar w-1/3" />
                </div>
              </div>
            </SpotifyBar>
          )
        );
      })()}

      {/* Daily Track Challenge */}
      <DailyTrackChallenge userProfile={userProfile} topTracks={topTracks} />

      {/* Social footer */}
      <div className="w-full mt-24 flex flex-col items-center z-10 relative">
        <p className="text-center text-xs italic text-gray-500 mb-2">Connect with me</p>
        <footer className="mb-8 flex justify-center gap-6 text-gray-500 text-xl">
          <a href="https://github.com/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="hover:text-[#1DB954]" />
          </a>
          <a href="https://youtube.com/nowbrowncow" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
            <Youtube className="hover:text-[#1DB954]" />
          </a>
          <a href="https://linkedin.com/in/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="hover:text-[#1DB954]" />
          </a>
          <a href="mailto:renysportfolio@gmail.com" aria-label="Email">
            <Mail className="hover:text-[#1DB954]" />
          </a>
          <a href="https://renaissancecodes.wordpress.com/" aria-label="Blog">
            <BookOpen className="hover:text-[#1DB954]" />
          </a>
        </footer>
      </div>
    </div>
  );
}

function getRandomTrackWithPreview(tracks: Track[] | undefined): Track | null {
  if (!tracks || tracks.length === 0) return null;
  // Filter only tracks with preview_url
  const available = tracks.filter((t) => !!t.preview_url);
  if (available.length === 0) return null;
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

function DailyTrackChallenge({
  userProfile,
  topTracks,
}: {
  userProfile: any;
  topTracks: Track[] | undefined;
}) {
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasPlayedToday, setHasPlayedToday] = useState<boolean>(false);
  const [showStreakUpdate, setShowStreakUpdate] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Only show if logged in and at least one preview_url exists
  const hasPreview = !!getRandomTrackWithPreview(topTracks);
  // Use userProfile.id for userId
  const userId = userProfile?.id;

  // On mount, check if user has played today
  useEffect(() => {
    async function checkPlayed() {
      if (!userId) return;
      try {
        const resp = await fetch(`/api/user-stats?userId=${encodeURIComponent(userId)}`);
        if (!resp.ok) return;
        const data = await resp.json();
        // lastPlayed is ISO date string (yyyy-mm-dd)
        const today = new Date().toISOString().split('T')[0];
        if (data.lastPlayed === today) setHasPlayedToday(true);
        else setHasPlayedToday(false);
      } catch {}
    }
    if (userId) checkPlayed();
  }, [userId]);

  if (!userProfile || !hasPreview) {
    return (
      <div className="z-10 mt-16 max-w-lg w-full p-6 bg-white/70 rounded-3xl shadow-xl text-center backdrop-blur-md border border-white/30">
        <h3 className="text-lg font-semibold text-pink-700 mb-2">🎵 Daily Track Challenge</h3>
        <p className="text-sm text-gray-700 mb-4">
          Can you name this top song from just 5 seconds?
        </p>
        <p className="text-xs text-gray-600 mt-3 italic">
          {userProfile
            ? "No audio preview available for your top tracks today."
            : <>Earn badges like <strong>Cloudwalker</strong> and <strong>Vibe Oracle</strong>!</>
          }
        </p>
      </div>
    );
  }

  // Start challenge: pick random track with preview, reset states
  const startChallenge = () => {
    const track = getRandomTrackWithPreview(topTracks);
    setCurrentTrack(track);
    setUserGuess("");
    setFeedback("");
    setChallengeStarted(true);
    setTimeout(() => {
      // Play audio when challenge starts
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 200);
  };

  // Call backend to update streak on correct answer
  async function updateStreak() {
    if (!userId) return;
    try {
      const resp = await fetch('/api/update-streak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (resp.ok) {
        setShowStreakUpdate(true);
        setHasPlayedToday(true);
      }
    } catch {}
  }

  const checkGuess = () => {
    if (!currentTrack) return;
    if (userGuess.trim().toLowerCase() === currentTrack.name.toLowerCase()) {
      setFeedback("🎉 Correct! You're a Vibe Oracle!");
      // Only update streak if not played today
      if (!hasPlayedToday) updateStreak();
    } else {
      setFeedback("❌ Not quite. Try again!");
    }
  };

  // Only play first 5 seconds
  const handleAudioTimeUpdate = () => {
    if (audioRef.current && audioRef.current.currentTime >= 5) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="z-10 mt-16 max-w-lg w-full p-6 bg-white/70 rounded-3xl shadow-xl text-center backdrop-blur-md border border-white/30">
      <h3 className="text-lg font-semibold text-pink-700 mb-2">🎵 Daily Track Challenge</h3>
      <p className="text-sm text-gray-700 mb-4">
        Can you name this top song from just 5 seconds?
      </p>
      {/* If already played today, prevent replay */}
      {hasPlayedToday && !challengeStarted ? (
        <div className="text-green-600 font-semibold my-3">
          You already played today's challenge! Come back tomorrow to keep your streak going.
        </div>
      ) : !challengeStarted ? (
        <button
          onClick={startChallenge}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-white px-6 py-2 rounded-full text-sm font-semibold shadow"
        >
          Play Challenge
        </button>
      ) : null}
      {challengeStarted && currentTrack && (
        <div>
          <audio
            ref={audioRef}
            src={currentTrack.preview_url ?? undefined}
            onTimeUpdate={handleAudioTimeUpdate}
            preload="auto"
          />
          <div className="mt-3">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Guess the song title"
              className="p-2 border border-gray-300 rounded w-full mt-3"
              onKeyDown={(e) => { if (e.key === "Enter") checkGuess(); }}
              disabled={hasPlayedToday}
            />
            <button
              onClick={checkGuess}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={hasPlayedToday}
            >
              Submit Guess
            </button>
            {feedback && (
              <div className="mt-3 text-base font-medium">
                {feedback}
                {/* Optionally show streak update message */}
                {feedback.startsWith("🎉") && showStreakUpdate && (
                  <div className="text-orange-500 text-sm mt-2">
                    🔥 Streak updated!
                  </div>
                )}
              </div>
            )}
            <button
              className="mt-3 text-xs underline text-pink-700"
              onClick={startChallenge}
              type="button"
              disabled={hasPlayedToday}
            >
              Try another track
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-600 mt-3 italic">
        Earn badges like <strong>Cloudwalker</strong> and <strong>Vibe Oracle</strong>!
      </p>
    </div>
  );
}