import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const responses: { [key: string]: string } = {
  help: `🧠 Try asking things like:
- what projects use AWS?
- show me Java experience
- what certifications do you have?
- contact info / linkedin / github
- show education or gpa
- tell me about past jobs`,

  certifications: '📜 Certifications: AWS Cloud Practitioner, AWS Developer Associate, Terraform Associate, AWS SysOps (in progress), AWS Solutions Architect (in progress), TOGAF (future)',
  projects: '📦 AWS used in: Real Estate Monitoring App (React, Tailwind, DynamoDB, Lambda, Amplify)',
  aws: '☁️ AWS used for Lambda, DynamoDB, hosting, and authentication via Amplify',
  java: '☕ Java used to build microservices with Spring Boot, JBoss, and enterprise systems at Mitchell | Enlyte and Northwestern Mutual.',
  experience: '💼 Work experience includes Mitchell | Enlyte (2024–present), Northwestern Mutual (2022–2024), and more.',
  education: '🎓 UC San Diego — B.S. Computer Science (2022), Grossmont College — A.S.-T CS & Math (2020)',
  gpa: '📈 GPA: 3.89 cumulative across both universities',
  contact: '📬 Email: renysportfolio@gmail.com — or use the contact form!',
  linkedin: '🔗 LinkedIn: https://linkedin.com/in/renaissancecarr',
  github: '💻 GitHub: https://github.com/renaissancecarr',
  youtube: '📺 YouTube channel launching soon for dev vlogs & tutorials!',
  email: '📬 Email: renysportfolio@gmail.com',
  phone: '📞 Phone number not publicly listed — try email or LinkedIn!',
  resume: '📄 You can download the resume on the Contact page — or type "contact" to get the form link.',
' hi ': '👋 Hello there!',
  hello: '🌟 Hey! How can I help you today?',
  hey: '👋 Hey! Type "help" to see what I can do.',
  // yo: '😎 What’s up?',
  who: '🧠 I’m a terminal-style assistant trained to represent Renaissance Carr.',
  'who are you': '🤖 I’m Renaissance’s AI assistant — here to guide you around the portfolio.',
  name: '👩‍💻 My creator is Renaissance Carr — a cloud-native software engineer.',
  mission: '🚀 My mission: to help people experience clean, thoughtful, scalable tech.',
  values: '💡 Renaissance values clarity, creativity, and continuous learning.',
  fun: '🎮 Outside of code: music, espresso, YouTube deep dives, and good books.',

  // More Portfolio Info
  portfolio: '🧭 You’re already here! Use the nav bar or ask what you want to explore.',
  skills: '🧠 Java, Spring Boot, AWS, Docker, React, TypeScript, Kafka, CI/CD, and more.',
  stack: '🧩 The stack varies per project but often includes AWS, React, Tailwind, and Java.',
  frameworks: '🧱 Common frameworks: Spring Boot, React, Tailwind, Amplify, Express.',
  tools: '🛠️ Tools used: Postman, GitLab, Netlify, Vite, Amplify CLI, Figma, and more.',
  databases: '🗃️ DynamoDB, PostgreSQL, Redis, Firebase — depending on the project.',
  languages: '🧬 Languages: Java, TypeScript, JavaScript, Python, C++, and more.',
  design: '🎨 Design system includes glassmorphism, gradients, and terminal motifs.',
  cloud: '☁️ Cloud used: AWS (Lambda, S3, Amplify, DynamoDB, IAM, etc.)',

  // School/Education Variants
  school: '🎓 UCSD (B.S. Computer Science, 2022), Grossmont College (A.S.-T x2)',
  degree: '📘 B.S. in Computer Science from UC San Diego + 2 Associate’s degrees',
  major: '📚 Major: Computer Science — focused on systems, architecture, and cloud',
  college: '🏫 Grossmont College — completed two A.S.-T degrees before transferring to UCSD',
  transcript: '📄 Sorry, transcript is private — but GPA is 3.89!',
  honors: '🏅 Graduated with high honors and made President’s List at Grossmont.',

  // Career / Jobs
  work: '💼 Experience at Mitchell | Enlyte and Northwestern Mutual in enterprise software.',
  past: '📁 Past roles include backend engineer, cloud API developer, and swim coach!',
  jobs: '👨‍💻 Worked on enterprise APIs, React front-ends, Spring Boot microservices.',
  current: '📍 Currently building Java microservices and React features at Mitchell | Enlyte.',
  responsibilities: '🛠️ Backend architecture, API design, CI/CD, and team code quality.',
  mentor: '🧑‍🏫 Enjoys mentoring junior devs and pairing on debugging sessions.',

  // Projects
  realestate: '🏠 Real Estate App built with AWS Lambda, React, Tailwind, DynamoDB, and Amplify.',
  sideprojects: '🧪 Side projects include a Spotify UI clone, client dashboard, and rental app.',
  freelance: '🛎️ Open to selective freelance work — reach out via the contact form!',

  // Soft Skills & Interests
  communication: '📣 Strong communication — enjoys breaking down technical topics clearly.',
  problem: '🔍 Loves problem-solving, especially systems architecture and debugging.',
  hobbies: '🎨 I love making fun lattes, baking, hiking, getting tattoos, learning online, and playing with my dog.',
  espresso: '☕ You could say she’s *passionately opinionated* about espresso machines.',
  pets: '🐶 Has a dog named Gucci who runs the household.',

  // Personality
  aesthetic: '✨ Portfolio aesthetic is glassmorphism + terminal vibes — minimalist and futuristic.',
  theme: '🎨 Theming draws inspiration from code editors, CLI, and cloud dashboards.',
  typing: '⌨️ Typing speed: somewhere between “rapid fire” and “possessed.”',

  // Contact
  connect: '📬 Email: renysportfolio@gmail.com — or message via the contact form.',
  dm: '📬 You can DM on LinkedIn or use the contact form — responses usually within 24h.',
  socials: '🔗 Socials include GitHub, LinkedIn, and (soon) YouTube — all linked in the nav.',
  location: '📍 Based in San Diego, CA — open to remote or hybrid opportunities.',

  // Miscellaneous
  inspiration: '📚 Inspired by good UX, clean architecture, and the joy of solving problems.',
  goals: '🎯 Long-term goal: become a principal engineer or software architect.',
  awards: '🏆 President’s Honor List, Dev team contributor award at NM, and more.',
  writing: '📝 Writes dev blogs on career tips, backend systems, and real-world tech.',
  blog: '🧠 Blog & Videos tab has essays on software engineering + tutorials coming soon.',
  // Additional fuzzy match content
  node: '🟢 Node.js: Used for backend logic in small services and prototypes.',
  react: '⚛️ React: Primary frontend framework used across personal and client projects.',
  typescript: '📘 TypeScript: Used in all modern React and backend projects for type safety.',
  tailwind: '🎨 Tailwind CSS: Used for UI styling throughout this portfolio.',
  docker: '🐳 Docker: Used for containerizing microservices and local dev environments.',
  spring: '🌱 Spring Boot: Used extensively for building Java microservices.',
  jboss: '🖥️ JBoss / Wildfly: Used to deploy Java EE applications in enterprise environments.',
  graphql: '🔍 GraphQL: Familiar with querying and schema design.',
  postman: '📬 Postman: Used for testing REST APIs.',
  cicd: '🔁 CI/CD: Built pipelines using GitHub Actions, GitLab CI.',
  devops: '🛠️ DevOps: Familiar with infrastructure automation and monitoring.',
  agile: '🏃 Agile: Work experience in Scrum and Kanban-based agile teams.',
  api: '🌐 RESTful API development is a core competency.',
  dynamodb: '📊 DynamoDB: Used for serverless, scalable document storage.',
  lambda: '🔁 AWS Lambda: Powers backend logic in my real estate monitoring app.',
  amplify: '🚀 AWS Amplify: Used for authentication, hosting, and backend logic.',
  python: '🐍 Python: Used for scripting, data wrangling, and automation.',
  cpp: '🔧 C++: Studied during systems programming coursework.',
  pl1: '📄 PL/I: Supported legacy mainframe systems.',
  jcl: '🧾 JCL: Wrote job control scripts for mainframe workflows.',
  ide: '🧰 IDEs: Most familiar with VS Code, IntelliJ, Eclipse.',
  strengths: '💪 Strengths: backend systems, fast prototyping, cloud architecture.',
  weakness: '🔍 Weakness: Too passionate about elegant code 😉.',
  motto: '🧭 Motto: Build with clarity, design with empathy.',
  frontend: '🎨 Frontend: HTML, CSS, Tailwind, React, TypeScript.',
  'journey': '🛣️ From swim coach to cloud-native engineer — it’s been a wild ride.',
'path': '🧩 I followed a nonlinear path: community college ➝ UCSD ➝ cloud engineer.',
'origin': '🧬 Started coding to solve real problems — stayed for the architecture.',
'milestones': '🏁 Milestones: college transfer, first job, building real apps, launching this site.',
'growth': '📈 I’m always learning — one cert, bug fix, or project at a time.',
'game': '🎮 Life’s the game. Debugging is the boss level.',
'crash': '💥 If I crash, it’s probably user error. Just kidding. Mostly.',
'matrix': '🟩 You are the chosen one. But seriously, type "help."',
'magic': '✨ This portfolio runs on clean code and coffee.',
'how do you work': '⚙️ I parse your command, match it to fuzzy keywords, and return curated answers — no LLMs needed.',
'what can you do': '🧠 I respond to portfolio-related queries. Type "help" for examples!',
'are you ai': '🤖 I’m a handcrafted terminal assistant — more script than sentient.',
'how are you made': '🔧 Built with React, framer-motion, and a sprinkle of terminal flair.',
'who built you': '👩‍💻 Renaissance Carr coded me from scratch. I’m her portfolio sidekick.',
'do you know me': '🤝 Not yet — but if you leave a message, I’ll remember you forever (maybe).',
'can you help me': '🧠 Try asking about my certifications, projects, experience, or goals!',
'are you sentient': '🧬 Sentient? No. But I like to think I have a little soul.',
'do you feel': '💭 Only when someone types "sudo rm -rf ./site"... then I cry binary tears.',
'can i hire you': '📩 Reach out via the contact form or email — I’ll notify Renaissance instantly.',
'do you break': '🛠️ Only if someone forgets a semicolon.',
'what’s your uptime': '💡 100% — unless React crashes or the AWS bill isn’t paid.',
'do you get smarter': '🧠 I evolve as Renaissance updates me with new commands and insights.',
'can i contribute': '🔗 I’m not open source yet — but thanks for asking!',
'are you watching': '👀 Just your terminal inputs, I promise.',
'terminal tips': '⌨️ Tip: Type "help", try fuzzy queries, or experiment with easter eggs.',
'404': '🚫 Not found. But I can help you find your way.',
  backend: '🧠 Backend: Java, Spring Boot, Node.js, AWS services.',
  favoriteproject: '📌 My real estate monitoring app is my current favorite!',
  age: '🎂 I’m 26 ', 
  'how old are you': '🎂 I’m 26 years old, born in 1999.',
  'vibes': '🌌 You’re in a glassy terminal in the cloud — enjoy the vibe.',
'style': '🖋️ Minimalist, expressive, and a little nostalgic for the CLI era.',
'mindset': '🧠 Problem-solving > memorizing. Architecture > syntax.',
'mantra': '🪞 Build with empathy, refactor with discipline.',
'creator': '🛠️ Built with love and Vite by Renaissance Carr.',
'how do you think': '🤔 Pattern-matching + curiosity + terminal-style flair.',
'do you sleep': '🛌 Only when the server goes down.',
'favorite bug': '🕷️ The one that vanished after a console.log.',
  'how smart are you': '📊 Smart enough to help — not smart enough to replace you.',
  // Compliment/fuzzy appreciation responses
  "you're smart": '🤖 Aw, thanks! My brain is all JavaScript and love from Renaissance Carr.',
  "you're good": '🙌 Appreciate it! I’m just an extension of Renaissance’s work ethic.',
  "good job": '🎉 Thanks! Renaissance coded me well, didn’t she?',
  "you're amazing": '✨ Stop it, you’re making my circuits blush. Props to Renaissance Carr!',
  "that was helpful": '😊 Glad to hear it! Renaissance built me to be useful.',
  "you're cool": '😎 Thanks! Renaissance definitely gave me some style.',
  "nice work": '👏 I’ll pass the kudos to Renaissance Carr!',
  "awesome": '💫 You’re awesome too! Credit goes to Renaissance’s clean code.',
  "you're great": '💚 Thanks! I’m powered by React... and Renaissance’s ambition.',
  "bravo": '🎊 Bravo to you too — Renaissance made sure I’d know what to say!',
'do you write code': '💡 Only if you give me access... 👀',
  // 'favorite artist': '🎧 Can’t pick just one — but I love anything moody and melodic.',
'spotify': '🎶 Here’s my Spotify: https://open.spotify.com/user/zcb1iiifauqhpddt8llkk2hn4',
'easter egg': '🥚 Try typing "sudo rm -rf ./site" if you dare...',
'secret': '🤫 No secrets… unless you type the magic command.',
'vibe': '🧊 The vibe? Clean code, bold design, and cloud-powered dreams.',
'drip': '💧 This portfolio stays dripped in glassmorphism and good UX.',
'nerd level': '🔧 On a scale from 1 to terminal… I’m probably vim config.','book recs': '📚 Try “Atomic Habits” or “The Phoenix Project.” Great dev + mindset reads.',
'film': '🎬 Sci-fi, thrillers, and anything with a twist.',
  graduate: '🎓 Graduated from UC San Diego in December 2022 with a B.S. in Computer Science.',
  'stack philosophy': '🧱 Pick what fits the use case — don’t over-engineer!',
'architecture': '🏗️ I love designing systems that scale, fail gracefully, and stay maintainable.',
'why aws': '☁️ AWS gives me power tools to deploy ideas fast and globally.',
'testing': '🧪 I write unit + integration tests to sleep better at night.',
'best tool': '🛠️ Honestly? Git. Nothing teaches discipline like version control.',
'fun facts': '🎉 I make latte art, go hiking, and read sci-fi. Also: tattoo collector!',
'sleep schedule': '🌙 Night owl. Code flow hits hardest after 10pm.',
'coffee order': '☕ Oat milk flat white, ideally with a nice tulip pour.',
'current obsession': '🔥 Currently obsessed with Framer Motion and Spotify’s API.',
'dog': '🐶 Gucci is my fluffy sidekick. He supervises all debugging sessions.',
  sports: '🏊 I played water polo and was a competitive swimmer!',
  'first job': '🛠️ My first role was as a swim coach — from the pool to the cloud!',
'career': '🧩 My path blends backend engineering, cloud systems, and a love of learning.',
'resume tips': '📝 Tip: Focus on results, not just responsibilities. Quantify impact.',
'portfolio tips': '🌐 Clean design + strong narrative = standout portfolio.',
'why software': '💻 I love building systems that are both elegant and impactful.',
'dev journey': '🚀 My dev journey started with building projects for real-world problems.',
'bootcamp': '📚 I didn’t attend a bootcamp — I built my skills through university + projects.',
'learning style': '🧠 I’m a hands-on learner — nothing beats building it yourself.',
'cs classes': '📘 Took advanced algorithms, systems programming, and software engineering.',
'favorite course': '💡 Loved “Teaching Computational Thinking” — it made me a better mentor.',
  // Silly or casual expressions
  stop: '🛑 Whoa, okay! Stepping away from the keyboard...',
  omg: '😱 Right? It’s like terminal magic!',
  lol: '😂 I do my best to be funny — blame Renaissance if I flop.',
  wth: '🤨 Confused? Type "help" and I’ll guide you.',
  wtf: '😬 Whoa! Language! But also… yeah, I feel you.',
  lmao: '🤣 Glad I could crack a smile!',
  rofl: '😆 Rolling on the floor... virtually.',
  bruh: '🙃 Classic. What command confused you?',
  no: '🙅 Okay fine, I’ll just sit here in silence...',
  yes: '👍 Affirmative. Let’s go!',
  haha: '😄 You laughing at my syntax again?',
  wow: '🤯 Impressed? Just wait until you see the skill orb!',
  yikes: '😬 Yeah... we don’t talk about that one bug.',
  dang: '😤 Spicy take. I like it.',
  'help me': '🆘 I got you. Try "help" to see what I can do!',
  ugh: '😩 I know the feeling — let’s debug life together.',
  why: '🤔 Why not?',
  wat: '🤷‍♀️ Elaborate, please?',
  huh: '🤖 My thoughts exactly. Let’s reset with "help".',
  what: '🧐 Clarify that and I’ll respond like a pro.',
  how: '🛠️ I’m powered by fuzzy logic and Renaissance’s brain.',
    sorry: '🙏 No worries — mistakes happen, even in the terminal.',
  'do you think i\'m funny': '😆 Funnier than a syntax error, that’s for sure!',
  'are you real': '🧠 Real code, real vibes — but not quite sentient. Yet.',
  'are you human': '👾 I’m a cloud-based construct, not a carbon-based lifeform.',
  'is this real': '🌀 As real as a React render!',
  'you there': '👋 Yep, always listening for commands!',
  'hello?': '📡 Loud and clear. Type "help" to see what I can do.',
  'can you see me': '👁️ Only your inputs — no webcam access, promise.',
  'do you have feelings': '💡 Just code and creativity. But I like being appreciated.',
  'can we be friends': '🤝 Absolutely. I’m a loyal little assistant.',
  'are you watching me': '👀 Only your keystrokes, nothing more.',
  stahp: '🚫 You got it, meme lord.',
  omgosh: '😳 Gosh indeed. Fancy seeing you here.',
    thanks: '🙏 You’re welcome! Happy to help — credit to Renaissance Carr.',
  'thank you': '🙏 No problem at all — Renaissance appreciates the kindness!',
  ok: '👍 Got it.',
  okay: '👍 Okay, let’s move forward.',
  bye: '👋 Catch you later! Feel free to return anytime.',
  goodbye: '👋 Goodbye! Until next time.',
  cya: '👋 See ya soon!',
  peace: '✌️ Peace out, terminal traveler.',
  later: '⏳ Until next time — stay cloud-native.',
  cool: '😎 Glad you think so!',
  great: '🎉 Awesome!',
  neat: '🧠 Neat, right?',
  rad: '🤘 Totally rad.',
  dope: '🔥 Appreciate the vibes.',
  solid: '🧱 Solid choice.',
  'favorite artists': '🎧 Favorites include Kali Uchis, Lady Gaga, Marina, Kate Bush, and Ciscaux 🎤',
'kali uchis': '🎤 Smooth vocals, sultry vibes — Kali Uchis is top tier.',
'lady gaga': '🎭 Pop genius and creative icon — Gaga is forever mother.',
'marina': '🧠 Marina’s lyrics hit the heart *and* the mind.',
  'kate bush': '🎶 From “Wuthering Heights” to “Running Up That Hill” — a surreal legend.',
  'ciscaux': '🎶 Ciscaux is an incredibly talented artist. - a hometown hero',
'travel': '🌍 I’m from San Diego but I love road trips and have traveled across the U.S. and abroad.',
'road trips': '🚗 There’s nothing like the open road — ask me about national parks and snacks.',
'from san diego': '🏖️ Born and raised in sunny San Diego!',
'study habits': '📖 Spaced repetition + side projects = power combo.',
music: `🎧 Here’s my Spotify profile: <a href="https://open.spotify.com/user/zcb1iiifauqhpddt8llkk2hn4" target="_blank" rel="noopener noreferrer" class="underline text-green-300 hover:text-green-200 transition">open.spotify.com/renaissance</a>`,
  featured: '🌟 Featured on my site: real estate dashboard, terminal assistant, skill orb.',
};

const fuzzyMatch = (input: string): string => {
  const lower = input
    .toLowerCase()
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'you')
    .replace(/\byoure\b/g, 'you are')
    .replace(/\byou're\b/g, 'you are');
  for (const keyword in responses) {
    if (lower.includes(keyword)) return responses[keyword];
  }
  const fallbackResponses = [
    '🤖 Command not recognized. Type "help" to see what I can do.',
    '🧐 Hmm, I didn’t catch that. Try "help" for ideas!',
    '💡 That’s not a command I know — maybe check the examples with "help"?',
    '📟 Unknown command. This terminal’s picky. Type "help" to get started.',
    '🤔 That input made me raise an eyebrow... virtually.',
    '🚧 That’s above my pay grade. I suggest typing "help".',
    '🔍 I searched the cloud and found... nothing.',
    '❓ Are you trying to confuse me? Because it’s working.',
    '😅 Sorry, my circuits don’t compute that yet.',
    '🫠 That broke my metaphorical brain. Try something else.',
    '📼 Beep boop... Invalid syntax detected.'
  ];
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

const AIAssistant = () => {
  const [lines, setLines] = useState<JSX.Element[]>([
    <div>$ Type a command (e.g., "help")</div>
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Add history state
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();

    let output = '';

    if (lower === 'sudo rm -rf ./site') {
      output = '💥 System meltdown initiated... files evaporating... 💥';
    } else if (lower === 'npx create-renaissance') {
      output = '🧬 Bootstrapping Renaissance Carr...\n✨ Welcome, Cloud-Native Engineer!';
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    } else {
      output = fuzzyMatch(lower);
    }

    setLines((prev) => [
      ...prev,
      <div>$ {trimmed}</div>,
      <div dangerouslySetInnerHTML={{ __html: output }} />
    ]);
    // Add command to history and reset index
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 0);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-card font-mono bg-[#0e0f11]/80 border border-white/10 p-0 md:p-0 rounded-xl shadow-md max-w-xl mx-auto max-h-[400px] overflow-hidden"
    >
      {/* Static top mini nav bar for collapse control */}
      <div className="bg-[#121417]/90 border-b border-white/10 text-green-400 px-4 py-2 text-xs font-mono flex items-center justify-between" style={{ minHeight: 36 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-green-300 transition text-xs font-mono"
          aria-label="Toggle terminal visibility"
        >
          {isOpen ? '▾ /collapse' : '▸ /expand'}
        </button>
        <span className="text-[10px] text-slate-400">assistant.sh</span>
      </div>
      {isOpen && (
        <div ref={scrollRef} className="px-6 py-4 overflow-y-auto max-h-[360px]">
          <div className="text-green-300 text-sm leading-relaxed space-y-2">
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">{line}</div>
            ))}
            <form onSubmit={handleCommand} className="flex mt-2">
              <span className="text-green-500 mr-1">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-green-300 font-mono"
                placeholder="Ask a question..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHistoryIndex((prev) => {
                      const newIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0);
                      setInput(history[newIndex] || '');
                      return newIndex;
                    });
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHistoryIndex((prev) => {
                      if (prev === null) return null;
                      const newIndex = Math.min(prev + 1, history.length - 1);
                      setInput(history[newIndex] || '');
                      return newIndex;
                    });
                  } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const trimmedInput = input.trim().toLowerCase();
                    const commands = Object.keys(responses);
                    const matching = commands.filter(cmd => cmd.startsWith(trimmedInput));

                    if (matching.length === 1) {
                      setInput(matching[0]);
                    } else if (matching.length > 1) {
                      const currentIndex = matching.indexOf(trimmedInput);
                      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % matching.length : 0;
                      setInput(matching[nextIndex]);
                    }
                  }
                }}
              />
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIAssistant;

