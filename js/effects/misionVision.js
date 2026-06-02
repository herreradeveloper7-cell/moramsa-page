document.addEventListener('DOMContentLoaded', () => {
  const mvSection = document.querySelector('.mv');
  if (!mvSection) return; 

  const io = new IntersectionObserver((entries) => {
    const e = entries[0];
    if (e.isIntersecting) {
      mvSection.classList.add('is-visible'); 
      io.disconnect(); 
    }
  }, { threshold: 0.25 });

  io.observe(mvSection);
});
