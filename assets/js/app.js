/*==================================================
OURIVESARIA FERREIRA
MAIN.JS
==================================================*/

"use strict";

/*==================================================
HEADER
==================================================*/

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    const updateHeader = () => {

        header.classList.toggle("scrolled", window.scrollY > 80);

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

}

/*==================================================
REVEAL
==================================================*/

function initReveal() {

    const elements = document.querySelectorAll(
        ".section-header, .collection-card, .service-card, .history-image, .history-content, .testimonial-card, .brand-item, .contact-item, .contact-form, .cta-box"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            obs.unobserve(entry.target);

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}

/*==================================================
SMOOTH SCROLL
==================================================*/

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("click", event => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/*==================================================
LOADER
==================================================*/

function initLoader() {

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        if (loader) {

            loader.classList.add("loaded");

        }

        document.body.classList.add("loaded");

    });

}

/*==================================================
MOBILE MENU
==================================================*/

function initMobileMenu() {

    const toggle = document.querySelector(".mobile-toggle");
    const menu = document.querySelector(".mobile-menu");

    if (!toggle || !menu) return;

    const closeMenu = () => {

        toggle.classList.remove("active");
        menu.classList.remove("active");
        document.body.classList.remove("menu-open");

    };

    toggle.addEventListener("click", () => {

        toggle.classList.toggle("active");
        menu.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}

/*==================================================
PARALLAX HERO
==================================================*/

function initParallax() {

    const image = document.querySelector(".hero-video img");

    if (!image) return;

    const updateParallax = () => {

        image.style.transform =
            `translateY(${window.pageYOffset * 0.25}px) scale(1.08)`;

    };

    updateParallax();

    window.addEventListener("scroll", updateParallax, {
        passive: true
    });

}

/*==================================================
COUNTERS
==================================================*/

function initCounters() {

    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;
            const target = Number(element.dataset.count);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 120));

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                element.textContent = current;

            }, 15);

            obs.unobserve(element);

        });

    }, {
        threshold: 0.3
    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/*==================================================
ACTIVE MENU
==================================================*/

function initActiveMenu() {

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".navigation a");

    if (!sections.length || !links.length) return;

    const updateActiveMenu = () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {

                current = section.id;

            }

        });

        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );

        });

    };

    updateActiveMenu();

    window.addEventListener("scroll", updateActiveMenu, {
        passive: true
    });

}

/*==================================================
GALLERY HOVER
==================================================*/

function initGallery() {

    const cards = document.querySelectorAll(".collection-card");

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            card.style.setProperty("--x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--y", `${event.clientY - rect.top}px`);

        });

    });

}

/*==================================================
BUTTON RIPPLE
==================================================*/

function initRipple() {

    const buttons = document.querySelectorAll(".btn-gold, .header-button");

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            const ripple = document.createElement("span");

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.className = "ripple";

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);

        });

    });

}

/*==================================================
PRELOAD IMAGES
==================================================*/

function preloadImages() {

    document.querySelectorAll("img").forEach(img => {

        if (!img.src) return;

        const preload = new Image();

        preload.src = img.src;

    });

}

/*==================================================
CURRENT YEAR
==================================================*/

function updateYear() {

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

}

/*==================================================
WHATSAPP FORM
==================================================*/

function initWhatsAppForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const texto =
`Olá! Recebeu um novo contacto através do site da Ourivesaria Ferreira.

👤 Nome: ${nome}
📧 Email: ${email}
📞 Telefone: ${telefone}
📝 Assunto: ${assunto}

💬 Mensagem:
${mensagem}`;

        // ALTERAR PELO NÚMERO DO WHATSAPP DA OURIVESARIA
        const numero = "351938066695";

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");

    });

}


/*==================================================
INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initHeader();
    initReveal();
    initSmoothScroll();
    initLoader();
    initMobileMenu();
    initParallax();
    initCounters();
    initActiveMenu();
    initGallery();
    initRipple();
    initWhatsAppForm();

});

window.addEventListener("load", () => {

    preloadImages();
    updateYear();

});

/*==================================================
END
==================================================*/

console.log("Ourivesaria Ferreira Premium v3.1 Loaded");