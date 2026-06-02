export function iniciarReconocimientos() {
  const carousel = document.getElementById("recoCarousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".reco-viewport");
  const track    = carousel.querySelector(".reco-track");
  const prevBtn  = carousel.querySelector('.reco-btn.prev');
  const nextBtn  = carousel.querySelector('.reco-btn.next');

  if (!viewport || !track) return;

  const getStep = () => {
    const card = track.querySelector(".reco-card");
    if (!card) return 0;
    const cardRect = card.getBoundingClientRect();
    const cards = track.querySelectorAll(".reco-card");
    let gap = 16;
    if (cards.length > 1) {
      gap = Math.abs(cards[1].getBoundingClientRect().left - cardRect.right);
    }
    return Math.round(cardRect.width + gap);
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    prevBtn.disabled = viewport.scrollLeft <= 0;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll - 2;
  };

  const scrollByStep = (dir) => {
    const step = getStep();
    viewport.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
    setTimeout(updateButtons, 350);
  };

  prevBtn.addEventListener("click", () => scrollByStep("prev"));
  nextBtn.addEventListener("click", () => scrollByStep("next"));
  viewport.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  let isDown = false, startX = 0, startLeft = 0;
  const onDown = (e) => {
    isDown = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startLeft = viewport.scrollLeft;
    viewport.classList.add("dragging");
  };
  const onMove = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    viewport.scrollLeft = startLeft - (x - startX);
  };
  const onUp = () => { isDown = false; viewport.classList.remove("dragging"); };

  viewport.addEventListener("mousedown", onDown);
  viewport.addEventListener("mousemove", onMove);
  viewport.addEventListener("mouseleave", onUp);
  viewport.addEventListener("mouseup", onUp);
  viewport.addEventListener("touchstart", onDown, { passive: true });
  viewport.addEventListener("touchmove", onMove, { passive: true });
  viewport.addEventListener("touchend", onUp);

  updateButtons();
}
