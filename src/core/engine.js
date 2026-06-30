import { getConfig } from "./config.js";

export class Engine {

    constructor() {

        this.modules = [];
        this.plugins = [];
        this.isRunning = false;

        this.config = getConfig();

    }

    /**
     * Register module
     */
    registerModule(module) {

        if (!module || typeof module.init !== "function") {
            console.warn("Invalid module skipped");
            return;
        }

        this.modules.push(module);

    }

    /**
     * Register plugin
     */
    registerPlugin(plugin) {

        if (!plugin) return;

        this.plugins.push(plugin);

    }

    /**
     * Initialize all modules
     */
    initModules() {

        for (const module of this.modules) {

            try {

                module.init?.(this);

            } catch (err) {

                console.error("Module init error:", err);

            }

        }

    }

    /**
     * Start engine
     */
    start() {

        if (this.isRunning) return;

        this.isRunning = true;

        console.log("🚀 WPE Engine Started");

        this.initModules();

    }

}
