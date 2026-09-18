// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import ScrollProgress from './components/layout/ScrollProgress';
import Preloader from './components/layout/Preloader';
import Cursor from './components/layout/Cursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections in scroll order
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import Capabilities from './components/sections/Capabilities';
import Philosophy from './components/sections/Philosophy';
import Experience from './components/sections/Experience';
import Stack from './components/sections/Stack';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';

import { ScrollTrigger } from './lib/motion';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When images finish loading, refresh ScrollTrigger
    const images = Array.from(document.querySelectorAll('img'));
    Promise.all(images.map((img) => img.decode().catch(() => {}))).then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <SmoothScroll>
      {/* Noise grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Accessible skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Preloader animation */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom CV cursor */}
      <Cursor />

      {/* Top progress bar */}
      <ScrollProgress />

      {/* Floating navigation bar */}
      <Navbar />

      {/* Main content layer */}
      <main
        id="main-content"
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'var(--bg)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
        }}
      >
        <Hero />
        <Work />
        <Capabilities />
        <Philosophy />
        <Experience />
        <Stack />
        <Services />
        <Contact />
      </main>

      {/* Footer curtain reveal */}
      <Footer />
    </SmoothScroll>
  );
}
