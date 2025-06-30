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
        // Increase particle count for more concentration
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                // Remove life cycle - fish are permanent
                size: Math.random() * 2.5 + 1.5, // Slightly smaller fish
                color: `hsl(${20 + Math.random() * 30}, 90%, ${50 + Math.random() * 20}%)`, // Orange fish
                // Fish-like properties
                tailAngle: 0,
                tailSpeed: Math.random() * 0.08 + 0.04, // Slower tail animation
                direction: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.3 + 0.2, // Slower base speed
                // Enhanced dynamics
                fearLevel: 0,
                maxFearLevel: 1,
                recoveryRate: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    updateFlowField() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                // Create more organic, flowing patterns
                const angle = (Math.sin(x * 0.015 + this.time * 0.5) + 
                              Math.cos(y * 0.015 + this.time * 0.3) + 
                              Math.sin((x + y) * 0.01 + this.time * 0.7)) * Math.PI * 0.5;
                this.flowField[y][x] = angle;
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Calculate distance to mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Enhanced mouse interaction with fear levels
            if (this.isMouseActive && distance < this.mouse.radius) {
                // Calculate fear level based on distance (closer = more fear)
                const fearIntensity = Math.max(0, 1 - (distance / this.mouse.radius));
                particle.fearLevel = Math.min(particle.maxFearLevel, particle.fearLevel + fearIntensity * 0.1);
                
                // Enhanced flee behavior with multiple forces
                const fleeForce = 2 * particle.fearLevel; // Reduced flee force for slower movement
                const circleForce = 1 * particle.fearLevel; // Reduced circle force
                const escapeForce = 1.5 * particle.fearLevel; // Reduced escape force
                
                // Primary flee force (away from mouse)
                const fleeAngle = Math.atan2(dy, dx) + Math.PI;
                particle.vx += Math.cos(fleeAngle) * fleeForce;
                particle.vy += Math.sin(fleeAngle) * fleeForce;
                
                // Circle force (perpendicular to flee direction) - creates encircling
                const circleAngle = fleeAngle + Math.PI / 2;
                particle.vx += Math.cos(circleAngle) * circleForce;
                particle.vy += Math.sin(circleAngle) * circleForce;
                
                // Escape force (random direction for more natural movement)
                const escapeAngle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * Math.PI;
                particle.vx += Math.cos(escapeAngle) * escapeForce;
                particle.vy += Math.sin(escapeAngle) * escapeForce;
                
                // Add panic behavior when very close
                if (distance < this.mouse.radius * 0.3) {
                    const panicForce = 2.5 * particle.fearLevel; // Reduced panic force
                    particle.vx += (Math.random() - 0.5) * panicForce;
                    particle.vy += (Math.random() - 0.5) * panicForce;
                }
                
                // Increase speed when fleeing (but not too much)
                particle.speed = Math.min(1.2, particle.speed + 0.05);
                
            } else {
                // Normal flow field behavior when not near mouse
                const col = Math.floor(particle.x / this.fieldSize);
                const row = Math.floor(particle.y / this.fieldSize);
                
                if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                    const angle = this.flowField[row][col];
                    const force = 0.2; // Even slower movement
                    
                    particle.vx += Math.cos(angle) * force;
                    particle.vy += Math.sin(angle) * force;
                }
                
                // Gradually recover from fear and return to normal speed
                particle.fearLevel = Math.max(0, particle.fearLevel - particle.recoveryRate);
                particle.speed = Math.max(0.2, particle.speed - 0.01); // Slower recovery
            }
            
            // Apply velocity with dynamic speed
            particle.x += particle.vx * particle.speed;
            particle.y += particle.vy * particle.speed;
            
            // Apply friction (less friction when fleeing for more responsive movement)
            const friction = particle.fearLevel > 0.5 ? 0.95 : 0.98;
            particle.vx *= friction;
            particle.vy *= friction;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Update fish tail animation (faster when fleeing)
            particle.tailSpeed = particle.fearLevel > 0.5 ? 0.2 : 0.1;
            particle.tailAngle += particle.tailSpeed;
        });
    }
    
    drawFish(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.9; // Permanent visibility with slight transparency
        this.ctx.fillStyle = particle.color;
        
        // Calculate fish direction
        const angle = Math.atan2(particle.vy, particle.vx);
        
        // Draw fish body
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(angle);
        
        // Fish body (oval)
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.size * 1.5, particle.size * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish tail
        this.ctx.beginPath();
        this.ctx.moveTo(-particle.size * 1.5, 0);
        this.ctx.lineTo(-particle.size * 2.5, -particle.size * 0.8);
        this.ctx.lineTo(-particle.size * 2.2, 0);
        this.ctx.lineTo(-particle.size * 2.5, particle.size * 0.8);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Fish eye
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.5, -particle.size * 0.2, particle.size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Fish pupil
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(particle.size * 0.6, -particle.size * 0.2, particle.size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
        this.ctx.restore();
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.01)'; // Much smaller trails
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw fish particles
        this.particles.forEach(particle => {
            this.drawFish(particle);
        });
        
        // Draw enhanced mouse influence area
        if (this.isMouseActive) {
            this.ctx.save();
            
            // Outer ring (subtle)
            this.ctx.globalAlpha = 0.05;
            this.ctx.strokeStyle = '#ff6b35';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Inner ring (more visible)
            this.ctx.globalAlpha = 0.15;
            this.ctx.strokeStyle = '#ff6b35';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius * 0.3, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Center dot
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = '#ff6b35';
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        }
    }
    
    animate() {
        this.time += 0.005; // Slower time progression
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
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.8)';
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
