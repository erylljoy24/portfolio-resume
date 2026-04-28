const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, .skill-card, .proj-card, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform += ' scale(2)';
    cur.style.background = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.background = 'var(--accent)';
  });
});

// ── Scroll Reveal ───────────────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const titles = [
  'Mobile / Full-Stack Developer',
  'Flutter Specialist',
  'Laravel API Engineer',
  'Android Developer',
];

let titleIndex   = 0;
let charIndex    = 0;
let isDeleting   = false;
const titleEl    = document.querySelector('.hero-title');

function type() {
  const current = titles[titleIndex];

  if (!isDeleting) {
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }

  titleEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor-blink"></span>';
  setTimeout(type, isDeleting ? 40 : 80);
}

setTimeout(type, 1200);
