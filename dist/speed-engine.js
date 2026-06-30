console.log("WPE Engine Loaded");

window.WPE = {
  version: "1.0.0",

  init: function () {
    console.log("WPE Initialized");
    this.lazyLoadScripts();
    this.optimizeImages();
  },

  // 1. Lazy script loader
  lazyLoadScripts: function () {
    const scripts = document.querySelectorAll("script[data-lazy]");

    scripts.forEach((s) => {
      const newScript = document.createElement("script");
      newScript.src = s.getAttribute("data-src");
      document.body.appendChild(newScript);
    });

    console.log("Lazy scripts loaded");
  },

  // 2. Image lazy loading
  optimizeImages: function () {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      if (!img.loading) {
        img.loading = "lazy";
      }
    });

    console.log("Images optimized");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  WPE.init();
});
