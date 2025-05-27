import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Posters', path: '/posters' },
    { name: 'Spirit Animal', path: '/spirit' },
    { name: 'Album Guess', path: '/guess' },
    { name: 'Tarot Reading', path: '/tarot' },
    { name: 'Matching Game', path: '/match' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/50 border-b border-pink-200 font-sans shadow-sm rounded-b-xl">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-sm text-pink-500">
        <Link to="/" className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 rounded-full px-3 py-1">
          ☁️ Trackify
        </Link>

        <div className="hidden md:flex space-x-6">
          {links.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`transition font-semibold rounded-full px-3 py-1 ${
                location.pathname === path
                  ? 'bg-white/70 text-pink-600 shadow-lg backdrop-blur-sm'
                  : 'text-purple-300 hover:text-pink-400 hover:bg-white/30'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-pink-500 font-bold focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '▲ Close' : '☰ Menu'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white/70 backdrop-blur-xl border-t border-pink-200 rounded-b-xl">
          <p className="text-purple-400 font-sans text-xs mb-2">~/fun-zone</p>
          <ul className="text-sm space-y-1">
            {links.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 pl-4 py-1 rounded-full hover:bg-white/20 transition ${
                    location.pathname === path
                      ? 'text-pink-500 bg-white/40 font-semibold'
                      : 'text-purple-300'
                  }`}
                >
                  {name.toLowerCase().replace(/ /g, '-').replace(/^[^a-z0-9]+/, '')}.vibe
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;