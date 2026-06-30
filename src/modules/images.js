export default class ImagesModule {

    constructor() {

        this.images = [];
        this.observer = null;

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.images = Array.from(document.querySelectorAll("img"));

        this.setupObserver();

        this.engine.logger?.log("Images module initialized");

    }

    /**
     * Create IntersectionObserver
     */
    setupObserver() {

        if (typeof window === "undefined") return;

        const IO = window.IntersectionObserver;

        if (!IO) return;

        this.observer = new IO((entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                this.loadImage(img);

                obs.unobserve(img);

            });

        }, {

            rootMargin: "200px"
        });

        this.images.forEach(img => {

            if (img.dataset.loaded === "true") return;

            this.observer.observe(img);

        });

    }

    /**
     * Load image safely
     */
    loadImage(img) {

        try {

            const src = img.getAttribute("data-src") || img.src;

            if (!src) return;

            const image = new Image();

            image.src = src;

            image.decode?.().then(() => {

                img.src = src;

                img.dataset.loaded = "true";

                img.classList.add("wpe-loaded");

            }).catch(() => {

                img.src = src;

            });

        } catch (err) {

            console.warn("Image load error:", err);

        }

    }

}
