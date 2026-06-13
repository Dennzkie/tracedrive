// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

function setTheme(theme) {
  if (theme === "light") {
    html.setAttribute("data-theme", "light");
    themeToggle.querySelector("i").classList.remove("fa-moon");
    themeToggle.querySelector("i").classList.add("fa-sun");
  } else {
    html.removeAttribute("data-theme");
    themeToggle.querySelector("i").classList.remove("fa-sun");
    themeToggle.querySelector("i").classList.add("fa-moon");
  }
  localStorage.setItem("tracedrive-theme", theme);
}

// Load saved theme (default: dark)
const savedTheme = localStorage.getItem("tracedrive-theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme =
    html.getAttribute("data-theme") === "light" ? "light" : "dark";
  setTheme(currentTheme === "light" ? "dark" : "light");
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section, .hero");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = navToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== ACTIVE SECTION HIGHLIGHTING =====
function updateActiveLink() {
  let current = "";
  const scrollPos = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===== SCROLL REVEAL ANIMATIONS =====
function revealElements() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ===== STAGGERED CARD ANIMATIONS =====
function staggerCards() {
  const cardGroups = document.querySelectorAll(
    ".concept-grid, .problem-grid, .solution-features-list, .features-grid, .relevance-grid, .stakeholders-grid, .improvement-grid"
  );

  cardGroups.forEach((group) => {
    const cards = group.children;
    Array.from(cards).forEach((card, index) => {
      card.style.transitionDelay = `${index * 80}ms`;
    });
  });
}

window.addEventListener("load", staggerCards);

// ===== PARALLAX FLOATING CIRCLES =====
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
});

function animateCircles() {
  currentX += (mouseX - currentX) * 0.05;
  currentY += (mouseY - currentY) * 0.05;

  const circles = document.querySelectorAll(".floating-circle");
  circles.forEach((circle, index) => {
    const speed = (index + 1) * 15;
    const x = currentX * speed;
    const y = currentY * speed;
    circle.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// ===== TYPING EFFECT FOR HERO (subtle) =====
function addGlowPulse() {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    setInterval(() => {
      heroTitle.style.textShadow = "0 0 40px rgba(0, 212, 255, 0.3)";
      setTimeout(() => {
        heroTitle.style.textShadow = "none";
      }, 1500);
    }, 3000);
  }
}

// ===== INITIAL LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(revealElements, 100);
  addGlowPulse();
  document.body.classList.add("loaded");
});
