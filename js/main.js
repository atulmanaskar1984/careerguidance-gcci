// Mobile nav toggle and simple form validation
document.addEventListener("DOMContentLoaded", function () {
  // Contact form validation if present
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
      if (name.length < 2) errors.push("Please enter your full name.");
      if (!["10", "12", "other"].includes(cls))
        errors.push("Select your class.");
      if (board.length < 2) errors.push("Select your board.");
      if (contact.length < 6) errors.push("Enter a valid phone or email.");
      if (message.length < 10)
        errors.push("Tell us a bit more about your query.");

      const feedback = document.getElementById("formFeedback");
      if (errors.length) {
        feedback.innerText = errors.join(" ");
        feedback.style.color = "var(--danger)";
        feedback.style.display = "block";
        return;
      }
      // Simulate success
      feedback.innerText =
        "Thanks! Your request has been received. We will contact you soon.";
      feedback.style.color = "var(--success)";
      feedback.style.display = "block";
      contactForm.reset();
    });
  }
});
