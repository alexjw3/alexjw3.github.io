import React from 'react';
import CircularText from './CircularText';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm <span className="highlight">Alex Wang</span></h1>
          <p className="hero-subtitle">CS @ Stanford | AI/ML</p>
          <p className="hero-description">
            I'm a Stanford CS student working at the edge of Artificial Intelligence and Machine Learning.
            I've built tools for cybersecurity, defense, finance, and healthcare and I'm deeply curious in virtually everything.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-image" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularText text="Alex*Wang*Alex*Wang*Alex*Wang*Alex*Wang*" />
          <img src="assets/1750454862571.jpg" alt="Alex Wang headshot" className="profile-headshot" style={{ position: 'absolute' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
