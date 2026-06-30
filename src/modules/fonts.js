export default class FontsModule {

    constructor() {

        this.fonts = [];

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("Fonts module initialized");

        this.collectFonts();

        this.optimizeFonts();

    }

    /**
     * Collect font links
     */
    collectFonts() {

        if (typeof document === "undefined") return;

        const links = document.querySelectorAll('link[rel="stylesheet"]');

        links.forEach(link => {

            if (link.href && link.href.includes("fonts.googleapis.com")) {

                this.fonts.push(link);

            }

        });

    }

    /**
     * Optimize font loading
     */
    optimizeFonts() {

        this.fonts.forEach(link => {

            try {

                // Step 1: Preconnect to Google Fonts
                this.addPreconnect("https://fonts.googleapis.com");
                this.addPreconnect("https://fonts.gstatic.com");

                // Step 2: Convert to preload (non-blocking)
                link.setAttribute("rel", "preload");
                link.setAttribute("as", "style");

                // Step 3: Load asynchronously
                link.onload = () => {

                    link.rel = "stylesheet";

                };

                // fallback
                link.onerror = () => {

                    link.rel = "stylesheet";

                };

            } catch (err) {

                console.warn("Font optimization error:", err);

            }

        });

    }

    /**
     * Add preconnect hint
     */
    addPreconnect(href) {

        const link = document.createElement("link");

        link.rel = "preconnect";
        link.href = href;
        link.crossOrigin = "anonymous";

        document.head.appendChild(link);

    }

}
