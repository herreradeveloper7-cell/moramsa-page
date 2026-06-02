
export function iniciarExperiencia() {
  const root = document.querySelector('.experiencia-slider');
  if (!root) return;

  const viewport = root.querySelector('.experiencia-viewport') || root;
  const track    = root.querySelector('.experiencia-cards');
  const prevBtn  = root.querySelector('.btn-flecha.izquierda');
  const nextBtn  = root.querySelector('.btn-flecha.derecha');

  if (!viewport || !track || !prevBtn || !nextBtn) return;

  viewport.style.overflowX = 'auto';
  viewport.style.overflowY = 'visible';
  viewport.style.webkitOverflowScrolling = 'touch';

  const getStep = () => {
    const first = track.querySelector('.experiencia-card');
    if (!first) return Math.round(viewport.clientWidth * 0.8);

    const rect1 = first.getBoundingClientRect();
    let gap = 16;
    const second = first.nextElementSibling;
    if (second && second.classList.contains('experiencia-card')) {
      const rect2 = second.getBoundingClientRect();
      gap = Math.max(0, Math.round(rect2.left - rect1.right));
    } else {
      const cs = getComputedStyle(track);
      gap = parseFloat(cs.gap) || 16;
    }
    return Math.round(rect1.width + gap);
  };

  const maxScroll = () =>
    Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  const updateButtons = () => {
    const max = maxScroll();
    const left = viewport.scrollLeft;
    prevBtn.disabled = left <= 1;
    nextBtn.disabled = left >= max - 1;
  };

  const scrollByStep = (dir) => {
    const step = getStep();
    const delta = dir === 'next' ? step : -step;
    viewport.scrollBy({ left: delta, behavior: 'smooth' });
    requestAnimationFrame(updateButtons);
  };

  prevBtn.onclick = () => scrollByStep('prev');
  nextBtn.onclick = () => scrollByStep('next');
  viewport.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);

  let isDown = false, startX = 0, startLeft = 0;
  const onDown = (e) => {
    isDown = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startLeft = viewport.scrollLeft;
    viewport.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    viewport.scrollLeft = startLeft - (x - startX);
  };
  const onUp = () => {
    isDown = false;
    viewport.style.cursor = '';
  };
  viewport.addEventListener('mousedown', onDown);
  viewport.addEventListener('mousemove', onMove);
  viewport.addEventListener('mouseleave', onUp);
  viewport.addEventListener('mouseup', onUp);
  viewport.addEventListener('touchstart', onDown, { passive: true });
  viewport.addEventListener('touchmove', onMove, { passive: true });
  viewport.addEventListener('touchend', onUp);

  requestAnimationFrame(updateButtons);
}
