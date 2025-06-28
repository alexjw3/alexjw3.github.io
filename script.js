// Flow Field Animation with Fish-like Particles
class FlowField {
    constructor() {
        this.canvas = document.getElementById('flowField');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.bubbles = [];
        this.flowField = [];
        this.fieldSize = 15;
        this.cols = 0;
        this.rows = 0;
        this.time = 0;
        this.mouse = { x: 0, y: 0, radius: 120 };
        this.isMouseActive = false;
        
        this.init();
        this.createParticles();
        this.createBubbles();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Mouse tracking
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.isMouseActive = true;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseActive = false;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.cols = Math.floor(this.canvas.width / this.fieldSize);
        this.rows = Math.floor(this.canvas.height / this.fieldSize);
        
        this.flowField = [];
        for (let y = 0; y < this.rows; y++) {
            this.flowField[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.flowField[y][x] = 0;
            }
        }
    }
    
    createParticles() {
        // More particles for fish-like concentration
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 12000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                life: Math.random() * 0.3 + 0.7, // Longer life for fish
                maxLife: Math.random() * 0.3 + 0.7,
                size: Math.random() * 4 + 3, // Larger fish
                // Vibrant fish colors
                color: this.getFishColor(),
                // Fish-like properties
                tailAngle: 0,
                tailSpeed: Math.random() * 0.15 + 0.08,
                direction: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.6 + 0.4, // Slightly faster
                schoolRadius: Math.random() * 60 + 40,
                // Fish personality
                personality: Math.random(),
                finAngle: 0,
                finSpeed: Math.random() * 0.2 + 0.1
            });
        }
    }
    
    createBubbles() {
        const bubbleCount = Math.floor((this.canvas.width * this.canvas.height) / 30000);
        
        for (let i = 0; i < bubbleCount; i++) {
            this.bubbles.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height + Math.random() * 100,
                size: Math.random() * 6 + 2,
                speed: Math.random() * 1 + 0.5,
                wobble: Math.random() * 0.1,
                wobbleSpeed: Math.random() * 0.05 + 0.02,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    getFishColor() {
        const colors = [
            'hsl(200, 90%, 60%)',   // Bright blue
            'hsl(160, 85%, 55%)',   // Emerald green
            'hsl(45, 95%, 65%)',    // Golden yellow
            'hsl(320, 80%, 65%)',   // Pink
            'hsl(280, 85%, 65%)',   // Purple
            'hsl(15, 90%, 65%)',    // Orange
            'hsl(120, 85%, 55%)',   // Lime green
            'hsl(260, 85%, 65%)'    // Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateFlowField() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const angle = (Math.sin(x * 0.012 + this.time) + Math.cos(y * 0.012 + this.time)) * Math.PI;
                this.flowField[y][x] = angle;
            }
        }
    }
    
    updateBubbles() {
        this.bubbles.forEach(bubble => {
            bubble.y -= bubble.speed;
            bubble.x += Math.sin(bubble.wobble) * 0.5;
            bubble.wobble += bubble.wobbleSpeed;
            
            if (bubble.y < -bubble.size) {
                bubble.y = this.canvas.height + bubble.size;
                bubble.x = Math.random() * this.canvas.width;
            }
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update animations
            particle.tailAngle += particle.tailSpeed;
            particle.finAngle += particle.finSpeed;
            
            // Calculate distance to mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let targetAngle = particle.direction;
            
            if (this.isMouseActive && distance < this.mouse.radius) {
                // Enhanced fish behavior: flee but encircle with personality
                if (distance < 25) {
                    // Flee directly away from mouse
                    targetAngle = Math.atan2(-dy, -dx);
                } else {
                    // Encircle the mouse with personality-based variation
                    const circleAngle = Math.atan2(dy, dx) + Math.PI / 2;
                    const fleeAngle = Math.atan2(-dy, -dx);
                    const personalityFactor = (particle.personality - 0.5) * 0.5;
                    targetAngle = (circleAngle + fleeAngle) / 2 + personalityFactor;
                }
                
                // Add some randomness to make it more natural
                targetAngle += (Math.random() - 0.5) * 0.3;
            } else {
                // Normal flow field behavior with personality
                const col = Math.floor(particle.x / this.fieldSize);
                const row = Math.floor(particle.y / this.fieldSize);
                
                if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                    const fieldAngle = this.flowField[row][col];
                    targetAngle = fieldAngle + (particle.personality - 0.5) * 0.2;
                }
            }
            
            // Smoothly adjust direction
            const angleDiff = targetAngle - particle.direction;
            particle.direction += angleDiff * 0.08;
            
            // Apply movement
            particle.vx = Math.cos(particle.direction) * particle.speed;
            particle.vy = Math.sin(particle.direction) * particle.speed;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Update life
            particle.life -= 0.001; // Much slower life decay
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = particle.maxLife;
                particle.direction = Math.random() * Math.PI * 2;
                particle.color = this.getFishColor(); // New color on respawn
            }
        });
    }
    
    drawFish(particle) {
        const alpha = particle.life / particle.maxLife;
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.direction);
        
        // Fish body with gradient
        const gradient = this.ctx.createLinearGradient(-particle.size, 0, particle.size, 0);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, this.adjustColor(particle.color, -20));
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish tail with animation
        this.ctx.beginPath();
        this.ctx.moveTo(-particle.size * 0.8, 0);
        this.ctx.quadraticCurveTo(
            -particle.size * 1.8, -particle.size * 0.9 * Math.sin(particle.tailAngle),
            -particle.size * 2.2, -particle.size * 0.5 * Math.sin(particle.tailAngle)
        );
        this.ctx.quadraticCurveTo(
            -particle.size * 1.8, particle.size * 0.9 * Math.sin(particle.tailAngle),
            -particle.size * 0.8, 0
        );
        this.ctx.fill();
        
        // Fish fins
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size * 0.3);
        this.ctx.quadraticCurveTo(
            particle.size * 0.5, -particle.size * 0.8 * Math.sin(particle.finAngle),
            particle.size * 0.8, -particle.size * 0.4 * Math.sin(particle.finAngle)
        );
        this.ctx.quadraticCurveTo(
            particle.size * 0.5, -particle.size * 0.2,
            0, -particle.size * 0.3
        );
        this.ctx.fill();
        
        // Fish eye with shine
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.3, -particle.size * 0.2, particle.size * 0.18, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish pupil
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.35, -particle.size * 0.2, particle.size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye shine
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.25, -particle.size * 0.25, particle.size * 0.05, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawBubbles() {
        this.bubbles.forEach(bubble => {
            this.ctx.save();
            this.ctx.globalAlpha = bubble.opacity;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Bubble highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    adjustColor(color, amount) {
        const hsl = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (hsl) {
            const h = parseInt(hsl[1]);
            const s = parseInt(hsl[2]);
            const l = Math.max(0, Math.min(100, parseInt(hsl[3]) + amount));
            return `hsl(${h}, ${s}%, ${l}%)`;
        }
        return color;
    }
    
    draw() {
        // Create a subtle underwater trail effect
        this.ctx.fillStyle = 'rgba(12, 74, 110, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw bubbles first (background)
        this.drawBubbles();
        
        // Draw fish particles
        this.particles.forEach(particle => {
            this.drawFish(particle);
        });
        
        // Enhanced mouse influence area with underwater effect
        if (this.isMouseActive) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.15;
            
            // Create radial gradient for mouse influence
            const gradient = this.ctx.createRadialGradient(
                this.mouse.x, this.mouse.y, 0,
                this.mouse.x, this.mouse.y, this.mouse.radius
            );
            gradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
            gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.2)');
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    animate() {
        this.time += 0.006; // Slower time progression
        this.updateFlowField();
        this.updateBubbles();
        this.updateParticles();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Stick Figure Runner Game
class StickFigureRunner {
    constructor() {
        this.canvas = document.getElementById('navGame');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.gameRunning = false;
        this.score = 0;
        this.gameSpeed = 2;
        
        // Player
        this.player = {
            x: 30,
            y: this.height - 15,
            width: 8,
            height: 15,
            velocityY: 0,
            isJumping: false,
            jumpPower: -8,
            gravity: 0.5
        };
        
        // Obstacles
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.obstacleInterval = 60;
        
        // Ground
        this.groundY = this.height - 5;
        
        this.init();
    }
    
    init() {
        // Start game on click
        this.canvas.addEventListener('click', () => {
            if (!this.gameRunning) {
                this.startGame();
            } else {
                this.jump();
            }
        });
        
        // Start game on spacebar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!this.gameRunning) {
                    this.startGame();
                } else {
                    this.jump();
                }
            }
        });
        
        // Draw initial screen
        this.drawStartScreen();
    }
    
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.gameSpeed = 2;
        this.player.x = 30;
        this.player.y = this.height - 15;
        this.player.velocityY = 0;
        this.player.isJumping = false;
        this.animate();
    }
    
    jump() {
        if (!this.player.isJumping) {
            this.player.velocityY = this.player.jumpPower;
            this.player.isJumping = true;
        }
    }
    
    updatePlayer() {
        // Apply gravity
        this.player.velocityY += this.player.gravity;
        this.player.y += this.player.velocityY;
        
        // Ground collision
        if (this.player.y >= this.groundY - this.player.height) {
            this.player.y = this.groundY - this.player.height;
            this.player.velocityY = 0;
            this.player.isJumping = false;
        }
    }
    
    updateObstacles() {
        this.obstacleTimer++;
        
        // Create new obstacles
        if (this.obstacleTimer > this.obstacleInterval) {
            this.obstacles.push({
                x: this.width,
                y: this.groundY - 10,
                width: 8,
                height: 10
            });
            this.obstacleTimer = 0;
            this.obstacleInterval = Math.max(30, this.obstacleInterval - 1);
        }
        
        // Move obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.x -= this.gameSpeed;
        });
        
        // Remove off-screen obstacles
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    }
    
    checkCollisions() {
        this.obstacles.forEach(obstacle => {
            if (this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y) {
                this.gameOver();
            }
        });
    }
    
    gameOver() {
        this.gameRunning = false;
        this.drawGameOver();
    }
    
    drawPlayer() {
        this.ctx.fillStyle = '#60a5fa';
        
        // Body
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Head
        this.ctx.beginPath();
        this.ctx.arc(this.player.x + this.player.width/2, this.player.y - 3, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Arms
        this.ctx.fillRect(this.player.x - 2, this.player.y + 3, 3, 6);
        this.ctx.fillRect(this.player.x + this.player.width - 1, this.player.y + 3, 3, 6);
        
        // Legs
        this.ctx.fillRect(this.player.x + 1, this.player.y + this.player.height, 2, 6);
        this.ctx.fillRect(this.player.x + this.player.width - 3, this.player.y + this.player.height, 2, 6);
    }
    
    drawObstacles() {
        this.ctx.fillStyle = '#ef4444';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
    
    drawGround() {
        this.ctx.fillStyle = '#374151';
        this.ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
    }
    
    drawScore() {
        this.ctx.fillStyle = '#e5e7eb';
        this.ctx.font = '12px Inter';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Score: ${this.score}`, this.width - 10, 15);
    }
    
    drawStartScreen() {
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#60a5fa';
        this.ctx.font = '10px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Click to Start!', this.width/2, this.height/2);
        this.ctx.fillText('Space to Jump', this.width/2, this.height/2 + 12);
    }
    
    drawGameOver() {
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = '10px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Game Over!`, this.width/2, this.height/2 - 5);
        this.ctx.fillText(`Score: ${this.score}`, this.width/2, this.height/2 + 5);
        this.ctx.fillText('Click to restart', this.width/2, this.height/2 + 15);
    }
    
    animate() {
        if (!this.gameRunning) return;
        
        // Clear canvas
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Update game objects
        this.updatePlayer();
        this.updateObstacles();
        this.checkCollisions();
        
        // Update score
        this.score++;
        
        // Increase game speed
        if (this.score % 100 === 0) {
            this.gameSpeed += 0.2;
        }
        
        // Draw everything
        this.drawGround();
        this.drawObstacles();
        this.drawPlayer();
        this.drawScore();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize flow field when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlowField();
    new StickFigureRunner();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards click effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 200);
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once on load
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavItem); 