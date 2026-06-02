export function iniciarNavBar(root = document) {
  const nav = root.querySelector(".nav-bar") || document.querySelector(".nav-bar");
  if (!nav || nav.dataset.initialized === "1") return;

  const toggle = nav.querySelector(".nav-toggle");
  const menu = nav.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  function setMenuState(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenuState(false);
  });

  nav.dataset.initialized = "1";
}
