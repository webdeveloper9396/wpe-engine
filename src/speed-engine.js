import { Engine } from "./core/engine.js";
import { Loader } from "./loader/loader.js";
import { Logger } from "./core/logger.js";

/**
 * WPE SPEED ENGINE (ENTRY POINT)
 */
class WPESpeedEngine {

    constructor() {

        this.engine = new Engine();
        this.loader = new Loader(this.engine);
        this.logger = new Logger();

        this.initialized = false;

    }

    /**
     * Register core modules here
     */
    registerModules() {

        // Example placeholders (real modules later add karenge)

        const modules = this.getModules();

        modules.forEach(module => {

            this.engine.registerModule(module);

        });

    }

    /**
     * Module registry
     * (We will expand this in next phase)
     */
    getModules() {

        return [

            // Example structure (empty modules for now)

            {
                name: "scheduler",
                init: () => this.logger.log("Scheduler ready")
            },

            {
                name: "network",
                init: () => this.logger.log("Network ready")
            },

            {
                name: "images",
                init: () => this.logger.log("Image optimizer ready")
            }

        ];

    }

    /**
     * Initialize engine
     */
    init() {

        if (this.initialized) return;

        this.logger.log("Initializing WPE Speed Engine...");

        this.registerModules();

        this.engine.start();

        this.loader.boot();

        this.initialized = true;

        this.logger.log("WPE Speed Engine Initialized 🚀");

    }

}

/**
 * Auto start in browser
 */
(function bootstrap() {

    if (typeof window === "undefined") return;

    window.WPESpeedEngine = new WPESpeedEngine();

    // Safe DOM ready check
    if (document.readyState === "complete") {

        window.WPESpeedEngine.init();

    } else {

        window.addEventListener("DOMContentLoaded", () => {

            window.WPESpeedEngine.init();

        });

    }

})();
