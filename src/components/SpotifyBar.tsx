


import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const SpotifyPlayBarFrame = ({
  trackTitle = 'Track Title',
  artist = 'Artist Name',
  albumArtUrl,
  isPlaying = true,
  children,
}: {
  trackTitle?: string;
  artist?: string;
  albumArtUrl?: string;
  isPlaying?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-[#181818] border border-[#282828] rounded-full shadow-lg backdrop-blur-md overflow-hidden px-6 py-4 mb-8 w-full max-w-5xl mx-auto flex items-center justify-between space-x-6">
      {/* Playback Row */}
      <div className="flex items-center space-x-4">
        <img src={albumArtUrl || "/default-album.png"} alt="Album Art" className="w-14 h-14 rounded object-cover" />
        <div>
          <p className="text-white text-sm font-semibold">{trackTitle}</p>
          <p className="text-gray-400 text-xs">{artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-white">
        <SkipBack className="w-4 h-4 cursor-pointer" />
        {isPlaying ? (
          <Pause className="w-6 h-6 cursor-pointer" />
        ) : (
          <Play className="w-6 h-6 cursor-pointer" />
        )}
        <SkipForward className="w-4 h-4 cursor-pointer" />
      </div>
      <div className="flex items-center space-x-2 text-white">
        <Volume2 className="w-4 h-4" />
        <div className="w-24 h-1 bg-gray-600 rounded">
          <div className="h-1 bg-green-500 rounded w-1/2"></div>
        </div>
      </div>

      {/* Children content */}
      {children && (
        <div className="mt-4 p-4 bg-[#121212] rounded-lg text-sm text-gray-300 font-mono">
          {children}
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayBarFrame;