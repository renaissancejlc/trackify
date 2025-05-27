

import React from "react";

export default function MatchingGame() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-200 flex flex-col items-center justify-center text-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 drop-shadow mb-4">
        🧠 Matching Game
      </h1>
      <p className="text-purple-500 text-lg mb-6">
        A memory test powered by your top tracks and albums!
      </p>

      <div className="w-full max-w-2xl bg-white/50 backdrop-blur-md border border-purple-200 rounded-xl p-10 shadow-lg">
        <p className="text-gray-700 text-base">
          Game coming soon. Stay tuned for a fun way to match your favorite tracks and test your memory!
        </p>
      </div>
    </div>
  );
}