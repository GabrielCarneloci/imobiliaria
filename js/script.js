// Menu mobile
const menuButton = document.querySelector('.menu-button');
const topbar = document.querySelector('.topbar');
menuButton?.addEventListener('click', () => {
  const open = topbar.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
topbar?.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    topbar.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

// Favoritar imóvel
document.querySelectorAll('.heart').forEach(button => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('active');
    button.textContent = active ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(active));
  });
});

// Busca de imóveis
const searchForm = document.querySelector('#property-search');
searchForm?.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#search-result').textContent =
    'Encontramos imóveis especiais para o seu perfil. Um consultor pode ajudar você a refinar a busca.';
});

// Formulário de contato
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  form.querySelector('.form-message').textContent =
    'Obrigada! Em breve, um especialista Vértice entrará em contato.';
  form.reset();
});

// Barra de progresso de rolagem
const progressLine = document.querySelector('#progress-line');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressLine) progressLine.style.width = pct + '%';
};
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Brilho que acompanha o cursor no hero
const heroGlow = document.querySelector('#hero-glow');
document.querySelector('.hero')?.addEventListener('mousemove', event => {
  const rect = event.currentTarget.getBoundingClientRect();
  heroGlow.style.setProperty('--x', `${event.clientX - rect.left}px`);
  heroGlow.style.setProperty('--y', `${event.clientY - rect.top}px`);
});

// Contagem animada das estatísticas
const countTargets = document.querySelectorAll('[data-count-to]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (countTargets.length && reduceMotion) {
  countTargets.forEach(element => {
    element.textContent = (element.dataset.prefix || '') + element.dataset.countTo + (element.dataset.suffix ?? '');
  });
} else if (countTargets.length) {
  const animateCount = element => {
    const target = Number(element.dataset.countTo);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix ?? '';
    const duration = 1200;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    countTargets.forEach(element => countObserver.observe(element));
  } else {
    countTargets.forEach(animateCount);
  }
}

// Revelação ao rolar
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('visible'));
}
