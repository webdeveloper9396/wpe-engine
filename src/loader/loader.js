import { Logger } from "../core/logger.js";

export class Loader {

    constructor(engine) {

        this.engine = engine;
        this.logger = new Logger();

        this.loaded = false;

    }

    /**
     * Load all registered modules
     */
    loadModules() {

        const modules = this.engine.modules || [];

        if (!modules.length) {

            this.logger.warn("No modules to load");

            return;

        }

        this.logger.log("Loading modules:", modules.length);

        for (const module of modules) {

            try {

                if (typeof module.init === "function") {

                    module.init(this.engine);

                    this.logger.log("Module loaded:", module.name || "unnamed");

                }

            } catch (err) {

                this.logger.error("Module load failed:", err);

            }

        }

    }

    /**
     * Boot sequence
     */
    boot() {

        if (this.loaded) return;

        this.logger.log("Booting WPE Engine...");

        this.loadModules();

        this.loaded = true;

        this.logger.log("WPE Engine Boot Complete 🚀");

    }

}
