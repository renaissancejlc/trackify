

import React from 'react';

interface ThisIsProps {
  artistName: string;
  imageUrl: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const ThisIs: React.FC<ThisIsProps> = ({
  artistName,
  imageUrl,
  gradientFrom = '#1DB954', // Spotify green
  gradientTo = '#121212',   // dark theme
}) => {
  return (
    <div
      className="w-64 h-64 rounded-lg overflow-hidden relative shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <img
        src={imageUrl}
        alt={artistName}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
        <p className="text-xs text-white font-medium uppercase tracking-widest opacity-70">
          This Is
        </p>
        <h2 className="text-2xl sm:text-3xl text-white font-extrabold drop-shadow">
          {artistName}
        </h2>
      </div>
    </div>
  );
};

export default ThisIs;