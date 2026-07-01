(function () {
    'use strict';

    const WPE = {
        version: "PRO-1.0",

        state: {
            modules: {},
            loaded: false
        },

        log(msg) {
            console.log("[WPE PRO]", msg);
        },

        async loadModule(url) {
            return new Promise((resolve, reject) => {
                const s = document.createElement("script");
                s.src = url;
                s.async = true;
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        },

        async init() {
            if (this.state.loaded) return;
            this.state.loaded = true;

            this.log("Engine Starting...");

            // PHASE 1 - CRITICAL (LCP BOOST)
            await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/critical.js");
            await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/images.js");

            // PHASE 2 - RENDER OPTIMIZATION
            setTimeout(async () => {
                await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/css.js");
                await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/fonts.js");
            }, 800);

            // PHASE 3 - JS CONTROL (INP BOOST)
            setTimeout(async () => {
                await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/scripts.js");
                await this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/delay-js.js");
            }, 1500);

            // PHASE 4 - NETWORK + OBSERVER
            requestIdleCallback(() => {
                this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/network.js");
                this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/observers.js");
                this.loadModule("https://webdeveloper9396.github.io/wpe-engine/dist/modules/scheduler.js");
            });

            this.log("All modules scheduled");
        }
    };

    const start = () => {
        setTimeout(() => WPE.init(), 900);
    };

    if (document.readyState === "complete") {
        start();
    } else {
        window.addEventListener("load", start);
    }

})();
