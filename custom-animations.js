/* =========================================================
   ha.gt – Custom Animations (JS)
   Beobachtet Sections/Spalten und blendet sie ein, sobald
   sie beim Scrollen ins sichtbare Fenster kommen.
   ========================================================= */
(function () {
  "use strict";

  // Falls der Nutzer "reduzierte Bewegung" eingestellt hat: alles sofort sichtbar
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function revealAll() {
    document
      .querySelectorAll(".animated-element, .section-root")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // nur einmal animieren
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1,
    }
  );

  function initObserver() {
    var targets = document.querySelectorAll(
      ".animated-element, .section-root"
    );
    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initObserver);
  } else {
    initObserver();
  }

  // Sicherheitsnetz: falls nach 3 Sekunden Elemente aus irgendeinem
  // Grund nicht animiert wurden, trotzdem einblenden
  setTimeout(revealAll, 3000);
})();
