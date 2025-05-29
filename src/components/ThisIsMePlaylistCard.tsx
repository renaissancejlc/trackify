import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const PlaylistTrack = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <div className="flex items-center gap-4 p-4 border-b border-white/10">
    <div className="w-10 h-10 flex items-center justify-center bg-green-400/10 rounded-md">
      {icon || <Play className="w-4 h-4 text-green-300" />}
    </div>
    <p className="text-sm text-slate-200 font-mono">{title}</p>
  </div>
);

const ThisIsMePlaylistCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#1C1F26]/80 border border-white/10 backdrop-blur rounded-xl shadow-xl overflow-hidden max-w-xl mx-auto mb-12"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-green-400/10 to-green-300/5 border-b border-white/10">
        <h3 className="text-lg text-green-300 font-semibold font-sans">This Is The Developer</h3>
        <p className="text-xs text-slate-400">The background, in three tracks 🎶</p>
      </div>

      <PlaylistTrack title="This web app was an independent personal project — a creative playground to explore music data, aesthetic design, and interactive fun with the Spotify API." />
      <PlaylistTrack title="It's powered by modern web tech: React (Vite), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons and hours on the computer." />
      <PlaylistTrack title="If you enjoyed the experience, your support means the world. I'd love to keep building thoughtful projects like this." />
    </motion.div>
  );
};

export default ThisIsMePlaylistCard;