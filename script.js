// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initBurgerMenu();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initScrollAnimations();
    initButtonEffects();
    initFormSubmission();
    createFloatingElements();
    initCursorTrail();
});

// Burger menu functionality
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Add rotation animation to burger
            if (burger.classList.contains('active')) {
                burger.style.transform = 'rotate(90deg)';
            } else {
                burger.style.transform = 'rotate(0deg)';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                burger.style.transform = 'rotate(0deg)';
                
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Header scroll effect
function initHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(230, 255, 0, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(230, 255, 0, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Animate elements on scroll with different effects
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat, .about-text, .contact-info, .contact-form');

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Special animation for section titles
    const titles = document.querySelectorAll('h2');
    titles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });

    // Stagger animation for cards
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');

    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Enhanced button hover effects
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
    });
}

// Form submission
function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'MESSAGE SENT!';
                submitBtn.style.background = 'var(--green)';
                submitBtn.style.borderColor = 'var(--green)';
                submitBtn.style.color = 'var(--black)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Add floating background elements
function createFloatingElements() {
    const numberOfElements = 15;
    
    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '-1';
        element.style.width = Math.random() * 6 + 2 + 'px';
        element.style.height = element.style.width;
        element.style.backgroundColor = 'rgba(51, 51, 51, 0.1)';
        element.style.borderRadius = '50%';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        
        const duration = Math.random() * 10 + 10;
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 5 + 's';
        
        document.body.appendChild(element);
    }
}

// Mouse follow effect
function initCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Create cursor trail on mouse move
    document.addEventListener('mousemove', createCursorTrail);
}

// Create cursor trail
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = event.clientX + 'px';
    trail.style.top = event.clientY + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.backgroundColor = 'rgba(51, 51, 51, 0.3)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(trail);
    
    // Remove trail element after animation
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';_
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 500);
    }, 100);
}

// Logo click effect
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Add some interactive effects to skill and project cards
document.addEventListener('DOMContentLoaded', function() {
    // Skill cards hover effect
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-4px, -4px)';
            this.style.boxShadow = '10px 10px 0 var(--black)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = '6px 6px 0 var(--black)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('nav');
        
        if (burger && nav && nav.classList.contains('active')) {
            burger.classList.remove('active');
            nav.classList.remove('active');
            burger.style.transform = 'rotate(0deg)';
        }
    }
});

// Smooth reveal on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});