import { motion } from 'framer-motion';
import { BookOpen, FileText, Github, Linkedin, Music2, Youtube, Globe, HeartHandshake } from 'lucide-react';
import CloudBackground from '../components/CloudBackground';
import TerminalFrame from '../components/TerminalFrame';

const AboutMe = () => {
return (
<div className="relative w-full overflow-x-hidden pt-2 sm:pt-6 md:pt-10 lg:pt-12 xl:pt-16 pb-12 px-4 sm:px-6 md:px-10 max-w-full mx-auto text-white font-sans z-10">
  <CloudBackground />
          <TerminalFrame title="> whoami.sh">
<pre className="text-green-400 font-mono text-xs leading-tight whitespace-pre overflow-x-auto text-center mb-6">{`
███████╗██████╗ ███████╗ ██████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
███████╗██████╔╝█████╗  ██║     ███████╗
╚════██║██╔═══╝ ██╔══╝  ██║     ╚════██║
███████║██║     ███████╗╚██████╗███████║
╚══════╝╚═╝     ╚══════╝ ╚═════╝╚══════
`}
        </pre>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto text-center"
        >
          Initializing identity module… Here's a bit about the human behind the terminal.
        </motion.p>

        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }}
  viewport={{ once: true }}
  className="mb-10 grid sm:grid-cols-2 gap-4 max-w-md mx-auto"
>
  {[
    {
      label: 'Donate',
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
      className="flex items-center gap-2 bg-[#1C1F26]/80 border border-white/10 backdrop-blur p-3 rounded-md shadow-md hover:bg-white/5 transition group"
    >
      {link.icon}
      <code className="text-green-400 text-sm group-hover:text-white">
        {'> ' + link.label.toLowerCase()}
      </code>
    </a>
  ))}
</motion.div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.8 }}
  viewport={{ once: true }}
  className="text-slate-300 text-base max-w-2xl mx-auto text-center space-y-6 mb-12"
>
  <p>
    This web app was a passion project — a creative playground to explore music data, aesthetic design, and interactive fun with the Spotify API. 
    Every animation and interface choice was crafted with intention xand joy.
  </p>
  <p>
    It's powered by modern web tech: React (Vite), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, and some good old-fashioned imagination. 
    It’s hosted on Netlify and fueled by creativity.
  </p>
  <p>
    If you enjoyed the experience and would like to support future builds like this, your encouragement or a small donation would mean the world.
    I’d love to keep building beautiful, thoughtful projects like this.
  </p>
</motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-slate-300 text-base max-w-xl mx-auto text-center mb-6"
        >
          Connect with me:
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-w-5xl mx-auto"
        >
          {[
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/renaissancejlc/', icon: <Linkedin className="w-4 h-4 text-green-300 group-hover:scale-110 transition" /> },
            { label: 'GitHub', url: 'https://github.com/renaissancejlc', icon: <Github className="w-4 h-4 text-green-300 group-hover:scale-110 transition" /> },
            { label: 'Blog', url: 'https://renaissancecodes.wordpress.com/', icon: <BookOpen className="w-4 h-4 text-green-300 group-hover:scale-110 transition" /> },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1C1F26]/80 border border-white/10 backdrop-blur p-3 rounded-md shadow-md hover:bg-white/5 transition group"
            >
              {link.icon}
              <code className="text-green-400 text-sm group-hover:text-white">
                {'> ' + link.label.toLowerCase().replace(/\s+/g, '')}
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
    <span className="text-green-400 font-mono text-sm">
      {'> ~ $'}<span className="animate-blink">|</span>
    </span>
  </p>
</motion.div>
      </TerminalFrame>

      <div className="mt-20">
        {/* <TerminalAnalytics /> */}
      </div>
    </div>
  );
};

export default AboutMe;