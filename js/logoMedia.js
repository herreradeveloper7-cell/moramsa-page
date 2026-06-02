export function iniciarLogoMedia() {
  document.addEventListener("click", (e) => {
    const boton = e.target.closest(".logo-media-social");
    if (boton) {
      const socialIcons = document.querySelector(".social-icons");
      if (socialIcons) {
        socialIcons.classList.toggle("active");
      }
    }
  });
}
