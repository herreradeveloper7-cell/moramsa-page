import { initReveal } from "./effects/reveal.js";
import { iniciarCarrusel } from "./carousel.js";
import { iniciarLogoMedia } from "./logoMedia.js";
import { iniciarNavBar } from "./navBar.js";

const initRegistry = {
  iniciarCarrusel,
  iniciarLogoMedia,
  iniciarNavBar,
};

const fetchedCache = new Map();

async function loadInto(el, url) {
  if (!url) return false;
  try {
    let html;
    if (fetchedCache.has(url)) {
      html = fetchedCache.get(url);
    } else {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      html = await res.text();
      fetchedCache.set(url, html);
    }
    el.innerHTML = html;
    return true;
  } catch (err) {
    console.error(`Error al cargar ${url}:`, err);
    return false;
  }
}

async function importFromAttr(el) {
  const modulePath = el.getAttribute("data-module");
  if (!modulePath) return null;
  const url = new URL(modulePath, document.baseURI).href;
  return import( url);
}

async function runInit(el) {
  if (el.hasAttribute("data-initialized")) return;

  const fnName = el.getAttribute("data-init");
  const hasModule = el.hasAttribute("data-module");

  if (hasModule) {
    try {
      const mod = await importFromAttr(el);
      if (!mod) return;

      if (fnName && typeof mod[fnName] === "function") {
        await mod[fnName](el);
        el.setAttribute("data-initialized", "1");
        return;
      }
      if (!fnName && typeof mod.default === "function") {
        await mod.default(el);
        el.setAttribute("data-initialized", "1");
        return;
      }
      console.warn(`[loader] Módulo cargado pero no encontré función`, { el, fnName, mod });
    } catch (e) {
      console.warn(`[loader] No se pudo importar ${el.getAttribute("data-module")}:`, e?.message || e);
    }
    return;
  }

  if (fnName && typeof initRegistry[fnName] === "function") {
    try {
      await initRegistry[fnName](el);
      el.setAttribute("data-initialized", "1");
    } catch (e) {
      console.warn(`Falló ${fnName}:`, e?.message || e);
    }
  }
}

function resolveComponentSrc(el) {
  const direct = el.getAttribute("data-src");
  if (direct) return direct;
  const name = el.getAttribute("data-component");
  if (!name) return null;
  return `./components/${name}.html`;
}

async function loadAllComponents(root = document) {
  const nodes = Array.from(root.querySelectorAll("[data-component]:not([data-loaded])"));

  await Promise.all(
    nodes.map(async (el) => {
      const src = resolveComponentSrc(el);
      const ok = await loadInto(el, src);
      if (ok) {
        el.setAttribute("data-loaded", "1");
        await runInit(el); 
      }
    })
  );
}

async function initLooseModules(root = document) {
  const nodes = Array.from(
    root.querySelectorAll("[data-module]:not([data-component]):not([data-initialized])")
  );
  for (const el of nodes) {
    await runInit(el);
  }
}

function observeNew() {
  const observer = new MutationObserver(async (mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof Element)) continue;

        if (node.matches("[data-component]") || node.querySelector("[data-component]")) {
          await loadAllComponents(node);
        }

        if (node.matches("[data-module]") || node.querySelector("[data-module]")) {
          await initLooseModules(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  return observer;
}

async function boot() {
  await loadAllComponents();  
  await initLooseModules(); 
  try { iniciarNavBar(); } catch (e) { console.warn("Navbar no inicializada:", e); }
  try { initReveal(); } catch (e) { console.warn("Reveal no inicializado:", e); }
  observeNew();              
}

window.addEventListener("DOMContentLoaded", boot);
