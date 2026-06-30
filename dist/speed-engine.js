console.log("WPE Engine Loaded");

(function () {
  window.WPE = {
    version: "2.0",

    init: function () {
      console.log("WPE Initialized");

      this.deferNonCriticalScripts();
      this.optimizeImages();
      this.removeRenderBlockingHints();
      this.measurePerformance();
    },

    // 1. Defer heavy scripts
    deferNonCriticalScripts: function () {
      const scripts = document.querySelectorAll("script");

      scripts.forEach((script) => {
        if (!script.src) return;

        // avoid breaking core scripts
        if (script.src.includes("jquery") || script.src.includes("cycle")) {
          script.defer = true;
          script.async = true;
        }
      });

      console.log("Scripts optimized (defer applied)");
    },

    // 2. Image optimization
    optimizeImages: function () {
      const images = document.querySelectorAll("img");

      images.forEach((img) => {
        img.loading = "lazy";
        img.decoding = "async";
      });

      console.log("Images optimized");
    },

    // 3. Remove render blocking hints
    removeRenderBlockingHints: function () {
      const links = document.querySelectorAll('link[rel="stylesheet"]');

      links.forEach((link) => {
        if (!link.href) return;

        // mark non-critical CSS
        if (!link.href.includes("critical")) {
          link.media = "print";
          link.onload = function () {
            this.media = "all";
          };
        }
      });

      console.log("CSS optimized (non-critical deferred)");
    },

    // 4. Performance tracking
    measurePerformance: function () {
      window.addEventListener("load", () => {
        const t = performance.timing;
        const loadTime = t.loadEventEnd - t.navigationStart;

        console.log("Page Load Time:", loadTime + "ms");
      });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    WPE.init();
  });
})();
