export default class CSSModule {

    constructor() {

        this.stylesheets = [];

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("CSS module initialized");

        this.collectStylesheets();

        this.optimizeCSS();

    }

    /**
     * Collect all CSS files
     */
    collectStylesheets() {

        if (typeof document === "undefined") return;

        const links = document.querySelectorAll('link[rel="stylesheet"]');

        links.forEach(link => {

            if (link.href) {

                this.stylesheets.push(link);

            }

        });

    }

    /**
     * Optimize CSS loading
     */
    optimizeCSS() {

        this.stylesheets.forEach(link => {

            try {

                // Skip Google Fonts (handled separately)
                if (link.href.includes("fonts.googleapis.com")) return;

                // Step 1: Preload CSS
                const preload = document.createElement("link");

                preload.rel = "preload";
                preload.as = "style";
                preload.href = link.href;

                document.head.appendChild(preload);

                // Step 2: Convert to non-blocking load
                link.setAttribute("media", "print");

                link.onload = function () {

                    link.media = "all";

                };

                // fallback
                setTimeout(() => {

                    link.media = "all";

                }, 3000);

            } catch (err) {

                console.warn("CSS optimization error:", err);

            }

        });

    }

}
