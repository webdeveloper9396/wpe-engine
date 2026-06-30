export default class CriticalModule {

    constructor() {

        this.criticalLoaded = false;

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("Critical module initialized");

        this.optimizeInitialRender();

    }

    /**
     * Optimize first paint
     */
    optimizeInitialRender() {

        if (typeof document === "undefined") return;

        // Mark critical phase
        document.documentElement.setAttribute("data-wpe-critical", "true");

        // Defer non-critical images
        this.deferNonCriticalImages();

        // Defer heavy elements
        this.deferHeavyElements();

        this.criticalLoaded = true;

    }

    /**
     * Defer images not in viewport
     */
    deferNonCriticalImages() {

        const images = document.querySelectorAll("img");

        images.forEach(img => {

            const rect = img.getBoundingClientRect();

            const isAboveFold = rect.top < window.innerHeight;

            if (!isAboveFold && !img.dataset.critical) {

                img.loading = "lazy";

            }

        });

    }

    /**
     * Defer heavy DOM elements
     */
    deferHeavyElements() {

        const heavySelectors = [
            "iframe",
            "video",
            "embed"
        ];

        heavySelectors.forEach(selector => {

            const elements = document.querySelectorAll(selector);

            elements.forEach(el => {

                if (!el.dataset.critical) {

                    el.setAttribute("loading", "lazy");

                }

            });

        });

    }

}
