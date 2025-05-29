import { motion } from 'framer-motion';
import { BookOpen, FileText, Github, Linkedin, Music2, Youtube, Globe, HeartHandshake } from 'lucide-react';
import { Mail } from 'lucide-react';
import CloudBackground from '../components/CloudBackground';
import TerminalFrame from '../components/TerminalFrame';
import NowPlayingCard from '../components/NowPlayingCard';
import ThisIsCard from '../components/ThisIsCard';
import ThisIsMePlaylistCard from '../components/ThisIsMePlaylistCard';

const AboutMe = () => {
  // Blinking cursor style for terminal prompt
  // Inserted above the return statement
  return (
    <>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
      <div className="relative w-full overflow-x-hidden pt-2 sm:pt-6 md:pt-10 lg:pt-12 xl:pt-16 pb-12 px-4 sm:px-6 md:px-10 max-w-full mx-auto text-white font-sans z-10">
        <CloudBackground />
        <TerminalFrame title="> whoami.sh">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25, duration: 0.8 }}
    viewport={{ once: true }}
    className="mb-12 max-w-xl mx-auto z-20 relative"
  >
    <ThisIsMePlaylistCard />
  </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }}
  viewport={{ once: true }}
  className="mb-10 grid sm:grid-cols-2 gap-4 max-w-md mx-auto"
>
  {[
    {
      label: 'support me',
      url: 'https://www.buymeacoffee.com/renaissancecarr',
      icon: <HeartHandshake className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition" />,
    },
    {
      label: 'Portfolio',
      url: 'https://renaissancecarr.com',
      icon: <Globe className="w-4 h-4 text-pink-300 group-hover:scale-110 transition" />,
    },
  ].map((link) => (
    <a
      key={link.label}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-3 bg-gradient-to-br from-[#1DB954]/10 to-[#1C1F26]/90 border border-green-500/10 backdrop-blur-md p-4 rounded-lg shadow-lg hover:shadow-green-500/10 transition group"
    >
      <span className="absolute -inset-1 rounded-md bg-green-500/20 blur-md opacity-60 group-hover:blur-lg group-hover:opacity-90 transition-all" />
      <span className="absolute inset-0 rounded-md ring-2 ring-green-500/30 group-hover:ring-4 group-hover:ring-green-400/50 transition-all" />
      {link.icon}
      <code className="text-green-400 text-sm group-hover:text-white">
        {'> ' + link.label.toLowerCase()}
      </code>
    </a>
  ))}
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.9 }}
  viewport={{ once: true }}
  className="mt-20 bg-[#1C1F26]/80 border border-white/10 rounded-xl p-6 font-mono text-sm text-green-300 shadow-md"
>
  <p className="text-slate-400 font-mono text-xs mb-2">// current build diagnostics</p>
  <p className="text-green-400 mb-2">{'> bash ~/trackify/sys_info.sh'}</p>
  <pre className="whitespace-pre-wrap text-green-300 mb-6">
{`HOSTNAME:    spotify-fun.zone
OS:          React 18 (Vite)
KERNEL:      TypeScript + Tailwind CSS
UPTIME:      1 month (actively evolving)
CPU:         Spotify API + Custom Logic
GRAPHICS:    Framer Motion + Themed UI
TERMINAL:    Creative CLI Inspired Design
INTERFACE:   Cloud-Themed Aesthetic + Game Zones`}
  </pre>

  <p className="text-slate-400 font-mono text-xs mb-2">// commit history</p>
  <p className="text-green-400 mb-2">{'> git log --pretty=creative'}</p>
  <div
    dangerouslySetInnerHTML={{
      __html: `commit 6e2af01 (main)<br/>
Author: Reny &lt;renysportfolio@gmail.com&gt;<br/>
Date:   2024-05-01<br/><br/>
    <span class="inline-flex items-center gap-1 text-green-300">✨ Initialized Trackify Universe</span><br/><br/>
commit c1b57f9 (feature/album-guess)<br/>
Author: Reny &lt;renysportfolio@gmail.com&gt;<br/>
Date:   2024-05-07<br/><br/>
    <span class="inline-flex items-center gap-1 text-green-300">🎨 Added blurry album guessing game</span><br/><br/>
commit b42ec88 (feature/spirit-animal)<br/>
Author: Reny &lt;renysportfolio@gmail.com&gt;<br/>
Date:   2024-05-12<br/><br/>
    <span class="inline-flex items-center gap-1 text-green-300">🦊 Launched spirit animal selector</span><br/><br/>
commit a92dd55 (feature/tarot)<br/>
Author: Reny &lt;renysportfolio@gmail.com&gt;<br/>
Date:   2024-05-15<br/><br/>
    <span class="inline-flex items-center gap-1 text-green-300">🔮 Summoned tarot reading parlor</span><br/><br/>
    “Built with intention, styled with wonder.”`
    }}
  />
  <p className="text-green-400 mt-4 mb-2">{'> cd ..'}</p>
  <p className="text-green-400 mt-4 mb-2 font-mono text-sm">
    {'> ~ $'}<span className="animate-blink">_</span>
  </p>
</motion.div>
        </TerminalFrame>
        <div className="mt-20">
          {/* <TerminalAnalytics /> */}
        </div>

        {/* Social footer */}
        <div className="w-full mt-24 flex flex-col items-center z-10 relative">
          <p className="text-center text-xs italic text-gray-400 mb-2">Connect with me</p>
          <footer className="mb-8 flex justify-center gap-6 text-gray-400 text-xl">
            <a href="https://github.com/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="hover:text-teal-300 transition-colors duration-300" />
            </a>
            <a href="https://youtube.com/nowbrowncow" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <Youtube className="hover:text-teal-300 transition-colors duration-300" />
            </a>
            <a href="https://linkedin.com/in/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="hover:text-teal-300 transition-colors duration-300" />
            </a>
            <a href="mailto:renysportfolio@gmail.com" aria-label="Email">
              <Mail className="hover:text-teal-300 transition-colors duration-300" />
            </a>
            <a href="https://renaissancecodes.wordpress.com/" aria-label="Blog">
              <BookOpen className="hover:text-teal-300 transition-colors duration-300" />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutMe;