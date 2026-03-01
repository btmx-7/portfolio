// ============================================
// CONFIGURATION & STATE
// ============================================

const state = {
    currentLang: 'fr',
    currentTheme: 'light',
    mobileMenuOpen: false,
    formSubmitted: false
};

// ============================================
// THEME SWITCH
// ============================================

function initThemeSwitch() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Bind click first — before any localStorage access that could throw
    themeToggle.addEventListener('click', () => {
        const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try { localStorage.setItem('preferredTheme', newTheme); } catch(e) {}
    });

    // Apply saved or system theme on load
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('preferredTheme'); } catch(e) {}
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    setTheme(initialTheme);
}

function setTheme(theme) {
    state.currentTheme = theme;
    // Set on <html> so CSS [data-theme="dark"] cascade works immediately
    document.documentElement.setAttribute('data-theme', theme);
}

// ============================================
// MULTI-LANGUAGE SYSTEM
// ============================================

function initLanguageSwitch() {
    const langSwitch = document.getElementById('langSwitch');
    if (!langSwitch) return;
    
    langSwitch.addEventListener('click', toggleLanguage);
    
    // Priority: URL param > localStorage > browser lang
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    let savedLang = null;
    try { savedLang = localStorage.getItem('preferredLanguage'); } catch(e) {}
    const browserLang = navigator.language.slice(0, 2);

    if (urlLang === 'en' || urlLang === 'fr') {
        setLanguage(urlLang);
    } else if (savedLang) {
        setLanguage(savedLang);
    } else if (browserLang === 'en' || browserLang === 'fr') {
        setLanguage(browserLang);
    }
}

function toggleLanguage() {
    const newLang = state.currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
}

function setLanguage(lang) {
    state.currentLang = lang;
    try { localStorage.setItem('preferredLanguage', lang); } catch(e) {}
    
    // Update language switch active state
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll(`[data-${lang}]`).forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (state.mobileMenuOpen) {
                state.mobileMenuOpen = false;
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (state.mobileMenuOpen && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            state.mobileMenuOpen = false;
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR SCROLL BEHAVIOR
// ============================================

function initNavbarScroll() {
    let lastScroll = 0;
    const nav = document.getElementById('nav');
    
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// FORM VALIDATION & SECURITY
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const formGroup = field.parentElement;
    const value = field.value.trim();
    
    // Remove previous error
    formGroup.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // Additional security checks
    if (containsSuspiciousContent(value)) {
        formGroup.classList.add('error');
        return false;
    }
    
    return true;
}

function containsSuspiciousContent(value) {
    // Check for common injection patterns
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /eval\(/i,
        /expression\(/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(value));
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Honeypot check (bot detection)
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
        console.warn('Bot detected via honeypot');
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input:not([type="submit"]), textarea');
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        return;
    }
    
    // Prepare sanitized data
    const data = {
        name: sanitizeInput(formData.get('name')),
        email: sanitizeInput(formData.get('email')),
        subject: sanitizeInput(formData.get('subject')),
        message: sanitizeInput(formData.get('message')),
        timestamp: new Date().toISOString(),
        language: state.currentLang
    };
    
    // Here you would typically send to a backend
    // For now, we'll simulate a successful submission
    simulateFormSubmission(data, form);
}

function sanitizeInput(input) {
    if (!input) return '';
    
    // Remove HTML tags and suspicious content
    return input
        .trim()
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

function simulateFormSubmission(data, form) {
    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = state.currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form data (sanitized):', data);
        
        // Show success message
        const successMessage = document.querySelector('.form-success');
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // In production, you would send this to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCsrfToken(), // Add CSRF protection
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle success
        })
        .catch(error => {
            // Handle error
        });
        */
    }, 1000);
}

// ============================================
// PROJECT VISUAL TABS
// ============================================

function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.visual-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            const parentVisual = button.closest('.project-visuals');
            
            // Update active tab
            parentVisual.querySelectorAll('.visual-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update active panel
            parentVisual.querySelectorAll('.visual-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            const targetPanel = parentVisual.querySelector(`[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.project, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function initAccessibility() {
    // Add keyboard navigation for custom elements
    document.querySelectorAll('.lang-option').forEach(option => {
        option.setAttribute('tabindex', '0');
        option.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLanguage(option.dataset.lang);
            }
        });
    });
    
    // Add focus visible styles programmatically for better browser support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCsrfToken() {
    // In production, get CSRF token from meta tag or cookie
    return document.querySelector('meta[name="csrf-token"]')?.content || '';
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    initThemeSwitch();
    initLanguageSwitch();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initContactForm();
    initProjectTabs();
    initScrollAnimations();
    initAccessibility();
    
    console.log('Portfolio initialized ✨');
    console.log('Current language:', state.currentLang);
}

// Start the application
init();

// ============================================
// BACKEND INTEGRATION NOTES
// ============================================

/*
IMPORTANT: For production deployment, implement the following backend security measures:

1. FORM SUBMISSION ENDPOINT
   - Create a secure API endpoint (e.g., /api/contact)
   - Implement rate limiting (e.g., max 5 submissions per hour per IP)
   - Add CSRF token validation
   - Sanitize all inputs on the server side (never trust client-side sanitization alone)
   - Use parameterized queries if storing in database
   - Implement email validation on server
   - Add spam detection (Google reCAPTCHA v3 recommended)

2. RECOMMENDED BACKEND STACK
   Node.js/Express example:
   
   ```javascript
   const express = require('express');
   const rateLimit = require('express-rate-limit');
   const helmet = require('helmet');
   const { body, validationResult } = require('express-validator');
   const nodemailer = require('nodemailer');
   
   const app = express();
   app.use(helmet());
   app.use(express.json());
   
   const contactLimiter = rateLimit({
       windowMs: 60 * 60 * 1000, // 1 hour
       max: 5 // limit each IP to 5 requests per hour
   });
   
   app.post('/api/contact',
       contactLimiter,
       [
           body('name').trim().isLength({ min: 2, max: 100 }).escape(),
           body('email').isEmail().normalizeEmail(),
           body('subject').trim().isLength({ min: 5, max: 200 }).escape(),
           body('message').trim().isLength({ min: 10, max: 2000 }).escape()
       ],
       async (req, res) => {
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
           }
           
           // Send email using nodemailer
           // Store in database if needed
           // Return success response
       }
   );
   ```

3. SECURITY HEADERS
   Add these headers to your server responses:
   - Content-Security-Policy
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security

4. EMAIL SERVICE
   Use a service like:
   - SendGrid
   - Mailgun
   - AWS SES
   - Postmark
   
   Never send emails directly from the client side.

5. MONITORING
   - Log all form submissions
   - Monitor for suspicious patterns
   - Set up alerts for unusual activity
   - Track submission success/failure rates
*/
