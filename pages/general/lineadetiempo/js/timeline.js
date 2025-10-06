// timeline.js v2
// Animación de estrellas en movimiento (canvas)
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6,
      speed: Math.random() * 0.4 + 0.05,
      twinkle: Math.random()
    });
  }
}
createStars(Math.floor((window.innerWidth * window.innerHeight) / 80000));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    const alpha = 0.6 + 0.4 * Math.sin(Date.now() * 0.002 + star.twinkle * 10);
    ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height + 10) star.y = -10;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Scroll - aparición de eventos y activación de flechas
const events = document.querySelectorAll('.timeline-event');
function checkEvents() {
  const trigger = window.innerHeight * 0.85;
  events.forEach(ev => {
    const rect = ev.getBoundingClientRect();
    if (rect.top < trigger) {
      ev.classList.add('visible');
      // intensificar flecha y punto
      const dot = ev.querySelector('.timeline-dot');
      const arrow = ev.querySelector('.timeline-arrow');
      if (dot) {
        dot.style.boxShadow = '0 0 20px rgba(0,255,255,0.95)';
      }
      if (arrow) {
        arrow.style.background = 'linear-gradient(to bottom, rgba(0,255,255,0.95), transparent)';
      }
    }
  });
}
window.addEventListener('scroll', checkEvents);
window.addEventListener('load', checkEvents);

// pequeños efectos al entrar con teclado/tab (accesibilidad ligera)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
  if (e.key === 'End') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
