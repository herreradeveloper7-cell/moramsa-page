export function iniciarCTA(){
  const root = document.getElementById('ctaCarousel');
  if(!root) return;

  const viewport = root.querySelector('.cta-viewport');
  const track    = root.querySelector('.cta-track');
  const prevBtn  = root.querySelector('.cta-btn.prev');
  const nextBtn  = root.querySelector('.cta-btn.next');
  if(!viewport || !track) return;

  const getStep = () => {
    const cards = track.querySelectorAll('.cta-card');
    if(!cards.length) return 0;
    const a = cards[0].getBoundingClientRect();
    let gap = 16;
    if(cards.length > 1){
      const b = cards[1].getBoundingClientRect();
      gap = Math.round(b.left - a.right);
    }
    return Math.round(a.width + gap);
  };

  const updateButtons = () => {
    const max = track.scrollWidth - viewport.clientWidth;
    prevBtn.disabled = viewport.scrollLeft <= 0;
    nextBtn.disabled = viewport.scrollLeft >= max - 2;
  };

  const scrollByStep = (dir) => {
    const step = getStep();
    viewport.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
    setTimeout(updateButtons, 350);
  };

  prevBtn.addEventListener('click', () => scrollByStep('prev'));
  nextBtn.addEventListener('click', () => scrollByStep('next'));
  viewport.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);

  let isDown=false,startX=0,startLeft=0;
  const onDown = (e)=>{ isDown=true; startX=(e.touches?e.touches[0].clientX:e.clientX); startLeft=viewport.scrollLeft; };
  const onMove = (e)=>{ if(!isDown) return; const x=(e.touches?e.touches[0].clientX:e.clientX); viewport.scrollLeft = startLeft - (x - startX); };
  const onUp   = ()=>{ isDown=false; };

  viewport.addEventListener('mousedown', onDown);
  viewport.addEventListener('mousemove', onMove);
  viewport.addEventListener('mouseleave', onUp);
  viewport.addEventListener('mouseup', onUp);
  viewport.addEventListener('touchstart', onDown, { passive:true });
  viewport.addEventListener('touchmove',  onMove, { passive:true });
  viewport.addEventListener('touchend',   onUp);

  updateButtons();
}
