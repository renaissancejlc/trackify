import React from 'react';

type ThisIsCardProps = {
  artist: string;
  imageUrl: string;
};

const ThisIsCard: React.FC<ThisIsCardProps> = ({ artist, imageUrl }) => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg group hover:scale-[1.02] transition duration-300">
      <div className="aspect-square bg-gradient-to-br from-black to-gray-900 p-4 relative flex flex-col justify-end">
        <img
          src={imageUrl}
          alt={`This Is ${artist}`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10">
          <p className="text-xs text-gray-300 font-medium mb-1">This Is</p>
          <h3 className="text-xl sm:text-2xl font-bold text-white">{artist}</h3>
        </div>
      </div>
    </div>
  );
};

export default ThisIsCard;