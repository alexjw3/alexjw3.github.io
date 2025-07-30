import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import Iridescence from './Iridescence';
import ASCIIText from './ASCIIText';

const Home = () => {
  return (
    <div>
      <Iridescence />
      <Navbar />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <ASCIIText text='thealexwang' />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#f3f4f6',
          fontFamily: "'Inter', sans-serif",
        }}>
          <span>scroll</span>
          <span>↓</span>
        </div>
      </div>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
