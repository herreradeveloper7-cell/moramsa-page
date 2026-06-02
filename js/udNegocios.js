(function initAccesosSliderWhenReady() {
  const ready = () => {
    const viewport = document.querySelector('.accesos-viewport');
    const track    = document.querySelector('.accesos-track');
    const btnL     = document.querySelector('.accesos-btn.left');
    const btnR     = document.querySelector('.accesos-btn.right');
    if (!viewport || !track || !btnL || !btnR) return;

    const getStep = () => {
      const firstCard = track.querySelector('.acceso-card');
      if (!firstCard) return viewport.clientWidth * 0.9;
      const cardStyles = getComputedStyle(track);
      const gap = parseFloat(cardStyles.gap) || 30;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const scrollByStep = (dir = 1) =>
      viewport.scrollBy({ left: dir * getStep(), behavior: 'smooth' });

    const toggleBtns = () => {
      const max = track.scrollWidth - viewport.clientWidth - 1;
      btnL.disabled = viewport.scrollLeft <= 0;
      btnR.disabled = viewport.scrollLeft >= max;
      btnL.style.opacity = btnL.disabled ? 0.4 : 1;
      btnR.style.opacity = btnR.disabled ? 0.4 : 1;
    };

    btnL.addEventListener('click', () => scrollByStep(-1));
    btnR.addEventListener('click', () => scrollByStep(1));
    viewport.addEventListener('scroll', toggleBtns, { passive: true });
    window.addEventListener('resize', toggleBtns);
    toggleBtns();
  };

  document.addEventListener('DOMContentLoaded', ready);
  window.addEventListener('load', ready);
})();
