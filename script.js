/* ============================================
   Juan's Casa De Flores - script.js
   GSAP ScrollTrigger + Bilingual Support
   ============================================ */

   document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all modules
    initNavigation();
    initMobileMenu();
    initLanguageToggle();
    initHeroAnimations();
    initScrollAnimations();
    initFloatingCTA();
    initOrderForm();
});

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('navbar');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ============================================
   Mobile Menu
   ============================================ */
let mobileMenuOpen = false;

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenuOpen = !mobileMenuOpen;
        if (mobileMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function openMobileMenu() {
    mobileMenuOpen = true;
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    mobileMenu.classList.add('active');
    menuIcon.setAttribute('data-lucide', 'x');
    lucide.createIcons();
}

function closeMobileMenu() {
    mobileMenuOpen = false;
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    mobileMenu.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

/* ============================================
   Language Toggle (EN/ES)
   ============================================ */
let currentLang = 'en';

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage();
        updateLangToggleUI();
    });
}

function updateLangToggleUI() {
    const enSpan = document.querySelector('.lang-en');
    const esSpan = document.querySelector('.lang-es');
    
    if (currentLang === 'en') {
        enSpan.classList.add('active');
        esSpan.classList.remove('active');
    } else {
        esSpan.classList.add('active');
        enSpan.classList.remove('active');
    }
}

function updateLanguage() {
    // Update all elements with data-en and data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            el.textContent = text;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const enPlaceholder = el.getAttribute('data-placeholder-en');
        const esPlaceholder = el.getAttribute('data-placeholder-es');
        if (enPlaceholder && esPlaceholder) {
            el.placeholder = currentLang === 'en' ? enPlaceholder : esPlaceholder;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

/* ============================================
   Hero Animations
   ============================================ */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    // Hero background parallax
    gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Hero content animations
    heroTl
        .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    // About Section
    gsap.to('.about-image', {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    gsap.to('.about-content', {
        opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    // Occasions Cards
    gsap.to('.occasion-card', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.occasions-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    
    // Steps
    gsap.utils.toArray('.step').forEach((step) => {
        gsap.to(step, {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });
    
    gsap.to('.steps-cta', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-cta', start: 'top 90%', toggleActions: 'play none none reverse' }
    });
    
    // Bundle Cards
    gsap.to('.bundle-card', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.bundles-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    
    // Addon Cards
    gsap.to('.addon-card', {
        opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.addons-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    
    // Gallery Items
    gsap.to('.gallery-item', {
        opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    // Policy Cards
    gsap.to('.policy-card', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.policies-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    
    // Seasonal Banner
    const seasonalTl = gsap.timeline({
        scrollTrigger: { trigger: '.seasonal', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    seasonalTl
        .to('.seasonal-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to('.seasonal-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.seasonal-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.seasonal .btn', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    
    // Order Section
    gsap.to('.order-info', {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.order-section', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    gsap.to('.order-form-wrap', {
        opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.order-section', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
    
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });
}

/* ============================================
   Floating CTA Button
   ============================================ */
function initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    
    // Show after scrolling past hero
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom top',
        onEnter: () => floatingCta.classList.add('visible'),
        onLeaveBack: () => floatingCta.classList.remove('visible')
    });
    
    // Hide near order section
    ScrollTrigger.create({
        trigger: '.order-section',
        start: 'top 80%',
        onEnter: () => floatingCta.classList.remove('visible'),
        onLeaveBack: () => floatingCta.classList.add('visible')
    });
}

/* ============================================
   Order Form
   ============================================ */
function initOrderForm() {
    const form = document.getElementById('orderForm');
    const formSuccess = document.getElementById('formSuccess');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        
        console.log('Order Request:', data);
        
        // Hide form, show success
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Refresh icons
        lucide.createIcons();
        
        // Animate success
        gsap.from(formSuccess, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
    });
}

/* ============================================
   Refresh ScrollTrigger on Resize
   ============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
