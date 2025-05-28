import React, { useState, useEffect } from "react";
import Polaroid from "../components/Polaroid";

interface Album {
  name: string;
  image: string;
  releaseYear: number;
}

export default function GuessAlbumYearGame() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const accessToken = localStorage.getItem("spotify_access_token");
      if (!accessToken) return;

      try {
        const response = await fetch("/.netlify/functions/top-albums?limit=50", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();

        const parsedAlbums = data.items.map((item: any) => {
          const year = item.release_date?.split("-")[0];
          return {
            name: item.name || "Unknown Album",
            image: item.image || item.images?.[0]?.url || "",
            releaseYear: year ? parseInt(year) : null,
          };
        }).filter((album: Album) => album.releaseYear !== null);

        setAlbums(parsedAlbums);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setIsCorrect(null);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleGuessSubmit = () => {
    const guessedYear = parseInt(guess);
    if (!isNaN(guessedYear) && albums[currentIndex]) {
      const correct = guessedYear === albums[currentIndex].releaseYear;
      setIsCorrect(correct);
      if (correct) {
        setScore(score + 1);
      }
      setShowResult(true);
    }
  };

  const nextAlbum = () => {
    setGuess("");
    setIsCorrect(null);
    setShowResult(false);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="min-h-screen w-full bg-[url('/images/retro-wallpaper.jpg')] bg-cover bg-fixed flex flex-col items-center justify-center text-center px-4 py-10 font-serif text-gray-900">
      <h1 className="text-5xl font-black text-yellow-400 drop-shadow-lg tracking-widest mb-2">
        🎶 Vintage Vinyl Year Guess
      </h1>
      <p className="text-orange-100 text-xl italic mb-6">
        Dig through the crates and guess the year these albums dropped!
      </p>

      <div className="w-full max-w-2xl bg-[#fdf6e3]/90 border-4 border-dashed border-yellow-300 rounded-xl p-10 shadow-2xl backdrop-blur-sm">
        {albums.length > 0 && currentIndex < albums.length ? (
          <>
            {(() => {
              const currentAlbum = albums[currentIndex];
              return (
                <>
                  <div className="flex justify-center mb-4">
                    <Polaroid image={currentAlbum.image} caption={currentAlbum.name} captionStyle="macondo-swash-caps-regular text-xl text-purple-900" />
                  </div>
                  <input
                    type="number"
                    placeholder="Enter year"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="px-4 py-2 border rounded-md text-center mb-4"
                    readOnly={showResult}
                  />
                  {!showResult ? (
                    <button
                      onClick={handleGuessSubmit}
                      className="bg-red-700 text-white font-bold px-6 py-2 rounded shadow-lg hover:bg-red-800 tracking-wider"
                    >
                      Submit Guess
                    </button>
                  ) : (
                    <>
                      <p className="mt-4 text-lg font-medium text-gray-700">
                        {isCorrect
                          ? "✅ Correct!"
                          : `❌ Incorrect. The album was released in ${currentAlbum.releaseYear}.`}
                      </p>
                      <button
                        onClick={nextAlbum}
                        className="mt-4 bg-green-700 text-white font-bold px-6 py-2 rounded shadow-lg hover:bg-green-800 tracking-wider"
                      >
                        Next Album
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </>
        ) : (
          <div className="text-center">
            <p className="text-3xl text-red-700 font-black mb-2 drop-shadow">
              🎉 Game Over!
            </p>
            <p className="text-lg text-gray-800 italic mb-2">
              Your score: {score} / {albums.length}
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setShowResult(false);
                setIsCorrect(null);
              }}
              className="bg-green-700 text-white font-bold px-6 py-2 rounded shadow-lg hover:bg-green-800 tracking-wider"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}