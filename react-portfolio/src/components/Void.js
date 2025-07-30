import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FaultyTerminal from './FaultyTerminal';
import DecryptedText from './DecryptedText';
import MagicBento from './MagicBento';
import './Void.css';

const projects = [
  {
    id: "001",
    title: "Forks & Fortunes",
    description: "Comprehensive data analysis of Bay Area restaurant trends, pricing patterns, and demographic correlations. Statistical insights into the local culinary landscape.",
    link: "https://github.com/alexjw3/forks_and_fortunes/blob/main/project_report.md"
  },
  {
    id: "002",
    title: "Alexander Wang Collection",
    description: "A curated catalog documenting notable individuals named Alexander Wang across various fields and industries. An exploration of shared identity and diverse achievements.",
    link: "https://alexjw3.github.io/alexander-wangs.html"
  },
  {
    id: "003",
    title: "Perfect Circle Challenge",
    description: "Test your drawing precision with this mathematical accuracy tool. Real-time scoring algorithms evaluate circular drawing skills with detailed performance metrics.",
    link: "https://alexjw3.github.io/circle-grader.html"
  },
  {
    id: "004",
    title: "AI-Generated LEGO Instructions",
    description: "CS224N project leveraging GPT-4o vision and fine-tuned language models to generate accessible LEGO instruction manuals. Bridging computer vision and natural language processing.",
    link: "https://alexjw3.github.io/lego-project.html"
  },
  {
    id: "005",
    title: "Forest Terrarium",
    description: "An interactive ecosystem simulation featuring seasonal cycles, tree growth algorithms, and real-time environmental changes. Watch digital nature evolve through multiple seasons. [BROKEN - working on fixes]",
    link: "https://alexjw3.github.io/terrarium.html"
  },
  {
    id: "006",
    title: "Volume Project",
    description: "An experimental audio control interface featuring unconventional volume manipulation methods. Test your patience with deliberately chaotic user interactions and creative audio visualization. [BROKEN - working on fixes]",
    link: "https://alexjw3.github.io/rickroll.html"
  }
];

const Void = () => {
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let userInput = [];

    const onKeyDown = (event) => {
      userInput.push(event.code);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      if (userInput.length === konamiCode.length) {
        const matches = userInput.every((key, index) => key === konamiCode[index]);
        if (matches && !konamiUnlocked) {
          unlockKonamiProject();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [konamiUnlocked]);

  const unlockKonamiProject = () => {
    setKonamiUnlocked(true);
    showKonamiNotification();
    playKonamiSound();
  };

  const showKonamiNotification = () => {
    const notification = document.createElement('div');
    notification.innerHTML = '✧ VOID ACCESS GRANTED ✧';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid #00ff88;
      color: #00ff88;
      padding: 16px 32px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      border-radius: 4px;
      z-index: 9999;
      animation: konami-notification 3s ease-in-out forwards;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const playKonamiSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const konamiMessage = () => {
    alert('🌌 You have accessed the void archives. Some secrets are meant to be discovered by those who remember the old ways. 🌌');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <FaultyTerminal
          scale={3}
          digitSize={1}
          timeScale={0.5}
          noiseAmp={1}
          brightness={1}
          scanlineIntensity={0.5}
          curvature={0.25}
          mouseStrength={0.2}
          tint="#00ff00"
          gridMul={[2, 1]}
          pause={false}
          glitchAmount={1}
          flickerAmount={1}
          chromaticAberration={0}
          dither={0}
          mouseReact={true}
          pageLoadAnimation={false}
        />
      </div>
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <DecryptedText text="Welcome to The Void" animateOn="view" speed={100} maxIterations={15} characters="!@#$%^&*()_+-=[]{}|;':,./<>?" className="revealed" parentClassName="all-letters" encryptedClassName="encrypted" />
        <DecryptedText text="Experimental Projects, Creative Works, and Technical Explorations" animateOn="view" speed={100} maxIterations={20} characters="!@#$%^&*()_+-=[]{}|;':,./<>?" className="revealed" parentClassName="all-letters subtitle-void" encryptedClassName="encrypted" />
      </div>
      <div className="void-magic-bento">
        <MagicBento projects={projects} />
      </div>
      <div className="footer-info">
        <span id="project-count">{konamiUnlocked ? 7 : 6}</span> projects loaded
      </div>
      <Link to="/" className="return-button">Return</Link>
    </div>
  );
};

export default Void;
