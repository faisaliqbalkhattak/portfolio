const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

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

navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        closeMobileMenu();
    }
});

document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
        closeMobileMenu();
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

window.addEventListener('scroll', () => {
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

    links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});
