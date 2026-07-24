const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 30);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...mainNav.querySelectorAll('a')];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

/* ===========================
   Quote Confirmation Popup
   =========================== */

const params = new URLSearchParams(window.location.search);
const quoteModal = document.getElementById('quoteModal');

function openQuoteModal() {
  if (!quoteModal) {
    return;
  }

  quoteModal.classList.add('open');
  quoteModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeQuoteModal() {
  if (!quoteModal) {
    return;
  }

  quoteModal.classList.remove('open');
  quoteModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (params.get('submitted') === 'true') {
  openQuoteModal();

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + '#contact'
  );
}

document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeQuoteModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeQuoteModal();
  }
});
