import { delayHeavyScripts } from "./delay-js.js";
import { optimizeImages } from "./images.js";
import { injectResourceHints } from "./network.js";
import { criticalCSSBoost } from "./css.js";

export function runScheduler() {

    // 1. Early render boost
    document.addEventListener("DOMContentLoaded", () => {
        injectResourceHints();
        criticalCSSBoost();
    });

    // 2. Image optimization (after DOM)
    setTimeout(() => {
        optimizeImages();
    }, 500);

    // 3. Heavy JS delay (AFTER FULL LOAD)
    window.addEventListener("load", () => {
        delayHeavyScripts();
    });

    // 4. Idle optimization
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));

    idle(() => {
        optimizeImages();
    });
}
