import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home">Alex Wang</a>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-link">Experience</a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-link">Skills</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
        <div className="nav-extra">
          <a href="/void" className="nav-link black-hole-nav" title="Enter the Void">
            <div className="click-me-hint">
              <span className="click-me-text">click me</span>
              <span className="click-me-arrow">→</span>
            </div>
            <div className="black-hole">
              <div className="black-hole-center"></div>
              <div className="black-hole-ring ring-1"></div>
              <div className="black-hole-ring ring-2"></div>
              <div className="black-hole-ring ring-3"></div>
            </div>
          </a>
        </div>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
