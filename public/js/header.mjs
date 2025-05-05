import { toHtmlElement } from "./toHtmlElement.mjs";

const navLinks = [
  { title: "Home", href: "index.html" },
  { title: "Projects", href: "projects.html" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/brandon-montalvo/",
    target: "_blank",
  },
];

function createHeader() {
  const navLinksHtml = navLinks
    .map(
      (link) =>
        `<a href="${link.href}"${link.target ? ` target="${link.target}"` : ""}>
          ${link.title}
        </a>`
    )
    .join("");

  const headerHtml = `
    <header>
      <div class="header-container">
        <h1>Brandon Montalvo</h1>
        <label>
          <input type="checkbox" autocomplete="off" />
            Dark mode
        </label>
        <button>Menu</button>
      </div>
      <nav id="nav">
        ${navLinksHtml}
      </nav>
    </header>
  `;

  const fragment = toHtmlElement(headerHtml);
  return fragment.firstElementChild;
}

const header = createHeader();
document.body.prepend(header);

function handleMenuButtonClick(e) {
  const nav = document.querySelector("nav");
  const button = e.target;
  if (window.innerWidth <= 640) {
    // 40rem = 640px
    if (nav.style.display === "none" || nav.style.display === "") {
      nav.style.display = "flex";
    } else {
      nav.style.display = "none";
    }
  }
}

function handleBodyClick(e) {
  const nav = document.querySelector("nav");
  const header = document.querySelector("header");
  const button = document.querySelector("header button");

  if (
    window.innerWidth <= 640 &&
    nav.style.display === "flex" &&
    !header.contains(e.target)
  ) {
    nav.style.display = "none";
  }
}

const menuButton = document.querySelector("header button");
menuButton.addEventListener("click", handleMenuButtonClick);

document.body.addEventListener("click", handleBodyClick);

console.log("Header loaded successfully.");

function initDarkMode() {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  document.body.classList.toggle("dark-mode", isDarkMode);
  // Update checkbox state to match
  const checkbox = document.querySelector("header label input");
  if (checkbox) {
    checkbox.checked = isDarkMode;
  }
}

document.querySelector("header label input").addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  document.body.classList.toggle("dark-mode", isChecked);
  localStorage.setItem("dark-mode", isChecked);
});

document.addEventListener("DOMContentLoaded", initDarkMode);
