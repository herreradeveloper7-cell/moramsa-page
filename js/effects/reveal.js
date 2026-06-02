export function initReveal({
  selector = ".reveal",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
} = {}) {
  const nodes = [...document.querySelectorAll(selector)].filter(
    (el) => !el.dataset.revealInit
  );
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => {
      el.classList.add("is-visible");
      el.dataset.revealInit = "1";
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          e.target.dataset.revealInit = "1";
          io.unobserve(e.target); 
        }
      });
    },
    { rootMargin, threshold }
  );

  nodes.forEach((el) => io.observe(el));
}
