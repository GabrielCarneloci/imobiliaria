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
