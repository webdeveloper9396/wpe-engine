(function () {

    const run = (cb) => {
        if (window.requestIdleCallback) {
            requestIdleCallback(cb);
        } else {
            setTimeout(cb, 1000);
        }
    };

    run(() => {
        console.log("[WPE] Idle cleanup running");

        document.querySelectorAll("[data-unused]").forEach(el => el.remove());
    });

})();
