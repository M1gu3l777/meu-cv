// ================================
// MENU MOBILE
// ================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
        menuButton.textContent = "☰";
    });
});

// ================================
// DARK MODE
// ================================

const themeButton = document.getElementById("themeButton");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀";
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");

    localStorage.setItem("theme", darkMode ? "dark" : "light");
    themeButton.textContent = darkMode ? "☀" : "☾";
});

// ================================
// ANIMAÇÃO DAS SEÇÕES
// ================================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

sections.forEach(section => observer.observe(section));

// ================================
// ANO AUTOMÁTICO
// ================================

document.getElementById("currentYear").textContent = new Date().getFullYear();

// ================================
// NAVEGAÇÃO ATIVA
// ================================

const navigationLinks = document.querySelectorAll(".nav-links a");
const sectionsWithId = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navigationLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

                if (activeLink) activeLink.classList.add("active");
            }
        });
    },
    { rootMargin: "-30% 0px -60% 0px" }
);

sectionsWithId.forEach(section => sectionObserver.observe(section));
