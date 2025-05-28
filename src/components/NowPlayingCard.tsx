

import React from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

interface NowPlayingCardProps {
  title: string;
  artist: string;
  albumArt: string;
}

const NowPlayingCard: React.FC<NowPlayingCardProps> = ({ title, artist, albumArt }) => {
  return (
    <motion.div
      className="relative w-72 h-80 bg-white/5 border border-green-500/30 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center justify-between transition hover:shadow-green-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative Spotify bar + tooltip */}
      <div className="absolute top-2 left-2 text-xs text-green-400 italic font-mono">
        🎧 Now spinning…
      </div>

      {/* Album Art */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        className="w-40 h-40 rounded-lg overflow-hidden shadow-md"
      >
        <img
          src={albumArt}
          alt={`${title} cover`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Track Info */}
      <div className="text-center mt-4">
        <p className="text-white text-lg font-semibold">{title}</p>
        <p className="text-green-400 text-sm mt-1">{artist}</p>
      </div>

      {/* Simulated visualizer bar */}
      <div className="w-full mt-6 flex justify-center items-end gap-1 h-8">
        {[5, 10, 7, 12, 8].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-green-400 rounded-sm"
            initial={{ height: `${h}px` }}
            animate={{ height: [`${h}px`, '20px', `${h}px`] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NowPlayingCard;