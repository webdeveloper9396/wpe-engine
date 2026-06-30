let configCache = null;

/**
 * Default configuration for WPE Engine
 */
export function getConfig() {

    if (configCache) return configCache;

    configCache = {

        // 🔧 Debug mode
        debug: false,

        // ⚡ Performance settings
        lazyLoad: true,
        deferScripts: true,
        optimizeImages: true,
        optimizeFonts: true,

        // 🧠 Scheduler settings
        idleTimeout: 2000,
        batchSize: 5,

        // 🌐 Network optimization
        preconnect: true,
        prefetch: true,

        // 🎯 DOM optimization
        observeDOM: true,
        debounceMutations: true,

        // 📊 Analytics
        trackPerformance: false,

        // 🚀 Engine version
        version: "1.0.0"

    };

    return configCache;
}

/**
 * Update config dynamically
 */
export function setConfig(newConfig = {}) {

    configCache = {
        ...getConfig(),
        ...newConfig
    };

    return configCache;
}
