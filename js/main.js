// Google Sheets Web App URL (Replace with your own deployed Apps Script URL)
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/XXXXX/exec';

// Mobile nav toggle and simple form validation
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      const expanded = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Contact form validation if present
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const cls = contactForm.querySelector('[name="class"]').value;
      const board = contactForm.querySelector('[name="board"]').value;
      const contact = contactForm
        .querySelector('[name="contact"]')
        .value.trim();
      const message = contactForm
        .querySelector('[name="message"]')
        .value.trim();
      let errors = [];
      if (name.length < 2) errors.push('Please enter your full name.');
      if (!['10', '12', 'other'].includes(cls)) errors.push('Select your class.');
      if (board.length < 2) errors.push('Select your board.');
      if (contact.length < 6) errors.push('Enter a valid phone or email.');
      if (message.length < 10) errors.push('Tell us a bit more about your query.');

      const feedback = document.getElementById('formFeedback');
      if (errors.length) {
        feedback.innerText = errors.join(' ');
        feedback.style.color = 'var(--danger)';
        feedback.style.display = 'block';
        return;
      }

      // Visual sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }
      feedback.innerText = 'Sending your request, please wait...';
      feedback.style.color = 'var(--brand)';
      feedback.style.display = 'block';

      if (GOOGLE_SHEET_URL) {
        // Send data to Google Sheets Web App
        fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          body: new FormData(contactForm)
        })
          .then(response => response.json())
          .then(data => {
            if (data.result === 'success') {
              feedback.innerText = 'Thanks! Your request has been received. We will contact you soon.';
              feedback.style.color = 'var(--success)';
              contactForm.reset();
            } else {
              throw new Error(data.error || 'Unknown error');
            }
          })
          .catch(err => {
            console.error('Error submitting form:', err);
            feedback.innerText = 'Could not submit request. Please check your internet connection or try again later.';
            feedback.style.color = 'var(--danger)';
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = 'Send request';
            }
          });
      } else {
        // Fallback: Simulate success if URL is not configured (useful for development/demo)
        setTimeout(() => {
          console.warn('Google Sheets URL is not configured. Simulating successful form submission.');
          feedback.innerText = 'Thanks! Your request has been received. We will contact you soon. (Development Mode: Data not stored)';
          feedback.style.color = 'var(--success)';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send request';
          }
          contactForm.reset();
        }, 800);
      }
    });
  }
});

