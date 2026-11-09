
const projects = [
  {
    title: "Personal Portfolio",
    description: "A responsive personal website to introduce myself, share skills, and showcase my work.",
    category: "Websites",
    technologies: ["HTML", "CSS", "JavaScript"],
    symbol: "</>",
    sourceUrl: "https://github.com/Chessman007007/",
    demoUrl: "https://example.com/"
  },
  {
    title: "Hospital booking management system",
    description: "A web-based system for booking doctor appointments, managing patient records, and organizing hospital schedules efficiently.",
    category: "Websites",
    technologies: ["HTML", "CSS", "Node.js","Express", "MySQL"],
    symbol: "</>",
    sourceUrl: "https://github.com/Chessman007007/",
    demoUrl: "https://example.com/"
  },
  {
    title: "Music Quiz",
    description: "An interactive game that challenges players to guess songs, identify artists, and test their music knowledge through fun and engaging quizzes.",
    category: "Games",
    technologies: ["HTML", "CSS", "JavaScript"],
    symbol: "</>",
    sourceUrl: "https://github.com/Chessman007007/",
    demoUrl: "https://example.com/"
  },
  {
    title: "Ecommerce ",
    description: "A user-friendly online shopping platform that allows customers to browse products, explore categories, add items to their cart, and purchase products easily.",
    category: "Websites",
    technologies: ["HTML", "CSS", "JavaScript","Reactjs","Nodejs"],
    symbol: "</>",
    sourceUrl: "https://github.com/Chessman007007/",
    demoUrl: "https://example.com/"
  }
];

const projectsGrid = document.querySelector("#projectsGrid");
const resultCount = document.querySelector("#resultCount");
const filterButtons = [...document.querySelectorAll(".filter-btn")];

function renderProjects(category = "All") {
  const visibleProjects = category === "All"
    ? projects
    : projects.filter(project => project.category === category);

  projectsGrid.replaceChildren();

  visibleProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const visual = document.createElement("div");
    visual.className = `project-visual visual-${(projects.indexOf(project) % 4) + 1}`;
    visual.setAttribute("aria-hidden", "true");
    const symbol = document.createElement("span");
    symbol.className = "visual-symbol";
    symbol.textContent = project.symbol;
    visual.append(symbol);

    const content = document.createElement("div");
    content.className = "project-content";

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "project-category";
    categoryLabel.textContent = project.category;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const techList = document.createElement("div");
    techList.className = "tech-list";
    project.technologies.forEach(technology => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = technology;
      techList.append(tag);
    });

    const links = document.createElement("div");
    links.className = "project-links";
    const source = document.createElement("a");
    source.href = project.sourceUrl;
    source.target = "_blank";
    source.rel = "noreferrer";
    source.textContent = "Source code ↗";
    source.setAttribute("aria-label", `Source code for ${project.title} (opens in a new tab)`);
    const demo = document.createElement("a");
    demo.href = project.demoUrl;
    demo.target = "_blank";
    demo.rel = "noreferrer";
    demo.textContent = "Live demo ↗";
    demo.setAttribute("aria-label", `Live demo for ${project.title} (opens in a new tab)`);
    links.append(source, demo);

    content.append(categoryLabel, title, description, techList, links);
    card.append(visual, content);
    projectsGrid.append(card);
  });

  resultCount.textContent = `Showing ${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"}`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProjects(selectedCategory);
  });
});


const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

function setMenuOpen(open) {
  primaryNav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  
  if (window.matchMedia("(max-width: 700px)").matches) {
    primaryNav.inert = !open;
  } else {
    primaryNav.inert = false;
  }
}
setMenuOpen(false);
menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
primaryNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenuOpen(false));
});
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 700px)").matches) {
    primaryNav.inert = false;
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  } else if (menuToggle.getAttribute("aria-expanded") !== "true") {
    primaryNav.inert = true;
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});


const themeToggle = document.querySelector("#themeToggle");
function readSavedTheme() {
  try { return localStorage.getItem("portfolio-theme"); }
  catch (error) { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem("portfolio-theme", theme); }
  catch (error) { /* Theme still works for this visit if storage is unavailable. */ }
}
function applyTheme(theme, persist = false) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.innerHTML = dark ? "☀ <span>Theme</span>" : "☾ <span>Theme</span>";
  if (persist) saveTheme(theme);
}
applyTheme(readSavedTheme() === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});


const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const charCount = document.querySelector("#charCount");
const formStatus = document.querySelector("#formStatus");

const fieldRules = [
  {
    input: nameInput,
    error: document.querySelector("#nameError"),
    validate: value => value.trim().length >= 2,
    message: "Please enter at least 2 characters for your name."
  },
  {
    input: emailInput,
    error: document.querySelector("#emailError"),
    validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: "Please enter a valid email address."
  },
  {
    input: messageInput,
    error: document.querySelector("#messageError"),
    validate: value => value.trim().length >= 20 && value.trim().length <= 500,
    message: "Your message must be 20–500 characters after trimming spaces."
  }
];

function validateField(rule) {
  const valid = rule.validate(rule.input.value);
  rule.error.textContent = valid ? "" : rule.message;
  rule.input.setAttribute("aria-invalid", String(!valid));
  return valid;
}

function updateCharacterCount() {
  const length = messageInput.value.length;
  charCount.textContent = `${length} / 500`;
  charCount.setAttribute("aria-label", `${length} of 500 characters`);
}
messageInput.addEventListener("input", updateCharacterCount);
updateCharacterCount();

fieldRules.forEach(rule => {
  rule.input.addEventListener("input", () => {
    formStatus.textContent = "";
  
    if (rule.validate(rule.input.value)) {
      rule.error.textContent = "";
      rule.input.setAttribute("aria-invalid", "false");
    } else if (rule.error.textContent) {
      validateField(rule);
    }
  });
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  formStatus.textContent = "";
  const invalidRules = fieldRules.filter(rule => !validateField(rule));
  if (invalidRules.length > 0) {
    invalidRules[0].input.focus();
    formStatus.textContent = "Please check the highlighted fields and try again.";
    return;
  }
  formStatus.textContent = "Demo only. Your message has not been sent.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
