console.log("WPE Engine Loaded");

window.WPE = {
  version: "1.0.0",

  init: function () {
    console.log("WPE Initialized");
  },

  speedCheck: function () {
    console.log("Checking website performance...");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  WPE.init();
});
