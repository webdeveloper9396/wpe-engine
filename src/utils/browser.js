const g = typeof globalThis !== "undefined" ? globalThis : {};

/**
 * Safe browser environment access
 */
export const browser = {

    window: typeof g.window !== "undefined" ? g.window : null,

    document: typeof g.document !== "undefined" ? g.document : null,

    navigator: typeof g.navigator !== "undefined" ? g.navigator : null,

    /**
     * Check if running in browser
     */
    isBrowser() {

        return typeof g.window !== "undefined" && typeof g.document !== "undefined";

    },

    /**
     * Check feature support
     */
    supports(feature) {

        switch (feature) {

            case "IntersectionObserver":
                return typeof g.IntersectionObserver !== "undefined";

            case "MutationObserver":
                return typeof g.MutationObserver !== "undefined";

            case "requestIdleCallback":
                return typeof g.requestIdleCallback !== "undefined";

            case "Image":
                return typeof g.Image !== "undefined";

            default:
                return false;

        }

    },

    /**
     * Safe query selector
     */
    qs(selector) {

        if (!this.document) return null;

        return this.document.querySelector(selector);

    },

    /**
     * Safe query selector all
     */
    qsa(selector) {

        if (!this.document) return [];

        return Array.from(this.document.querySelectorAll(selector));

    },

    /**
     * Safe event listener
     */
    on(target, event, handler, options = false) {

        if (!target) return;

        target.addEventListener(event, handler, options);

    }

};
