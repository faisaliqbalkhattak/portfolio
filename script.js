const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const projectDropdown = document.querySelector('.nav-dropdown');
const projectToggle = document.querySelector('.nav-dropdown-toggle');

mobileMenu.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Open navigation');
}

function closeProjectDropdown() {
    projectDropdown.classList.remove('open');
    projectToggle.setAttribute('aria-expanded', 'false');
}

projectToggle.addEventListener('click', () => {
    const isOpen = projectDropdown.classList.toggle('open');
    projectToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        closeMobileMenu();
        closeProjectDropdown();
    }
});

document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
        closeMobileMenu();
    }
    if (!projectDropdown.contains(event.target)) {
        closeProjectDropdown();
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

if (window.lucide) {
    window.lucide.createIcons();
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    const contact = document.getElementById('contact');
    if (contact) {
        const contactBounds = contact.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(contactBounds.bottom, window.innerHeight) - Math.max(contactBounds.top, 0));
        if (visibleHeight >= contactBounds.height * 0.5) {
            current = 'contact';
        }
    }

    links.forEach((link) => {
        const linkSection = link.closest('.nav-dropdown')?.dataset.navSection || link.getAttribute('href').slice(1);
        const sectionForNav = current === 'demo-videos' ? 'projects' : current;
        link.classList.toggle('active', linkSection === sectionForNav && !link.closest('.nav-dropdown'));
    });
    projectDropdown.classList.toggle('active', current === 'projects' || current === 'demo-videos');
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
