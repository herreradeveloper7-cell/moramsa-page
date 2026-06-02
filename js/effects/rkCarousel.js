document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.rk-section');
  if (!section) return;

  const track = section.querySelector('.rk-track');
  const prev  = section.querySelector('.rk-prev');
  const next  = section.querySelector('.rk-next');

  let index = 0;

  function cardsToShow(){
    return parseInt(getComputedStyle(section).getPropertyValue('--rk-cards')) || 1;
  }

  function stepSizePx(){
    const items = track.children;
    if (items.length < 2) return items[0]?.getBoundingClientRect().width || 0;
    const a = items[0].getBoundingClientRect().left;
    const b = items[1].getBoundingClientRect().left;
    return b - a; 
  }

  function update(){
    const maxIndex = Math.max(track.children.length - cardsToShow(), 0);
    index = Math.min(Math.max(index, 0), maxIndex);
    const dx = stepSizePx();
    track.style.transform = `translateX(${-index * dx}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex;
  }

  next.addEventListener('click', () => { index += 1; update(); });
  prev.addEventListener('click', () => { index -= 1; update(); });

  let touchStartX = 0;
  let touchStartY = 0;

  track.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    index += deltaX < 0 ? 1 : -1;
    update();
  }, { passive: true });

  let rAF;
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      update();
      requestAnimationFrame(() => track.style.transition = '');
    });
  });

  update();
});
