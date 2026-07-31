/**
 * Comprehensive Geriatrics Website
 * Main JavaScript
 */

(function() {
  'use strict';

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      });
    });
  }

  // --- Header Shadow on Scroll ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }
    });
  }

  // --- Back to Top Button ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all others (optional - comment out for multi-open)
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
        }
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  // --- Tab Switching ---
  document.querySelectorAll('.tabs').forEach(function(tabContainer) {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const target = this.dataset.target;

        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        panes.forEach(function(pane) {
          pane.style.display = pane.id === target ? 'block' : 'none';
        });
      });
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active Nav Highlighting ---
  function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-main a, .mobile-menu a').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && href.indexOf(currentPath) !== -1) {
        link.classList.add('active');
      }
    });
  }
  setActiveNav();

  // --- Search Modal (Simple Alert for Demo) ---
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const query = prompt('Enter search term:');
      if (query) {
        window.location.href = 'articles.html?q=' + encodeURIComponent(query);
      }
    });
  }

  // --- Article Card Interactions ---
  document.querySelectorAll('.article-card').forEach(function(card) {
    const titleLink = card.querySelector('h4 a');
    if (titleLink) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          titleLink.click();
        }
      });
    }
  });

  // --- Form Validation ---
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('[name="name"]').value.trim();
      const email = this.querySelector('[name="email"]').value.trim();
      const message = this.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for your message! We will get back to you within 2 business days.');
      this.reset();
    });
  }

  // --- Load More Articles (Demo) ---
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      this.textContent = 'Loading...';
      setTimeout(function() {
        alert('In a production site, more articles would be loaded here via AJAX.');
        loadMoreBtn.textContent = 'Load More';
      }, 800);
    });
  }

  // --- Intersection Observer for Animations ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .article-card, .category-item, .metric-card').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // --- Current Year in Footer ---
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

})();
