
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const header = document.querySelector('header');

// Smart navigation for mobile - hide on scroll up, show on scroll down
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavVisibility() {
    const currentScrollY = window.scrollY;
    
    // Only apply this behavior on mobile/tablet devices
    if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past 100px - hide header
            header.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show header
            header.classList.remove('nav-hidden');
        }
    } else {
        // Always show header on desktop
        header.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavVisibility);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Reset nav visibility on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        header.classList.remove('nav-hidden');
    }
});

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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
