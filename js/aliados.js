export default function iniciarAliados(root = document) {
  const icons = root.querySelectorAll(".aliado-icon:not([data-observed])");
  if (!icons.length) return;

  const obs = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.dataset.observed = "1";
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.3 });

  icons.forEach((el) => obs.observe(el));
}
