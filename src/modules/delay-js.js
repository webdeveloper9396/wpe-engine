export function delayHeavyScripts() {

    const BLOCK_PATTERNS = [
        "gtag",
        "googletagmanager",
        "facebook",
        "hotjar",
        "chat",
        "ads",
        "analytics"
    ];

    const scripts = document.querySelectorAll("script[src]");

    scripts.forEach(script => {

        const src = script.src.toLowerCase();

        if (BLOCK_PATTERNS.some(p => src.includes(p))) {

            const clone = script.cloneNode(true);
            script.remove();

            const loadLater = () => {
                document.body.appendChild(clone);
            };

            if ("requestIdleCallback" in window) {
                requestIdleCallback(loadLater, { timeout: 3000 });
            } else {
                setTimeout(loadLater, 2000);
            }
        }
    });
}
