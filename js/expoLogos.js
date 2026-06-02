// /js/expLogos.js
(function initExpLogos(){
  const ready = () => {
    const viewport = document.querySelector('.exp-logos-viewport');
    const track    = document.querySelector('.exp-logos-track');
    const btnL     = document.querySelector('.exp-btn.left');
    const btnR     = document.querySelector('.exp-btn.right');
    if(!viewport || !track || !btnL || !btnR) return;

    const perView = () => window.matchMedia('(max-width:560px)').matches ? 1
                      : window.matchMedia('(max-width:900px)').matches ? 2 : 3;

    const getGap = () => parseFloat(getComputedStyle(track).gap) || 24;
    const cardWidth = () => {
      const card = track.querySelector('.exp-logo-card');
      return card ? card.getBoundingClientRect().width : viewport.clientWidth;
    };

    const step = () => perView() * (cardWidth() + getGap());

    const scrollByStep = (dir=1) => {
      viewport.scrollBy({ left: dir * step(), behavior: 'smooth' });
    };

    const toggleBtns = () => {
      const max = track.scrollWidth - viewport.clientWidth - 1;
      btnL.disabled = viewport.scrollLeft <= 0;
      btnR.disabled = viewport.scrollLeft >= max;
    };

    btnL.addEventListener('click', () => scrollByStep(-1));
    btnR.addEventListener('click', () => scrollByStep(1));
    viewport.addEventListener('scroll', toggleBtns, { passive:true });
    window.addEventListener('resize', toggleBtns);

    // Soporte teclado
    viewport.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft')  scrollByStep(-1);
      if(e.key === 'ArrowRight') scrollByStep(1);
    });

    toggleBtns();
  };

  document.addEventListener('DOMContentLoaded', ready);
  window.addEventListener('load', ready);
})();
