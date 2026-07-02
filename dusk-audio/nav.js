// Dusk Audio — mobile nav toggle. Vanilla JS, no dependencies.
(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close when a nav link is tapped (anchor jump on mobile).
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // Close on Escape and return focus to the toggle.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state when resizing up to the desktop nav so the panel never stays
  // stuck "open" behind the inline layout.
  var mq = window.matchMedia("(min-width: 768px)");
  function handleMq() { if (mq.matches) setOpen(false); }
  if (mq.addEventListener) mq.addEventListener("change", handleMq);
  else if (mq.addListener) mq.addListener(handleMq);

  // Stamp the current year in the footer (avoids a hardcoded stale year).
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
