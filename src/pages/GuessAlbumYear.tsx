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
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const currentAlbum = albums[currentIndex];

  const handleGuessSubmit = () => {
    const guessedYear = parseInt(guess);
    if (!isNaN(guessedYear) && currentAlbum) {
      const correct = guessedYear === currentAlbum.releaseYear;
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
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-200 flex flex-col items-center justify-center text-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 drop-shadow mb-4">
        📅 Guess the Album Year
      </h1>
      <p className="text-purple-500 text-lg mb-6">
        Can you guess the release year of these iconic albums?
      </p>

      <div className="w-full max-w-2xl bg-white/50 backdrop-blur-md border border-purple-200 rounded-xl p-10 shadow-lg">
        {albums.length > 0 && currentIndex < albums.length ? (
          <>
            <div className="flex justify-center mb-4">
              <Polaroid image={currentAlbum.image} caption={currentAlbum.name} />
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
                className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700"
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
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
                >
                  Next Album
                </button>
              </>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl text-purple-700 font-semibold mb-4">
              🎉 Game Over!
            </p>
            <p className="text-lg text-gray-800 mb-2">
              Your score: {score} / {albums.length}
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
              }}
              className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}