/* ================================================
   YANNICK ZOMAHOUN — PORTFOLIO MAIN JS
   ================================================ */

'use strict';

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initRolesCarousel();
    initCounters();
    initScrollAnimations();
    initSkillBars();
    initSkillFilter();
    initTimelineTabs();
    initContactForm();
    initBackToTop();
    initLangBars();
});

/* ===== LOADER ===== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        // Trigger hero animations
        triggerHeroAnimations();
    }, 2000);

    // Disable scroll during load
    document.body.style.overflow = 'hidden';
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-roles, .hero-description, .hero-actions, .hero-stats, .hero-visual');
    heroElements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.08}s`;
        el.style.animationPlayState = 'running';
    });
}

/* ===== CUSTOM CURSOR ===== */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const interactables = document.querySelectorAll('a, button, [data-hover]');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

/* ===== NAVBAR ===== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down (mobile)
        if (window.innerWidth <= 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"], [onclick*="scrollToSection"]').forEach(link => {
        if (link.hasAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        }
    });
}

window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
    const targetY = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
    
    window.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });
};

/* ===== SCROLL SPY ===== */
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = 80;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id || link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: `-${navHeight}px 0px -60% 0px`,
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

/* ===== ROLES CAROUSEL ===== */
function initRolesCarousel() {
    const roles = document.querySelectorAll('.role');
    if (roles.length === 0) return;

    let currentIndex = 0;
    const interval = 3000;

    function nextRole() {
        const currentRole = roles[currentIndex];
        currentRole.classList.remove('active');
        currentRole.classList.add('exit');

        setTimeout(() => {
            currentRole.classList.remove('exit');
        }, 500);

        currentIndex = (currentIndex + 1) % roles.length;
        roles[currentIndex].classList.add('active');
    }

    // Init first role
    roles[0].classList.add('active');

    setInterval(nextRole, interval);
}

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, 0, target, 1500);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(start + range * eased);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/* ===== SCROLL ANIMATIONS (Custom AOS) ===== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, parseInt(delay));

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ===== SKILL BARS ===== */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar[data-width]');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

/* ===== SKILL FILTER ===== */
function initSkillFilter() {
    const catBtns = document.querySelectorAll('.skill-cat-btn');
    const skillCards = document.querySelectorAll('.skill-card[data-cat]');
    if (catBtns.length === 0) return;

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.getAttribute('data-cat');

            // Filter cards with animation
            skillCards.forEach((card, index) => {
                if (cat === 'all' || card.getAttribute('data-cat') === cat) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = `fadeInUp 0.4s ${index * 0.05}s ease both`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ===== TIMELINE TABS ===== */
function initTimelineTabs() {
    const tabs = document.querySelectorAll('.timeline-tab');
    const timelines = {
        experience: document.getElementById('experience-timeline'),
        formation: document.getElementById('formation-timeline')
    };
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetTab = tab.getAttribute('data-tab');

            Object.keys(timelines).forEach(key => {
                if (timelines[key]) {
                    if (key === targetTab) {
                        timelines[key].classList.remove('hidden');
                        // Re-animate items
                        timelines[key].querySelectorAll('.timeline-item').forEach((item, i) => {
                            item.style.animation = 'none';
                            item.offsetHeight;
                            item.style.animation = `fadeInUp 0.5s ${i * 0.1}s ease both`;
                        });
                    } else {
                        timelines[key].classList.add('hidden');
                    }
                }
            });
        });
    });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit');
        const submitText = submitBtn.querySelector('.submit-text');
        const submitIcon = submitBtn.querySelector('.fa-paper-plane');
        const loader = submitBtn.querySelector('.submit-loader');

        // Validate form
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            showFormError('Veuillez remplir tous les champs requis.');
            return;
        }

        if (!isValidEmail(email)) {
            showFormError('Veuillez entrer une adresse email valide.');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitText.textContent = 'Envoi en cours...';
        submitIcon.classList.add('hidden');
        loader.classList.remove('hidden');

        // Simulate sending (since this is a static site)
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Save to table if available
        try {
            await saveContactMessage({ name, email, subject, message });
        } catch (err) {
            console.log('Table save skipped:', err.message);
        }

        // Show success
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');

        // Reset after 5s
        setTimeout(() => {
            form.classList.remove('hidden');
            successMsg.classList.add('hidden');
            form.reset();
            submitBtn.disabled = false;
            submitText.textContent = 'Envoyer le message';
            submitIcon.classList.remove('hidden');
            loader.classList.add('hidden');
        }, 5000);
    });
}

async function saveContactMessage(data) {
    const response = await fetch('tables/contact_messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...data,
            sent_at: new Date().toISOString()
        })
    });
    if (!response.ok) throw new Error('Table save failed');
    return response.json();
}

function showFormError(message) {
    // Remove existing error
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.cssText = `
        padding: 0.8rem 1rem;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 8px;
        color: #ef4444;
        font-size: 0.9rem;
        margin-top: -0.5rem;
    `;
    error.textContent = message;

    const form = document.getElementById('contactForm');
    form.insertBefore(error, form.querySelector('.form-submit'));

    setTimeout(() => error.remove(), 4000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===== LANGUAGE BARS ANIMATION ===== */
function initLangBars() {
    const langFills = document.querySelectorAll('.lang-fill');
    if (langFills.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    langFills.forEach(fill => observer.observe(fill));
}

/* ===== PARALLAX EFFECT ===== */
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Parallax on hero orbs
    const orb1 = document.querySelector('.hero-orb-1');
    const orb2 = document.querySelector('.hero-orb-2');
    if (orb1) orb1.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)`;
    if (orb2) orb2.style.transform = `translate(-${scrollY * 0.03}px, -${scrollY * 0.06}px)`;
}, { passive: true });

/* ===== TYPING EFFECT FOR HERO TITLE ===== */
// Already handled by CSS animation, but adding a subtle text shimmer
function addTextShimmer() {
    const title2 = document.querySelector('.title-line-2');
    if (!title2) return;
    
    title2.addEventListener('mouseenter', () => {
        title2.style.backgroundSize = '200% auto';
        title2.style.animation = 'shimmer 1.5s linear infinite';
    });
    title2.addEventListener('mouseleave', () => {
        title2.style.backgroundSize = '100% auto';
        title2.style.animation = '';
    });
}

/* ===== PAGE TRANSITION ===== */
function initPageTransitions() {
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel"]):not([href^="mailto"]):not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            setTimeout(() => { window.location.href = href; }, 300);
        });
    });
}

/* ===== PERFORMANCE: Debounce ===== */
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/* ===== ENHANCED HOVER EFFECTS ===== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ===== CONSOLE SIGNATURE ===== */
console.log(`%c
 ██╗   ██╗ ███████╗
 ╚██╗ ██╔╝ ╚══███╔╝
  ╚████╔╝    ███╔╝ 
   ╚██╔╝   ███╔╝   
    ██║   ███████╗ 
    ╚═╝   ╚══════╝ 
`, 'color: #FF2D20; font-family: monospace;');

console.log('%cYannick Zomahoun — Portfolio', 'color: #FF2D20; font-weight: bold; font-size: 14px;');
console.log('%cDéveloppeur Web Laravel & Enseignant | Bénin 🇧🇯', 'color: #a0a0b8; font-size: 12px;');
console.log('%c📧 yannickzomahoun@email.com', 'color: #ffffff; font-size: 12px;');
