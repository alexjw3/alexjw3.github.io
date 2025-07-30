import React, { useRef, useEffect } from 'react';

const FlowField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    class FlowField {
      constructor() {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.fieldSize = 15;
        this.cols = 0;
        this.rows = 0;
        this.time = 0;
        this.init();
        this.createParticles();
        this.animate();
      }

      init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }

      resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.floor(this.canvas.width / this.fieldSize);
        this.rows = Math.floor(this.canvas.height / this.fieldSize);
      }

      createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        for (let i = 0; i < particleCount; i++) {
          this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            size: Math.random() * 2.5 + 1.5,
            color: `hsl(${20 + Math.random() * 30}, 90%, ${50 + Math.random() * 20}%)`,
            tailAngle: 0,
            tailSpeed: Math.random() * 0.08 + 0.04
          });
        }
      }

      updateParticles() {
        this.particles.forEach(particle => {
          if (Math.random() < 0.02) {
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.vy += (Math.random() - 0.5) * 0.1;
          }
          const maxSpeed = 0.7;
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > maxSpeed) {
            particle.vx *= maxSpeed / speed;
            particle.vy *= maxSpeed / speed;
          }
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0) {
            particle.x = 0;
            particle.vx *= -1;
          }
          if (particle.x > this.canvas.width) {
            particle.x = this.canvas.width;
            particle.vx *= -1;
          }
          if (particle.y < 0) {
            particle.y = 0;
            particle.vy *= -1;
          }
          if (particle.y > this.canvas.height) {
            particle.y = this.canvas.height;
            particle.vy *= -1;
          }
          particle.tailAngle += particle.tailSpeed;
        });
      }

      drawFish(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.9;
        this.ctx.fillStyle = particle.color;
        const angle = Math.atan2(particle.vy, particle.vx);
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.size * 1.5, particle.size * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(-particle.size * 1.5, 0);
        this.ctx.lineTo(-particle.size * 2.5, -particle.size * 0.8);
        this.ctx.lineTo(-particle.size * 2.2, 0);
        this.ctx.lineTo(-particle.size * 2.5, particle.size * 0.8);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.5, -particle.size * 0.2, particle.size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.6, -particle.size * 0.2, particle.size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.restore();
      }

      draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
          this.drawFish(particle);
        });
      }

      animate() {
        this.updateParticles();
        this.draw();
        animationFrameId = requestAnimationFrame(() => this.animate());
      }
    }

    const flowField = new FlowField();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => flowField.resize());
    };
  }, []);

  return <canvas ref={canvasRef} id="flowField" className="flow-field-canvas"></canvas>;
};

export default FlowField;
