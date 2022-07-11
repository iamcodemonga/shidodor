import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Topbar from './components/Topbar';
import Home from './pages/Home';
import Songs from './pages/Songs';
import Albums from './pages/Albums';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import About from './pages/About';
import Donate from './pages/Donate';
import Thanks from './pages/Thanks';
import Song from './pages/Song';
import Album from './pages/Album';
import Video from './pages/Video';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/song/:uid" element={<Song />} />
        <Route path="/album/:uid" element={<Album />} />
        <Route path="/video/:uid" element={<Video />} />
        <Route path="/sorry" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer />  */}
    </div>
    
  );
}

export default App;
