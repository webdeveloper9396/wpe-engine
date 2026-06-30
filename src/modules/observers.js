export default class ObserversModule {

    constructor() {

        this.mutationObserver = null;

        this.intersectionObserver = null;

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("Observers module initialized");

        this.initMutationObserver();

        this.initIntersectionObserver();

    }

    /**
     * MutationObserver (DOM changes tracking)
     */
    initMutationObserver() {

        if (typeof window === "undefined") return;

        const MO = window.MutationObserver;

        if (!MO) return;

        this.mutationObserver = new MO((mutations) => {

            for (const mutation of mutations) {

                // Example: new nodes added
                if (mutation.addedNodes.length > 0) {

                    this.onDOMChange(mutation.addedNodes);

                }

            }

        });

        this.mutationObserver.observe(document.documentElement, {

            childList: true,

            subtree: true

        });

    }

    /**
     * IntersectionObserver (viewport tracking)
     */
    initIntersectionObserver() {

        if (typeof window === "undefined") return;

        const IO = window.IntersectionObserver;

        if (!IO) return;

        this.intersectionObserver = new IO((entries, obs) => {

            for (const entry of entries) {

                if (!entry.isIntersecting) continue;

                const el = entry.target;

                this.onElementVisible(el);

                obs.unobserve(el);

            }

        }, {

            rootMargin: "200px"

        });

        // Observe lazy elements
        const lazyElements = document.querySelectorAll("[data-wpe-lazy]");

        lazyElements.forEach(el => {

            this.intersectionObserver.observe(el);

        });

    }

    /**
     * Handle DOM changes
     */
    onDOMChange(nodes) {

        this.engine.logger?.log("DOM changed:", nodes.length);

        // Future: auto optimize new images/scripts
    }

    /**
     * Handle element visible in viewport
     */
    onElementVisible(el) {

        this.engine.logger?.log("Element visible:", el.tagName);

        // Future: trigger lazy load actions
    }

}
