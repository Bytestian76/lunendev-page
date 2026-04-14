// Animación fade-in al scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Cerrar menú al hacer click en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Carrusel genérico
const carousels = {};

function moveCarousel(carouselId, direction) {
  const track = document.getElementById(carouselId);
  if (!track) return;
  
  const slides = track.querySelectorAll('.carousel-slide');
  const slideCount = slides.length;
  
  if (!carousels[carouselId]) {
    carousels[carouselId] = 0;
  }
  
  carousels[carouselId] += direction;
  
  if (carousels[carouselId] < 0) {
    carousels[carouselId] = slideCount - 1;
  }
  if (carousels[carouselId] >= slideCount) {
    carousels[carouselId] = 0;
  }
  
  track.style.transform = `translateX(-${carousels[carouselId] * 100}%)`;
}

// Auto-play para carruseles
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = track.querySelectorAll('.carousel-slide');
  
  let currentIndex = 0;
  let autoPlayInterval;
  
  function autoPlay() {
    currentIndex = (currentIndex + 1) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  // Solo auto-play en desktop
  if (window.innerWidth > 768) {
    autoPlayInterval = setInterval(autoPlay, 5000);
  }
  
  // Pausar al hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  carousel.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      autoPlayInterval = setInterval(autoPlay, 5000);
    }
  });
});
