const menuButton = document.querySelector('.menu-button');
menuButton?.addEventListener('click', () => {
  const open = document.querySelector('.topbar').classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => {
  button.classList.toggle('active');
  button.textContent = button.classList.contains('active') ? '♥' : '♡';
}));
document.querySelector('#property-search').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#search-result').textContent = 'Encontramos imóveis especiais para o seu perfil. Um consultor pode ajudar você a refinar a busca.';
});
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-message').textContent = 'Obrigada! Em breve, um especialista Vértice entrará em contato.';
  event.currentTarget.reset();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
