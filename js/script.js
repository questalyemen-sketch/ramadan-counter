const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    themeBtn?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
  } else {
    body.classList.remove('light');
    themeBtn?.querySelector('i')?.classList.replace('fa-sun', 'fa-moon');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeBtn?.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

function initMenu() {
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

initTheme();
initMenu();
initReveal();
