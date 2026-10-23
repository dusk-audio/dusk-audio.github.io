(function () {
  'use strict';
  // Reuse one MailerLite form: duplicate embed IDs and callbacks break subscription state.
  var newsletter = document.querySelector('.newsletter-dialog');
  var newsletterContent = document.getElementById('newsletter-content');
  if (newsletter && newsletterContent && typeof newsletter.showModal === 'function') {
    var newsletterHome = newsletterContent.parentNode;
    var signupTrigger;
    document.querySelectorAll('[data-newsletter]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        signupTrigger = link;
        newsletter.querySelector('#newsletter-dialog-slot').appendChild(newsletterContent);
        if (window.duskNewsletterCaptcha) window.duskNewsletterCaptcha.rerender();
        newsletter.showModal();
        var success = newsletterContent.querySelector('.row-success');
        if (success.style.display === 'block') success.focus();
        else newsletterContent.querySelector('input[type="email"]').focus();
      });
    });
    newsletter.addEventListener('click', function (event) {
      if (event.target === newsletter) newsletter.close();
    });
    document.addEventListener('keydown', function (event) {
      // A modal dialog closes on Escape by itself; the non-modal fallback does not.
      if (event.key === 'Escape' && newsletter.open && !newsletter.matches(':modal')) newsletter.close();
    });
    newsletter.addEventListener('close', function () {
      // email-capture.html reopens the dialog non-modally when a reCAPTCHA challenge appears; the
      // close event of that switch arrives once the dialog is already open again.
      if (newsletter.open) return;
      newsletter.classList.remove('is-floating');
      newsletterHome.appendChild(newsletterContent);
      if (window.duskNewsletterCaptcha) window.duskNewsletterCaptcha.rerender();
      if (signupTrigger) signupTrigger.focus();
    });
  }
  var toggle = document.querySelector('.nav-toggle');
  var navigation = document.querySelector('.nav-links');
  function closeNavigation() {
    if (!toggle || !navigation) return;
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
  if (toggle && navigation) {
    document.documentElement.classList.add('navigation-ready');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('open', open);
    });
    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNavigation();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 769px)').addEventListener('change', closeNavigation);
  }

  document.querySelectorAll('.plugin-main table, main pre').forEach(function (element) {
    element.tabIndex = 0;
  });

  var dialog = document.querySelector('.screenshot-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var enlarged = dialog.querySelector('img');
  var lastTrigger;
  // Enhance the existing plugin galleries without changing their carousel controls.
  document.querySelectorAll('.plugin-screenshot img, .gallery-item img, .carousel-slide img').forEach(function (img) {
    if (img.closest('a')) return;
    var link = document.createElement('a');
    link.href = img.src;
    link.setAttribute('data-screenshot', '');
    link.setAttribute('aria-label', 'Enlarge screenshot: ' + img.alt);
    link.className = 'screenshot-link';
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  });
  document.querySelectorAll('[data-screenshot]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      lastTrigger = link;
      enlarged.src = link.href;
      enlarged.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () {
    enlarged.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  });
})();
