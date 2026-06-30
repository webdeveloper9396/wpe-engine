import { getConfig } from "./config.js";

export class Logger {

    constructor() {

        this.config = getConfig();
        this.enabled = this.config.debug;

    }

    /**
     * Enable / disable logging at runtime
     */
    setEnabled(state = true) {

        this.enabled = state;

    }

    /**
     * Normal log
     */
    log(...args) {

        if (!this.enabled) return;

        console.log("[WPE]", ...args);

    }

    /**
     * Warning log
     */
    warn(...args) {

        if (!this.enabled) return;

        console.warn("[WPE WARN]", ...args);

    }

    /**
     * Error log (always shown even in production)
     */
    error(...args) {

        console.error("[WPE ERROR]", ...args);

    }

    /**
     * Performance log
     */
    perf(label, fn) {

        if (!this.enabled) return fn();

        const start = performance.now();

        const result = fn();

        const end = performance.now();

        console.log(`[WPE PERF] ${label}:`, (end - start).toFixed(2) + "ms");

        return result;

    }

}
