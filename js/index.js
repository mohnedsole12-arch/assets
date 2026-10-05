// Light and dark mode toggle
const themeButton = document.querySelector("#theme-toggle-button");
const html = document.documentElement;


const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  html.classList.add("dark");
} else if (savedTheme === "light") {
  html.classList.remove("dark");
}

function updateThemeButton() {
  const darkModeIsOn = html.classList.contains("dark");
  themeButton.setAttribute("aria-pressed", darkModeIsOn);
  themeButton.setAttribute(
    "aria-label",
    darkModeIsOn ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"
  );
}

updateThemeButton();

themeButton.addEventListener("click", function () {
  html.classList.toggle("dark");

  // Save the new theme so it stays selected next time
  const newTheme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", newTheme);
  updateThemeButton();
});

const navLinks = document.querySelectorAll('#header .nav-links a[href^="#"]');
const pageSections = [];

navLinks.forEach(function (link) {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) pageSections.push(section);
});

function updateActiveLink() {
  let currentSection = pageSections[0];

  pageSections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= 160) {
      currentSection = section;
    }
  });

  navLinks.forEach(function (link) {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;
    link.style.color = isActive ? "var(--color-primary)" : "";
    link.style.fontWeight = isActive ? "700" : "";
    link.setAttribute("aria-current", isActive ? "location" : "false");
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Scroll-to-top button
const topButton = document.querySelector("#scroll-to-top");

function showOrHideTopButton() {
  if (window.scrollY > 300) {
    topButton.classList.remove("opacity-0", "invisible");
    topButton.classList.add("opacity-100", "visible");
  } else {
    topButton.classList.add("opacity-0", "invisible");
    topButton.classList.remove("opacity-100", "visible");
  }
}

window.addEventListener("scroll", showOrHideTopButton);
showOrHideTopButton();

topButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Portfolio filters: show projects in the selected category
const filterButtons = document.querySelectorAll(".portfolio-filter");
const projectCards = document.querySelectorAll(".portfolio-item");

// Give the selected filter button its colors and reset the others
function activateFilter(button) {
  filterButtons.forEach(function (filterButton) {
    const isSelected = filterButton === button;
    filterButton.classList.toggle("active", isSelected);
    filterButton.setAttribute("aria-pressed", isSelected);
    filterButton.style.background = isSelected
      ? "linear-gradient(to right, var(--color-primary), var(--color-secondary))"
      : "";
    filterButton.style.color = isSelected ? "white" : "";
  });
}


activateFilter(filterButtons[0]);

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    activateFilter(button);

    projectCards.forEach(function (project) {
      const matchesCategory =
        selectedCategory === "all" || project.dataset.category === selectedCategory;
      project.hidden = !matchesCategory;
    });
  });
});


const carousel = document.querySelector("#testimonials-carousel");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const carouselDots = document.querySelectorAll(".carousel-indicator");
let currentCard = 0;

function getNumberOfVisibleCards() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function moveCarousel() {
  const visibleCards = getNumberOfVisibleCards();
  const lastCard = testimonialCards.length - visibleCards;

  if (currentCard > lastCard) currentCard = lastCard;
  if (currentCard < 0) currentCard = 0;

  const cardWidth = testimonialCards[0].getBoundingClientRect().width;
  const distance = cardWidth * currentCard;
  const direction = html.dir === "rtl" ? "" : "-";
  carousel.style.transform = `translateX(${direction}${distance}px)`;

  carouselDots.forEach(function (dot, index) {
    const isSelected = index === currentCard;
    dot.setAttribute("aria-selected", isSelected);
    dot.classList.toggle("bg-accent", isSelected);
    dot.classList.toggle("dark:bg-accent", isSelected);
    dot.classList.toggle("bg-slate-400", !isSelected);
    dot.classList.toggle("dark:bg-slate-600", !isSelected);
  });
}

document.querySelector("#next-testimonial").addEventListener("click", function () {
  currentCard++;
  moveCarousel();
});

document.querySelector("#prev-testimonial").addEventListener("click", function () {
  currentCard--;
  moveCarousel();
});

carouselDots.forEach(function (dot) {
  dot.addEventListener("click", function () {
    currentCard = Number(dot.dataset.index);
    moveCarousel();
  });
});

window.addEventListener("resize", moveCarousel);
moveCarousel();

// Open and close the appearance settings panel
const settingsPanel = document.querySelector("#settings-sidebar");
const settingsButton = document.querySelector("#settings-toggle");
const closeSettingsButton = document.querySelector("#close-settings");

function openSettings() {
  settingsPanel.classList.remove("translate-x-full");
  settingsPanel.classList.add("translate-x-0");
  settingsPanel.setAttribute("aria-hidden", "false");
  settingsButton.setAttribute("aria-expanded", "true");
}

function closeSettings() {
  settingsPanel.classList.add("translate-x-full");
  settingsPanel.classList.remove("translate-x-0");
  settingsPanel.setAttribute("aria-hidden", "true");
  settingsButton.setAttribute("aria-expanded", "false");
}

settingsButton.addEventListener("click", function () {
  if (settingsPanel.getAttribute("aria-hidden") === "true") {
    openSettings();
  } else {
    closeSettings();
  }
});

closeSettingsButton.addEventListener("click", closeSettings);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeSettings();
});

// Available theme colors
const themeColors = [
  { name: "بنفسجي", primary: "#6366f1", secondary: "#8b5cf6", accent: "#ec4899" },
  { name: "أزرق", primary: "#0ea5e9", secondary: "#2563eb", accent: "#06b6d4" },
  { name: "أخضر", primary: "#10b981", secondary: "#059669", accent: "#84cc16" },
  { name: "برتقالي", primary: "#f97316", secondary: "#ea580c", accent: "#eab308" },
  { name: "وردي", primary: "#ec4899", secondary: "#db2777", accent: "#a855f7" },
  { name: "أحمر", primary: "#ef4444", secondary: "#dc2626", accent: "#f97316" },
  { name: "تركوازي", primary: "#14b8a6", secondary: "#0d9488", accent: "#38bdf8" },
  { name: "رمادي", primary: "#64748b", secondary: "#475569", accent: "#0ea5e9" },
];

const colorButtonsArea = document.querySelector("#theme-colors-grid");

function applyColor(color) {
  html.style.setProperty("--color-primary", color.primary);
  html.style.setProperty("--color-secondary", color.secondary);
  html.style.setProperty("--color-accent", color.accent);
  localStorage.setItem("portfolio-color", color.name);
}

themeColors.forEach(function (color) {
  const colorButton = document.createElement("button");
  colorButton.type = "button";
  colorButton.title = color.name;
  colorButton.setAttribute("aria-label", `اختيار اللون ${color.name}`);
  colorButton.className =
    "w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform";
  colorButton.style.background = `linear-gradient(135deg, ${color.primary}, ${color.secondary}, ${color.accent})`;
  colorButton.addEventListener("click", function () {
    applyColor(color);
  });
  colorButtonsArea.appendChild(colorButton);
});

const savedColorName = localStorage.getItem("portfolio-color");
const savedColor = themeColors.find(function (color) {
  return color.name === savedColorName;
});
if (savedColor) applyColor(savedColor);

// Change and save the selected font
const fontButtons = document.querySelectorAll(".font-option");
const fontNames = ["tajawal", "cairo", "alexandria"];

function applyFont(fontName) {
  fontNames.forEach(function (font) {
    document.body.classList.remove(`font-${font}`);
  });
  document.body.classList.add(`font-${fontName}`);
  localStorage.setItem("portfolio-font", fontName);

  fontButtons.forEach(function (button) {
    const isSelected = button.dataset.font === fontName;
    button.setAttribute("aria-checked", isSelected);
    button.classList.toggle("active", isSelected);
  });
}

fontButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    applyFont(button.dataset.font);
  });
});

const savedFont = localStorage.getItem("portfolio-font") || "tajawal";
applyFont(savedFont);

// Reset the color and font to their defaults
document.querySelector("#reset-settings").addEventListener("click", function () {
  localStorage.removeItem("portfolio-color");
  localStorage.removeItem("portfolio-font");
  applyColor(themeColors[0]);
  applyFont("tajawal");
});
