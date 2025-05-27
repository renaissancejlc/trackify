import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "https://accounts.spotify.com/authorize";
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-pink-100 via-white to-blue-100 px-4">
      {/* Animated pink clouds background */}
      <div className="absolute inset-0 z-0 animate-clouds bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] opacity-20 bg-repeat" />

      {/* Floating music notes */}
      <div className="absolute z-0 animate-float text-pink-300 text-3xl opacity-40 select-none">
        🎵 🎶 🎧 🎼
      </div>

      {/* Cloud Companion */}
      <div className="absolute top-[15%] right-[6%] z-20 animate-bounce-soft text-[3rem] select-none flex flex-col items-center space-y-2">
        <div className="animate-wiggle drop-shadow text-white leading-none flex flex-col items-center">
          <div className="text-[2.75rem]">☁️</div>
          <div className="-mt-3 text-sm">^‿^</div>
        </div>
        <div className="relative px-4 py-2 bg-white/80 text-pink-700 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[160px]">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
          ✨ Ready to float through your favorite songs?
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
        <button
          onClick={handleLogin}
          className="bg-[#1DB954] hover:bg-[#1ed760] transition text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Log in with Spotify
        </button>
      </div>

      {/* Feature previews */}
      <div className="z-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl">
        {/* Card 1 */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 via-white to-purple-200 flex items-center justify-center text-3xl shadow-inner border-2 border-white/60">
              🎬
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Create Movie Posters</h3>
          <p className="text-sm text-gray-600 text-center">Turn your top songs into cinematic posters.</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 via-white to-pink-200 flex items-center justify-center text-3xl shadow-inner border-2 border-white/60">
              🦊
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Meet Your Spirit Animal</h3>
          <p className="text-sm text-gray-600 text-center">Let your music taste reveal your true energy.</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-7 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center space-y-3 border border-white/30">
          <div className="relative flex items-center justify-center mb-2">
            <span className="glow-ring absolute w-20 h-20 rounded-full" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 via-white to-blue-200 flex items-center justify-center text-3xl shadow-inner border-2 border-white/60">
              🔮
            </div>
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Get a Tarot Reading</h3>
          <p className="text-sm text-gray-600 text-center">Let your albums tell your past, present, and future.</p>
        </div>
      </div>

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
        `}
      </style>
    </div>
  );
}