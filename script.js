// Flow Field Animation with Fish-like Particles
class FlowField {
    constructor() {
        this.canvas = document.getElementById('flowField');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.flowField = [];
        this.fieldSize = 15;
        this.cols = 0;
        this.rows = 0;
        this.time = 0;
        this.mouse = { x: 0, y: 0, radius: 100 };
        this.isMouseActive = false;
        
        this.init();
        this.createParticles();
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
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                life: Math.random() * 0.3 + 0.7, // Longer life for fish
                maxLife: Math.random() * 0.3 + 0.7,
                size: Math.random() * 3 + 2, // Slightly larger
                color: `hsl(${200 + Math.random() * 40}, 80%, ${50 + Math.random() * 30}%)`,
                // Fish-like properties
                tailAngle: 0,
                tailSpeed: Math.random() * 0.1 + 0.05,
                direction: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.3, // Slower movement
                schoolRadius: Math.random() * 50 + 30
            });
        }
    }
    
    updateFlowField() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const angle = (Math.sin(x * 0.015 + this.time) + Math.cos(y * 0.015 + this.time)) * Math.PI;
                this.flowField[y][x] = angle;
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update tail animation
            particle.tailAngle += particle.tailSpeed;
            
            // Calculate distance to mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let targetAngle = particle.direction;
            
            if (this.isMouseActive && distance < this.mouse.radius) {
                // Fish behavior: flee but encircle
                if (distance < 30) {
                    // Flee directly away from mouse
                    targetAngle = Math.atan2(-dy, -dx);
                } else {
                    // Encircle the mouse
                    const circleAngle = Math.atan2(dy, dx) + Math.PI / 2;
                    const fleeAngle = Math.atan2(-dy, -dx);
                    targetAngle = (circleAngle + fleeAngle) / 2;
                }
                
                // Add some randomness to make it more natural
                targetAngle += (Math.random() - 0.5) * 0.5;
            } else {
                // Normal flow field behavior
                const col = Math.floor(particle.x / this.fieldSize);
                const row = Math.floor(particle.y / this.fieldSize);
                
                if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                    const fieldAngle = this.flowField[row][col];
                    targetAngle = fieldAngle;
                }
            }
            
            // Smoothly adjust direction
            const angleDiff = targetAngle - particle.direction;
            particle.direction += angleDiff * 0.1;
            
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
            particle.life -= 0.002; // Slower life decay
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = particle.maxLife;
                particle.direction = Math.random() * Math.PI * 2;
            }
        });
    }
    
    drawFish(particle) {
        const alpha = particle.life / particle.maxLife;
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.direction);
        
        // Fish body
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish tail
        this.ctx.beginPath();
        this.ctx.moveTo(-particle.size * 0.8, 0);
        this.ctx.quadraticCurveTo(
            -particle.size * 1.5, -particle.size * 0.8 * Math.sin(particle.tailAngle),
            -particle.size * 1.8, -particle.size * 0.4 * Math.sin(particle.tailAngle)
        );
        this.ctx.quadraticCurveTo(
            -particle.size * 1.5, particle.size * 0.8 * Math.sin(particle.tailAngle),
            -particle.size * 0.8, 0
        );
        this.ctx.fill();
        
        // Fish eye
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.3, -particle.size * 0.2, particle.size * 0.15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish pupil
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.35, -particle.size * 0.2, particle.size * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    draw() {
        // Create a subtle trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw fish particles
        this.particles.forEach(particle => {
            this.drawFish(particle);
        });
        
        // Optional: Draw mouse influence area (subtle)
        if (this.isMouseActive) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.1;
            this.ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    animate() {
        this.time += 0.008; // Slower time progression
        this.updateFlowField();
        this.updateParticles();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize flow field when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlowField();
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