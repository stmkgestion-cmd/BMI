const flags = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸' };

function initTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) document.body.classList.add('light');
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  function updateIcon() { btn.textContent = document.body.classList.contains('light') ? '☀' : '☾'; }
  updateIcon();
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateIcon();
  });
}

function initBurger() {
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;
  burger.addEventListener('click', e => {
    e.stopPropagation();
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !menu.contains(e.target)) {
      burger.classList.remove('open');
      menu.classList.remove('open');
    }
  });
}

function initLangDropdown(setLangFn, translations) {
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const switcher = document.getElementById('langSwitcher');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  document.querySelectorAll('#langMenu .lang-option[data-lang]').forEach(el => {
    el.addEventListener('click', () => {
      setLangFn(el.getAttribute('data-lang'));
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (switcher && !switcher.contains(e.target)) {
      btn.classList.remove('open');
      menu.classList.remove('open');
    }
  });
  const savedLang = localStorage.getItem('language') || navigator.language.slice(0, 2);
  setLangFn(translations[savedLang] ? savedLang : 'fr');
}
