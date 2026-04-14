// Animación scroll
document.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// Carrusel
let index = 0;

function cambiarSlide(dir) {
  const slides = document.querySelectorAll(".slide");
  index += dir;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((s, i) => {
    s.style.display = i === index ? "block" : "none";
  });
}

window.onload = () => cambiarSlide(0);