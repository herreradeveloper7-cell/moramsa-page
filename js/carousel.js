export function iniciarCarrusel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-button.right");
  const prevButton = document.querySelector(".carousel-button.left");
  const heroStrong = document.querySelector(".hero-strong");
  const heroLight = document.querySelector(".hero-light");
  const heroTitles = [
    {
      strong: "INVERSIONES CON VISI\u00d3N",
      light: "PATRIMONIO CON PROP\u00d3SITO.",
    },
    {
      strong: "EL PR\u00d3XIMO GRAN PASO DE TU EMPRESA",
      light: "EMPIEZA AQU\u00cd, CONT\u00c1CTANOS",
    },
    {
      strong: "INVERSIONES CON VISI\u00d3N",
      light: "PATRIMONIO CON PROP\u00d3SITO.",
    },
  ];

  let currentSlideIndex = 0;

  function moveToSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideTitle = heroTitles[index] || heroTitles[0];

    track.style.transform = `translateX(-${slideWidth * index}px)`;
    slides[currentSlideIndex]?.classList.remove("current-slide");
    slides[index]?.classList.add("current-slide");
    if (heroStrong) heroStrong.textContent = slideTitle.strong;
    if (heroLight) heroLight.textContent = slideTitle.light;
    currentSlideIndex = index;
  }

  nextButton?.addEventListener("click", () => {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  });

  prevButton?.addEventListener("click", () => {
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
  });

  setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  }, 6000);

  moveToSlide(0);
}
