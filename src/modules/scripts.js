(function () {

    const heavy = ["facebook", "gtag", "analytics", "hotjar", "pixel", "chat"];

    const scripts = document.querySelectorAll("script[src]");
    const queue = [];

    scripts.forEach(s => {
        if (heavy.some(k => s.src.includes(k))) {
            queue.push(s.src);
            s.remove();
        }
    });

    const load = () => {
        queue.forEach(src => {
            const s = document.createElement("script");
            s.src = src;
            s.async = true;
            document.body.appendChild(s);
        });
    };

    setTimeout(load, 3000);
    window.addEventListener("scroll", load, { once: true });

    console.log("[WPE] Scripts delayed");

})();
