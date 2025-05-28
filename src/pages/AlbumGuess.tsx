import { useState, useEffect, useMemo } from "react";

interface Album {
  title: string;
  artist?: string;
  image: string;
}

// This will be dynamically loaded from user data
// const albums: Album[] = [];

export default function AlbumGuess() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ title: string; image: string; artist?: string; result: "correct" | "wrong" }[]>([]);
  const [useArtistMode, setUseArtistMode] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("spotify_access_token");
        if (!accessToken) {
          setAuthError(true);
          return;
        }
        const endpoint = useArtistMode ? "/.netlify/functions/top-artists" : "/.netlify/functions/top-albums";
        const response = await fetch(`${endpoint}?limit=50`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        const parsedItems = data.items.map((item: any) => {
          if (useArtistMode) {
            return {
              title: item.name || "Unknown Artist",
              artist: item.name || "Unknown Artist",
              image: item.image || "",
            };
          } else {
            return {
              title: item.name || "Unknown Album",
              artist: item.artists?.[0]?.name || "Unknown Artist",
              image: item.image || "",
            };
          }
        });
        setAlbums(parsedItems.sort(() => Math.random() - 0.5));
        if (parsedItems.length === 0) {
          console.warn("No items returned from Spotify.");
        }
      } catch (error) {
        setAuthError(true);
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [useArtistMode]);

  const currentAlbum = albums[index] || { title: "", image: "", artist: "" };

  useEffect(() => {
    if (!gameStarted || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  const handleGuess = () => {
    if (!guess.trim()) return;
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = useArtistMode
      ? (currentAlbum.artist?.toLowerCase() || "")
      : currentAlbum.title.toLowerCase();

    if (normalizedGuess === normalizedTitle) {
      setResult("correct");
      setScore((prev) => prev + 1);
      setHistory((prev) => [...prev, { ...currentAlbum, result: "correct" }]);
    } else {
      setResult("wrong");
      setHistory((prev) => [...prev, { ...currentAlbum, result: "wrong" }]);
    }
  };

  const handleNext = () => {
    setResult(null);
    setGuess("");
    setIndex((prev) => (prev + 1) % albums.length);
  };

  // Memoize splatter positions so they remain fixed in position and gently float without re-randomizing every render
  const splatterPositions = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        color: ["#f472b6", "#fcd34d", "#c4b5fd", "#fca5a5", "#f9a8d4"][i % 5],
        delay: `${i * 2}s`,
        scale: Math.random() * 0.6 + 0.7,
        rotate: `${Math.random() * 360}deg`,
      })),
    []
  );

  if (!albums.length) {
    return (
      <div className="font-spotify">
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden px-4">
          {/* <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-10 z-0" /> */}
          {/* <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-10 z-0" /> */}
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-bold text-black drop-shadow mb-4">
              Loading your top albums...
            </h1>
            <div className="flex justify-center mt-8">
              <div className="w-20 h-20 border-8 border-dashed border-black rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-spotify">
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden px-4">
      {/* Dripping vertical time bar */}
      {/* {gameStarted && timer > 0 && (
        <div className="absolute right-4 top-8 h-[80vh] w-3 bg-white/30 rounded-full border border-white/60 overflow-hidden z-20">
          <div
            className="bg-pink-500 w-full transition-all duration-100"
            style={{ height: `${(timer / 60) * 100}%` }}
          />
        </div>
      )} */}
      {/* Paint splatter accents */}
      {/* <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-10 z-0" /> */}
      {/* <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-10 z-0" /> */}
      {/* Timed animated splatters */}
      {/* {splatterPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-12 h-12 rounded-full opacity-60 blur-sm animate-splat pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            backgroundColor: pos.color,
            animationDelay: pos.delay,
            transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
          }}
        />
      ))} */}
      <div className="relative z-10 text-center">
        {!gameStarted && (timer === 60 || timer === 0) ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-black drop-shadow">
              🎨 Guess That {useArtistMode ? "Artist" : "Album"}
            </h1>
            <p className="text-black mb-4">Can you name the album based on its blurred cover?</p>
            {authError && (
              <p className="text-black font-semibold mb-2">
                Please log in with Spotify to play the game.
              </p>
            )}
            <button
              onClick={() => {
                if (authError) return;
                setGameStarted(true);
              }}
              className="px-6 py-3 bg-black hover:bg-black text-white font-bold rounded-full"
            >
              Start Game
            </button>
          </>
        ) : timer > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-black mb-2">Time Left: {timer}s</h2>
            <h3 className="text-lg mb-4 text-black">Score: {score}</h3>
            {/* Paint bucket score meter */}
            <div className="relative w-12 h-24 mx-auto mb-6">
              <div className="absolute bottom-0 w-full bg-black transition-all duration-300 rounded-b-md"
                style={{ height: `${Math.min(score * 10, 100)}%` }} />
              <div className="absolute inset-0 border-4 border-black rounded-b-xl bg-white/40 backdrop-blur-sm" />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black">
                {score} 🎨
              </div>
            </div>
            <p className="text-sm text-black mb-2">
              You’re on Album {index + 1} of {albums.length}
            </p>
            <div className="mb-4">
              <div className="p-2 border-8 border-black rounded-xl shadow-lg bg-white/60 backdrop-blur-sm w-fit mx-auto">
                <img
                  src={currentAlbum.image}
                  alt="Blurred Album"
                  className={`w-60 h-60 object-cover rounded-md shadow ${result === null ? "blur-md" : ""}`}
                />
              </div>
            </div>

            {result === null ? (
              <>
                <div className="relative w-64 mx-auto mb-2">
                  <input
                    placeholder="Your guess..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white text-black w-full border border-black shadow-sm mb-0"
                  />
                  <ul className="absolute z-30 bg-white w-full border border-black shadow-lg max-h-40 overflow-y-auto rounded-b-lg">
                    {albums
                      .filter((album) =>
                        (useArtistMode ? album.artist || "" : album.title)
                          .toLowerCase()
                          .includes(guess.toLowerCase())
                      )
                      .map((album, idx) => (
                        <li
                          key={idx}
                          onClick={() =>
                            setGuess(useArtistMode ? album.artist || "" : album.title)
                          }
                          className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-sm text-black"
                        >
                          {useArtistMode ? album.artist : album.title}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <button
                    onClick={handleGuess}
                    className="px-6 py-2 bg-black hover:bg-black rounded-full text-white font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <p className={`text-lg font-bold ${result === "correct" ? "text-black" : "text-black"}`}>
                  {result === "correct"
                    ? "Correct!"
                    : useArtistMode
                    ? `Oops! That artist was "${currentAlbum.artist}".`
                    : `Oops! That was "${currentAlbum.title}".`}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-3 px-6 py-2 bg-black hover:bg-black rounded-full text-white font-semibold"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-black mb-4">⏰ Time's Up!</h2>
            <p className="text-xl text-black mb-2">You scored {score} points!</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {history.map((album, i) => (
                <div key={i} className="relative border-4 rounded-lg overflow-hidden shadow-lg" style={{ borderColor: album.result === "correct" ? "#10B981" : "#EF4444" }}>
                  <img src={album.image} alt={album.title} className="w-full h-40 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/80 text-center text-xs font-medium text-black py-1">
                    {useArtistMode ? album.artist : album.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => {
                  setGameStarted(false);
                  setTimer(60);
                  setScore(0);
                  setIndex(0);
                  setResult(null);
                  setGuess("");
                  setHistory([]);
                  setUseArtistMode(false);
                  setAlbums([]); // trigger re-fetch
                }}
                className="px-6 py-2 bg-black hover:bg-black text-white font-semibold rounded-full"
              >
                Play Again in Album Mode
              </button>
              <button
                onClick={() => {
                  setGameStarted(false);
                  setTimer(60);
                  setScore(0);
                  setIndex(0);
                  setResult(null);
                  setGuess("");
                  setHistory([]);
                  setUseArtistMode(true);
                  setAlbums([]); // trigger re-fetch
                }}
                className="px-6 py-2 bg-black hover:bg-black text-white font-semibold rounded-full"
              >
                Play Again in Artist Mode
              </button>
            </div>
          </>
        )}
      </div>

      {/* "Easter egg" Artist/Album mode button, bottom-right */}
      {!gameStarted && (
        <button
          onClick={() => setUseArtistMode(!useArtistMode)}
          className="fixed bottom-2 right-2 px-2 py-1 bg-white hover:bg-black text-black hover:text-white rounded text-[10px] shadow-sm opacity-40 hover:opacity-90 transition-all z-50"
        >
          {useArtistMode ? "Album Mode" : "Too hard? Try Artist Mode"}
        </button>
      )}
      {/* Art Character Guide */}
      {/* 
      <div className="absolute bottom-8 left-6 z-20 animate-bounce-soft text-[2.75rem] select-none flex flex-col items-center space-y-2">
        <div className="drop-shadow text-white leading-none flex flex-col items-center">
          🧑‍🎨
          <div className="-mt-2 text-sm">＊◕‿◕＊</div>
        </div>
        <div className="relative px-4 py-2 bg-white/80 text-pink-800 backdrop-blur-lg rounded-2xl shadow-lg text-xs max-w-[180px] text-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
          {timer === 60 && !gameStarted && "Guess the album by its vibe and blur. Let your art brain lead the way!"}
          {gameStarted && result === null && timer > 0 && "Think fast — you've got this!"}
          {gameStarted && result === "correct" && "🎉 Brilliant stroke!"}
          {gameStarted && result === "wrong" && "🎨 Oops, off the canvas…"}
          {timer === 0 && "🖼 Let’s frame your final score!"}
        </div>
      </div>
      */}
      {/* Removed custom style block for minimalist look */}
      </div>
    </div>
  );
}
