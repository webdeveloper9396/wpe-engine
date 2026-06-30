import { Engine } from "./engine.js";
import { Logger } from "./logger.js";
import { getConfig, setConfig } from "./config.js";

/**
 * WPE CORE INDEX (MASTER API)
 * This is the single entry point for external usage
 */

class WPECore {

    constructor() {

        this.engine = new Engine();
        this.logger = new Logger();

        this.initialized = false;

    }

    /**
     * Initialize full system
     */
    init(customConfig = {}) {

        if (this.initialized) return;

        // Apply config first
        if (Object.keys(customConfig).length > 0) {
            setConfig(customConfig);
        }

        this.logger.log("WPE Core initializing...");

        // Start engine
        this.engine.start();

        this.initialized = true;

        this.logger.log("WPE Core initialized 🚀");

    }

    /**
     * Register module externally
     */
    useModule(module) {

        this.engine.registerModule(module);

    }

    /**
     * Register plugin externally
     */
    usePlugin(plugin) {

        if (this.engine.pluginManager?.register) {
            this.engine.pluginManager.register(plugin);
        }

    }

    /**
     * Get engine instance
     */
    getEngine() {

        return this.engine;

    }

}

/**
 * Global Singleton (Browser safe)
 */
const wpe = new WPECore();

export default wpe;

// Auto expose for browser usage
if (typeof window !== "undefined") {

    window.WPE = wpe;

}
