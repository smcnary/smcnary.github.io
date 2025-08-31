// Miami Vice Minimal/Industrial Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Framer Motion (if available)
    if (typeof motion !== 'undefined') {
        initializeAnimations();
    }

    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillCharts();
    initializePortfolioHover();
    initializeContactForm();
    initializeScrollToTop();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navBar.style.background = 'rgba(11, 15, 20, 0.95)';
            navBar.style.boxShadow = '0 4px 20px rgba(46, 228, 214, 0.1)';
        } else {
            navBar.style.background = 'rgba(11, 15, 20, 0.8)';
            navBar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
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
}

// Scroll effects and animations
function initializeScrollEffects() {
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

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Skill charts animation
function initializeSkillCharts() {
    const skillCharts = document.querySelectorAll('.skill-progress');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressCircle = entry.target;
                const percent = progressCircle.getAttribute('data-percent');
                const circumference = 2 * Math.PI * 54; // radius = 54
                const offset = circumference - (percent / 100) * circumference;
                
                progressCircle.style.strokeDashoffset = offset;
                progressCircle.style.transition = 'stroke-dashoffset 1.5s ease';
            }
        });
    }, { threshold: 0.5 });

    skillCharts.forEach(chart => {
        chartObserver.observe(chart);
    });
}

// Portfolio hover effects
function initializePortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const image = item.querySelector('.portfolio-image img');
        
        item.addEventListener('mouseenter', () => {
            if (overlay) overlay.style.opacity = '1';
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (overlay) overlay.style.opacity = '0';
            if (image) image.style.transform = 'scale(1)';
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollTopButton = document.getElementById('scrollTop');
    
    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });
        
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Download resume function
function downloadResume() {
    // Create a simple text-based resume content
    const resumeContent = `Sean McNary - Full Stack Engineer

📧 smcnary@live.com | 📱 786-213-3333 | 🌐 smcnary.github.io
💼 linkedin.com/in/smcnary | 🖥️ github.com/SMCNARY

SUMMARY
Full Stack Engineer with experience building scalable SaaS and enterprise applications across logistics, retail, and cloud-native platforms. Skilled in .NET, React, Angular, Symfony, Python, and D3.js with expertise in AWS and Azure cloud services. Strong foundation in system architecture, CI/CD, data visualization, and modernization of legacy systems.

CORE SKILLS
• Languages/Frameworks: C#, PHP, JavaScript, Python, .NET Core, React, Angular, Symfony, D3.js
• Cloud: AWS (Lambda, DynamoDB, Aurora, S3, Athena), Azure (PaaS, IaaS)
• Databases: SQL Server, PostgreSQL, MySQL
• Practices: Microservices, REST APIs, CI/CD, Agile/Scrum
• Tools: GitHub, Azure DevOps, Docker, SonarQube

EXPERIENCE

McNary Technical LLC – Full Stack Engineer | 2014 – Present
• Delivered SaaS and SEO platforms for logistics and legal clients
• Built React + Symfony + PostgreSQL dashboard for real-time shipment tracking
• Implemented D3.js visualizations for SEO performance trends and logistics analytics
• Developed multi-tenant APIs and AWS data pipelines for SEO automation

Alliance Resources – Senior Developer | 2022 – 2024
• Migrated enterprise systems to .NET Core and Azure DevOps CI/CD
• Refactored financial reporting tools, improving speed and reliability

QuikTrip – Senior Developer | 2018 – 2022
• Supported 140+ .NET applications across retail operations
• Designed Azure services and led contractor team in CI/CD adoption

AAON, Inc. – Senior Engineer | 2016 – 2018
• Rewrote contractor system as modern React web app
• Migrated legacy VB6 systems to .NET/JavaScript

Contract Roles – Software Engineer | 2012 – 2016
• Delivered enterprise solutions using .NET, Angular, React, SQL Server
• Designed APIs and optimized databases for logistics and marketing clients`;

    // Create a blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sean_McNary_Resume.txt';
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show notification
    showNotification('Resume downloaded successfully!', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #2EE4D6, #55D6FF)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FF5FB2, #FF8A80)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #98A2B3, #E5EEF5)';
        notification.style.color = '#0B0F14';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize Framer Motion animations (if available)
function initializeAnimations() {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-actions');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Typing effect for hero title (optional)
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to icon buttons
    const iconButtons = document.querySelectorAll('.icon-button');
    
    iconButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(46, 228, 214, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16)); // ~60fps
