import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Spirit Animal', path: '/spirit' },
    { name: 'Album Guess', path: '/guess' },
    { name: 'Tarot Reading', path: '/tarot' },
    { name: 'Pet Playlist', path: '/pet' },
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
          <p className="text-center font-light text-xs text-pink-400 italic mb-2">Choose your vibe</p>
          <ul className="text-sm space-y-2 px-2">
            {links.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-center rounded-xl px-3 py-2 transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 font-semibold shadow'
                      : 'text-purple-400 hover:bg-white/30'
                  }`}
                >
                  {name}
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