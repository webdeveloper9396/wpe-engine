(function () {

    const observer = new MutationObserver(() => {
        document.querySelectorAll("[data-temp]").forEach(el => el.remove());
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("[WPE] DOM observer active");

})();
