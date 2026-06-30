export default class DelayJSModule {

    constructor() {

        this.queue = [];

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("DelayJS module initialized");

        this.collectScripts();

        this.processQueue();

    }

    /**
     * Collect scripts marked for delay
     */
    collectScripts() {

        if (typeof document === "undefined") return;

        const scripts = document.querySelectorAll("script[data-wpe-delay='true']");

        scripts.forEach(script => {

            const src = script.getAttribute("src");

            if (src) {

                this.queue.push(src);

                script.remove();

            }

        });

    }

    /**
     * Process queue safely
     */
    processQueue() {

        if (!this.queue.length) return;

        const loadNext = () => {

            const src = this.queue.shift();

            if (!src) return;

            const s = document.createElement("script");

            s.src = src;
            s.async = true;
            s.defer = true;

            document.head.appendChild(s);

            if (this.queue.length > 0) {

                this.schedule(loadNext);

            }

        };

        this.schedule(loadNext);

    }

    /**
     * Smart scheduler (idle fallback)
     */
    schedule(callback) {

        if (typeof window === "undefined") return;

        if ("requestIdleCallback" in window) {

            requestIdleCallback(callback, { timeout: 2000 });

        } else {

            setTimeout(callback, 1000);

        }

    }

}
