// Inicializar Animações de Scroll
AOS.init({ duration: 1000, once: true });

// Dark/Light Mode
const themeIcon = document.getElementById('theme-icon');
themeIcon.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Filtro de Projetos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Menu Mobile
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("mobile-menu");
    const nav = document.getElementById("navLinks");

    if (!menu || !nav) {
        console.error("Menu ou nav não encontrados");
        return;
    }

    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg)';
        navbar.style.padding = '1rem 10%';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.padding = '1.5rem 10%';
        navbar.style.boxShadow = 'none';
    }
});
