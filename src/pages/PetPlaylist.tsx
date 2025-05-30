import React, { useState } from 'react';
import PetBackground from '../components/PetBackground';
const questions = [
  {
    question: 'What kind of pet do you have?',
    options: ['Dog', 'Cat', 'Bird', 'Other'],
  },
  {
    question: 'How would you describe your pet’s energy?',
    options: ['High Energy', 'Laid-back', 'Curious', 'Chaotic'],
  },
  {
    question: 'Your pet’s favorite activity?',
    options: ['Running around', 'Sleeping', 'Watching out the window', 'Making noise'],
  },
  {
    question: 'If your pet could talk, their voice would be...',
    options: ['Sassy', 'Deep and calm', 'Fast and high-pitched', 'Mysterious'],
  },
  {
    question: 'What’s your pet’s favorite time of day?',
    options: ['Morning', 'Afternoon', 'Evening', 'Night'],
  },
  {
    question: 'Which music genre does your pet vibe to?',
    options: ['Pop', 'Rock', 'Classical', 'Jazz'],
  },
  {
    question: 'How does your pet react to new sounds?',
    options: ['Curious', 'Startled', 'Indifferent', 'Excited'],
  },
  {
    question: 'Your pet’s favorite place?',
    options: ['Outside', 'On the couch', 'By the window', 'In their bed'],
  },
  {
    question: 'What’s your pet’s personality like?',
    options: ['Playful', 'Calm', 'Adventurous', 'Shy'],
  },
  {
    question: 'Your pet’s ideal weekend activity?',
    options: ['Going for a walk', 'Napping', 'Exploring', 'Cuddling'],
  },
];
const PetPlaylist = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
    const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      createPlaylist(updatedAnswers);
    }
  };

  const createPlaylist = async (quizAnswers: string[]) => {
    // TODO: Customize playlist creation logic based on quizAnswers and Spotify API
    const dummyImage = 'https://via.placeholder.com/300x300.png?text=Pet+Oracle+Vibes';
    const dummyPlaylistUrl = 'https://open.spotify.com/playlist/dummy';

    setImageUrl(dummyImage);
    setPlaylistUrl(dummyPlaylistUrl);
    setPlaylistCreated(true);
  };

  return (
    <div className="min-h-screen text-white p-8 relative">
     <div className="bg-yellow-300 text-black text-center py-2 font-semibold rounded mb-4 shadow-md">
        🚧 This page is a work in progress — more paw-some features coming soon! 🛠️
    </div>
      <PetBackground />
      {!playlistCreated ? (
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg">Pet Oracle Playlist</h1>
          <p className="text-lg mb-8 text-gray-300">An expertly curated mix inspired by your pet’s unique personality.</p>
          <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <p className="text-xl font-medium text-white mb-4">{questions[step].question}</p>
            <div className="grid grid-cols-2 gap-4">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold rounded-lg py-2 px-3 hover:from-green-400 hover:to-green-500 transition shadow-md"
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Your Pet's Custom Playlist Awaits</h2>
          <img src={imageUrl} alt="Pet Playlist Cover" className="rounded-xl w-full mb-4" />
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:from-purple-500 hover:to-indigo-500 transition"
          >
            Listen on Spotify
          </a>
        </div>
      )}
      {/* Pet Oracle Guide Character */}
      <div className="fixed bottom-6 left-6 z-50 max-w-[150px] sm:max-w-[180px] md:max-w-[220px] pointer-events-none">
        <div className="animate-bounce-soft text-[3rem] select-none flex flex-col items-center space-y-2">
          <div className="drop-shadow text-white leading-none flex flex-col items-center">
            <div className="text-[2.75rem] animate-slow-float">🐶</div>
            <div className="-mt-3 text-sm text-yellow-200">｡＾･ｪ･＾｡</div>
          </div>
          <div className="relative px-4 py-2 bg-gradient-to-br from-white/80 to-white/60 text-purple-900 font-medium backdrop-blur-md rounded-2xl shadow-xl text-xs max-w-[200px] text-center">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/80" />
            {playlistCreated
              ? "Woof! Playlist created. Press play and unleash the vibes."
              : "Answer a few fun questions and I’ll craft the perfect mix!"}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-soft {
          animation: bounceSoft 4s ease-in-out infinite;
        }
        @keyframes slowFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-slow-float {
          animation: slowFloat 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PetPlaylist;