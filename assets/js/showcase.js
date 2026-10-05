(function () {
  'use strict';
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
