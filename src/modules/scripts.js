export default class ScriptsModule {

    constructor() {

        this.scripts = [];

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.scripts = Array.from(document.querySelectorAll("script"));

        this.processScripts();

        this.engine.logger?.log("Scripts module initialized");

    }

    /**
     * Process all scripts
     */
    processScripts() {

        for (const script of this.scripts) {

            try {

                // Skip engine script itself
                if (script.src && script.src.includes("speed-engine")) continue;

                // Skip inline critical scripts
                if (!script.src && !script.dataset.delay) continue;

                // Delay marked scripts
                if (script.dataset.delay === "true") {

                    this.deferScript(script);

                }

            } catch (err) {

                console.warn("Script processing error:", err);

            }

        }

    }

    /**
     * Defer script execution
     */
    deferScript(script) {

        const src = script.src;

        if (!src) return;

        script.type = "text/plain";
        script.removeAttribute("src");

        this.loadLater(src);

    }

    /**
     * Load script later (idle time)
     */
    loadLater(src) {

        const load = () => {

            const s = document.createElement("script");

            s.src = src;
            s.async = true;
            s.defer = true;

            document.head.appendChild(s);

        };

        if ("requestIdleCallback" in window) {

            requestIdleCallback(load, { timeout: 2000 });

        } else {

            setTimeout(load, 1000);

        }

    }

}
