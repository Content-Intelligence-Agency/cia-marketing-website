(function () {
  const WEB3FORMS_ACCESS_KEY = "5e406f90-a55a-41ed-9503-8865133feee7"; // ← get this free at web3forms.com

  const overlay = document.getElementById('demoModal');
  const closeBtn = overlay.querySelector('.modal-close');
  const form = document.getElementById('demoForm');
  const successView = document.getElementById('demoSuccess');
  const errorNote = document.getElementById('demoError');

  document.querySelectorAll('[data-open-demo]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function openModal(e) {
    if (e) e.preventDefault();
    overlay.classList.add('open');
    form.hidden = false;
    successView.hidden = true;
    if (errorNote) errorNote.style.display = 'none';
  }

  function closeModal() {
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    if (errorNote) errorNote.style.display = 'none';

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New demo request from website');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        form.hidden = true;
        successView.hidden = false;
        form.reset();
      } else {
        if (errorNote) errorNote.style.display = 'block';
      }
    } catch (err) {
      if (errorNote) errorNote.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
})();