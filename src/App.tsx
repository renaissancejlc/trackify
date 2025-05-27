import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpotifyDataProvider } from './context/SpotifyDataContext';

import Posters from './pages/Posters';
import SpiritAnimal from './pages/SpiritAnimal';
import AlbumGuess from './pages/AlbumGuess';
import TarotReading from './pages/TarotReading';
import NavBar from './components/NavBar';
import Home from  './pages/Home';
import MatchingGame from './pages/MatchingGame';
import AboutMe from './pages/AboutMe';

const App = () => {
  return (
    <SpotifyDataProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full bg-[#0D0F14] text-white font-sans overflow-x-hidden">
          <NavBar />

          <main className="flex-grow pt-24 px-4 w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posters" element={<Posters />} />
              <Route path="/spirit" element={<SpiritAnimal />} />
              <Route path="/guess" element={<AlbumGuess />} />
              <Route path="/tarot" element={<TarotReading />} />
              <Route path="/match" element={<MatchingGame />} />
              <Route path="/about" element={<AboutMe />} />

            </Routes>
          </main>
        </div>
      </Router>
    </SpotifyDataProvider>
  );
};

export default App;