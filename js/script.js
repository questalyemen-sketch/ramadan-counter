const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const STORAGE_KEY = 'theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

function applyTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light', isLight);

  const icon = themeBtn?.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-sun', isLight);
    icon.classList.toggle('fa-moon', !isLight);
  }
}

function initTheme() {
  const saved = getSavedTheme();
  const theme = saved || getSystemTheme();
  applyTheme(theme);

  themeBtn?.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

function initMenu() {
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));

    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !isOpen);
      icon.classList.toggle('fa-xmark', isOpen);
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');

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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

function initSmoothScrollCloseMenu() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu?.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        menuBtn?.setAttribute('aria-expanded', 'false');
        const icon = menuBtn?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initReveal();
  initSmoothScrollCloseMenu();
});