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

  const ageEl = document.getElementById('site-age');
  if (ageEl) {
    const birthYear = 2005;
    const birthMonth = 6; // June (calendar month 1–12)
    const birthDay = 12;
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    let age = today.getFullYear() - birthYear;
    const birthdayPassed =
      todayMonth > birthMonth ||
      (todayMonth === birthMonth && today.getDate() >= birthDay);
    if (!birthdayPassed) age -= 1;
    ageEl.textContent = String(age);
  }
})();
