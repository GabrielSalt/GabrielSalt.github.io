(() => {
  const cards = document.querySelectorAll('.project-card--collapsible');
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  function setExpanded(card, expanded) {
    card.classList.toggle('is-expanded', expanded);
    const summary = card.querySelector('.project-summary');
    if (summary) {
      summary.setAttribute('aria-expanded', String(expanded));
    }
  }

  function syncLayout() {
    cards.forEach((card) => {
      setExpanded(card, !mobileQuery.matches);
    });
  }

  cards.forEach((card) => {
    const summary = card.querySelector('.project-summary');
    if (!summary) return;

    summary.addEventListener('click', () => {
      if (!mobileQuery.matches) return;
      setExpanded(card, !card.classList.contains('is-expanded'));
    });
  });

  syncLayout();
  mobileQuery.addEventListener('change', syncLayout);
})();
