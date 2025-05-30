import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const SpotifyBar = ({
  trackTitle = 'Track Title',
  artist = 'Artist Name',
  isPlaying = true,
  children,
}: {
  trackTitle?: string;
  artist?: string;
  isPlaying?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-[#181818] border border-[#282828] rounded-xl shadow-lg backdrop-blur-md overflow-hidden p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-700 rounded shadow-inner flex items-center justify-center text-white text-xs font-bold">
            ♫
          </div>
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
      </div>

      {children && (
        <div className="mt-4 p-4 bg-[#121212] rounded-lg text-sm text-gray-300 font-mono">
          {children}
        </div>
      )}
    </div>
  );
};

export default SpotifyBar;