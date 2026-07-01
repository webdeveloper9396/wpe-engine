(function () {

    const delay = ["facebook", "chat", "pixel", "analytics"];

    document.querySelectorAll("script[src]").forEach(s => {
        if (delay.some(d => s.src.includes(d))) {
            const src = s.src;
            s.remove();

            setTimeout(() => {
                const n = document.createElement("script");
                n.src = src;
                n.async = true;
                document.body.appendChild(n);
            }, 4000);
        }
    });

    console.log("[WPE] Third-party delayed");

})();
