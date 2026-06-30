export default class NetworkModule {

    constructor() {

        this.connection = null;
        this.effectiveType = "unknown";
        this.saveData = false;
        this.downlink = null;

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.detectNetwork();

        this.engine.logger?.log("Network module initialized:", this.effectiveType);

    }

    /**
     * Detect network information safely
     */
    detectNetwork() {

        if (typeof navigator === "undefined") return;

        const nav = navigator;

        const conn =
            nav.connection ||
            nav.mozConnection ||
            nav.webkitConnection;

        if (!conn) return;

        this.connection = conn;
        this.effectiveType = conn.effectiveType || "unknown";
        this.saveData = conn.saveData || false;
        this.downlink = conn.downlink || null;

    }

    /**
     * Check if slow connection
     */
    isSlowConnection() {

        return (
            this.effectiveType === "slow-2g" ||
            this.effectiveType === "2g"
        );
    }

    /**
     * Check if fast connection
     */
    isFastConnection() {

        return (
            this.effectiveType === "4g"
        );
    }

    /**
     * Should we enable aggressive optimization?
     */
    shouldOptimizeAggressively() {

        return this.isSlowConnection() || this.saveData;

    }

}
