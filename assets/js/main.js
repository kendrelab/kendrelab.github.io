/* ==========================================================================
   Kendre Lab — shared behaviour
   Everything degrades safely: no image files, no broken layout.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Graceful image fallbacks -------------------------------
     Any <img data-fallback="AB"> that fails to load is swapped for an
     initials avatar. Any <img data-fallback-text="..."> becomes a caption
     block. So the site looks finished even before real photos are added.  */
  function installFallback(img) {
    if (img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = "1";

    var div = document.createElement("div");
    var cls = img.getAttribute("class") || "";
    div.className = "avatar-fallback " + (img.dataset.fallbackClass || "") + " " + cls;

    if (img.dataset.fallbackText) {
      div.classList.add("avatar-fallback--wide");
      div.textContent = img.dataset.fallbackText;
    } else {
      div.textContent = img.dataset.fallback || "?";
    }
    div.setAttribute("role", "img");
    div.setAttribute("aria-label", img.alt || "Placeholder image");
    if (img.parentNode) img.parentNode.replaceChild(div, img);
  }

  document.querySelectorAll("img[data-fallback], img[data-fallback-text]").forEach(function (img) {
    img.addEventListener("error", function () { installFallback(img); });
    // Already failed before this script ran?
    if (img.complete && img.naturalWidth === 0) installFallback(img);
  });

  /* ---------- 2. Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var scrim = document.querySelector(".nav-scrim");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    scrim && scrim.classList.remove("is-active");
    toggle && toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      scrim && scrim.classList.toggle("is-active", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  scrim && scrim.addEventListener("click", closeNav);
  nav && nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });

  /* ---------- 3. Dropdown submenus (click on touch, hover on desktop) ---------- */
  document.querySelectorAll(".has-sub > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var wasOpen = li.classList.contains("is-open");
      document.querySelectorAll(".has-sub").forEach(function (x) { x.classList.remove("is-open"); });
      li.classList.toggle("is-open", !wasOpen);
      btn.setAttribute("aria-expanded", !wasOpen ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".has-sub").forEach(function (x) {
      x.classList.remove("is-open");
      var b = x.querySelector("button");
      b && b.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeNav();
    document.querySelectorAll(".has-sub").forEach(function (x) { x.classList.remove("is-open"); });
    var open = document.querySelector(".modal.is-open");
    if (open) closeModal(open);
  });

  /* ---------- 4. Hero slideshow ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (slides.length > 1) {
    var dotsWrap = document.querySelector(".hero-dots");
    var i = 0, timer;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (d, k) {
          d.setAttribute("aria-current", k === i ? "true" : "false");
        });
      }
    }
    function start() {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) timer = setInterval(function () { go(i + 1); }, 6500);
    }

    if (dotsWrap) {
      slides.forEach(function (_, k) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Show slide " + (k + 1));
        b.addEventListener("click", function () { clearInterval(timer); go(k); start(); });
        dotsWrap.appendChild(b);
      });
    }
    go(0);
    start();
  }

  /* ---------- 5. Accordion (news) ---------- */
  document.querySelectorAll(".news-item > button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- 6. Team member modals ---------- */
  var lastFocus = null;

  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    lastFocus = document.activeElement;
    m.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var c = m.querySelector(".modal-close");
    c && c.focus();
  }
  function closeModal(m) {
    m.classList.remove("is-open");
    document.body.style.overflow = "";
    lastFocus && lastFocus.focus();
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (el) {
    el.addEventListener("click", function () { openModal(el.dataset.modalOpen); });
  });
  document.querySelectorAll(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m) closeModal(m); });
    var c = m.querySelector(".modal-close");
    c && c.addEventListener("click", function () { closeModal(m); });
  });

  /* ---------- 7. Editorial notes toggle: append ?notes to any URL ---------- */
  if (location.search.indexOf("notes") !== -1) document.body.classList.add("show-notes");

  /* ---------- 8. Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
