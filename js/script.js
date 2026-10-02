/**
 * WEBZECH — Vanilla JavaScript
 * Lightweight, zero dependencies, performant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Sticky Header elevation on scroll
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // 3. Back to Top Scroll
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. FAQ Accordion Auto-close others (optional neat enhancement)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // 5. Contact Form Handler (Pure Static Fallback)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const companyEl = document.getElementById('company');
      const phoneEl = document.getElementById('phone');
      const messageEl = document.getElementById('message');

      const name = nameEl ? nameEl.value : '';
      const email = emailEl ? emailEl.value : '';
      const company = companyEl ? companyEl.value : '';
      const phone = phoneEl ? phoneEl.value : '';
      const message = messageEl ? messageEl.value : '';

      if (!name || !email || !message) {
        alert('Bitte füllen Sie Name, E-Mail und Nachricht aus.');
        return;
      }

      // Generate pre-filled mailto
      const subject = encodeURIComponent(`Projektanfrage von ${name}${company ? ` (${company})` : ''}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `E-Mail: ${email}\n` +
        (company ? `Unternehmen: ${company}\n` : '') +
        (phone ? `Telefon: ${phone}\n` : '') +
        `\nNachricht:\n${message}`
      );

      const mailtoUrl = `mailto:landingpage24.org@gmail.com?subject=${subject}&body=${body}`;
      
      // Notify user and launch mail client
      const feedback = document.getElementById('form-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = `
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; padding:1rem; border-radius:6px; margin-top:1rem;">
            <strong>Vielen Dank für Ihre Anfrage!</strong><br>
            Ihr E-Mail-Programm öffnet sich nun mit Ihren Angaben. Alternativ erreichen Sie uns sofort direkt über <a href="https://wa.me/4917629862291" target="_blank" style="text-decoration:underline; font-weight:bold;">WhatsApp (+49 176 29862291)</a> oder telefonisch.
          </div>
        `;
      }

      window.location.href = mailtoUrl;
    });
  }
});
