export default class PluginManager {

    constructor() {

        this.plugins = [];

    }

    /**
     * Init plugin system
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("Plugin Manager initialized");

        this.initPlugins();

    }

    /**
     * Register a plugin
     * plugin must have optional methods: init, run, destroy
     */
    register(plugin) {

        if (!plugin) return;

        this.plugins.push(plugin);

        this.engine.logger?.log("Plugin registered:", plugin.name || "unnamed");

    }

    /**
     * Initialize all plugins
     */
    initPlugins() {

        for (const plugin of this.plugins) {

            try {

                if (typeof plugin.init === "function") {

                    plugin.init(this.engine);

                }

                this.engine.logger?.log("Plugin initialized:", plugin.name || "unnamed");

            } catch (err) {

                console.warn("Plugin init error:", err);

            }

        }

    }

    /**
     * Run all plugins (if they have run method)
     */
    runAll() {

        for (const plugin of this.plugins) {

            try {

                if (typeof plugin.run === "function") {

                    plugin.run(this.engine);

                }

            } catch (err) {

                console.warn("Plugin run error:", err);

            }

        }

    }

    /**
     * Destroy plugins (cleanup)
     */
    destroyAll() {

        for (const plugin of this.plugins) {

            try {

                if (typeof plugin.destroy === "function") {

                    plugin.destroy();

                }

            } catch (err) {

                console.warn("Plugin destroy error:", err);

            }

        }

        this.plugins = [];

    }

}
