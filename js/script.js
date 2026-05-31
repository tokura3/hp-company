const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});

// --- Mobile menu toggle and header padding adjustment ---
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const header = document.querySelector('.header');

function updateBodyPadding() {
  const pos = window.getComputedStyle(header).position;
  if (pos === 'fixed') {
    document.body.style.paddingTop = header.offsetHeight + 'px';
  } else {
    document.body.style.paddingTop = '';
  }
}

function closeMenu() {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && nav && header) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // when opening, keep body padding based on header height
    updateBodyPadding();
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // Update padding on load and resize
  window.addEventListener('load', updateBodyPadding);
  window.addEventListener('resize', updateBodyPadding);
}