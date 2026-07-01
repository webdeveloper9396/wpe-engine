(function () {
    'use strict';

    /* =================================================
       WPE DEBUG MODE
       ================================================= */
    const WPE_DEBUG =
        location.search.includes("wpe_debug=1");

    if (WPE_DEBUG) {
        console.log("[WPE FINAL MASTER] Engine Loaded");
    }

    /* =================================================
       ENGINE CORE
       ================================================= */
    const WPE = {

        state: {
            mode: "SAFE",
            auto: true,
            score: 100,
            fixes: 0
        },

        metrics: {
            lcp: 0,
            inp: 0,
            dom: 0,
            images: 0,
            scripts: 0,
            longTasks: 0
        },

        intervals: {},

        /* ================= INIT ================= */
        init() {
            this.detectEnvironment();
            this.setupObservers();
            this.runAnalyzer();
            this.autoOptimizer();

            if (WPE_DEBUG) {
                this.dashboard();
                this.debugConsole();
                console.log("[WPE FINAL MASTER] Active");
            }
        },

        /* ================= ENV ================= */
        detectEnvironment() {

            const mem = navigator.deviceMemory || 4;
            const cpu = navigator.hardwareConcurrency || 4;

            if (mem <= 2 || cpu <= 2) {
                this.state.mode = "AGGRESSIVE";
            } else if (mem <= 4) {
                this.state.mode = "BALANCED";
            } else {
                this.state.mode = "SAFE";
            }

            if (WPE_DEBUG) {
                console.log("[WPE MODE]", this.state.mode);
            }
        },

        /* ================= OBSERVERS ================= */
        setupObservers() {

            try {
                new PerformanceObserver((list) => {
                    const e = list.getEntries();
                    this.metrics.lcp = e.at(-1)?.startTime || 0;
                }).observe({ type: "largest-contentful-paint", buffered: true });
            } catch (e) {}

            try {
                new PerformanceObserver((list) => {
                    list.getEntries().forEach(e => {
                        this.metrics.inp = e.processingStart - e.startTime;
                    });
                }).observe({ type: "first-input", buffered: true });
            } catch (e) {}

            try {
                new PerformanceObserver((list) => {
                    list.getEntries().forEach(e => {
                        if (e.duration > 50) this.metrics.longTasks++;
                    });
                }).observe({ type: "longtask", buffered: true });
            } catch (e) {}

            this.intervals.metrics = setInterval(() => {
                this.metrics.dom = document.getElementsByTagName("*").length;
                this.metrics.images = document.images.length;
                this.metrics.scripts = document.scripts.length;
            }, 1500);
        },

        /* ================= ANALYZER ================= */
        runAnalyzer() {

            this.intervals.analyzer = setInterval(() => {

                let score = 100;

                if (this.metrics.lcp > 3000) score -= 30;
                else if (this.metrics.lcp > 2000) score -= 15;

                if (this.metrics.inp > 250) score -= 25;
                else if (this.metrics.inp > 120) score -= 10;

                if (this.metrics.dom > 2000) score -= 15;
                if (this.metrics.longTasks > 5) score -= 20;

                this.state.score = Math.max(score, 0);

            }, 1500);
        },

        /* ================= OPTIMIZER ================= */
        autoOptimizer() {

            this.intervals.optimizer = setInterval(() => {

                if (!this.state.auto) return;

                if (this.metrics.lcp > 2500) this.fixLCP();
                if (this.metrics.inp > 200) this.fixINP();
                if (this.metrics.dom > 2200) this.fixDOM();

            }, 2500);
        },

        /* ================= FIX ENGINE ================= */
        fixLCP() {

            document.querySelectorAll("img").forEach(img => {

                if (img.closest(".hero")) {

                    if (!document.querySelector(`link[href="${img.src}"]`)) {

                        const link = document.createElement("link");
                        link.rel = "preload";
                        link.as = "image";
                        link.href = img.src;

                        document.head.appendChild(link);
                    }

                    img.loading = "eager";
                }
            });

            this.state.fixes++;

            if (WPE_DEBUG) {
                console.log("[WPE FIX] LCP optimized");
            }
        },

        fixINP() {

            const heavy = ["facebook", "gtag", "chat", "hotjar"];

            document.querySelectorAll("script[src]").forEach(s => {

                if (heavy.some(k => s.src.includes(k))) {
                    s.defer = true;
                }
            });

            this.state.fixes++;

            if (WPE_DEBUG) {
                console.log("[WPE FIX] INP optimized");
            }
        },

        fixDOM() {

            document.querySelectorAll("[data-wpe-temp], [data-wpe-unused]").forEach(el => el.remove());

            this.state.fixes++;

            if (WPE_DEBUG) {
                console.log("[WPE FIX] DOM cleaned");
            }
        },

        /* ================= DEBUG ================= */
        debugConsole() {

            if (!WPE_DEBUG) return;

            console.log("%c🚀 WPE Debug Mode Enabled",
                "color:#00d084;font-size:14px;font-weight:bold;"
            );

            this.intervals.debug = setInterval(() => {

                console.groupCollapsed(
                    `%c🚀 WPE REPORT (${new Date().toLocaleTimeString()})`,
                    "color:#00d084;font-weight:bold;"
                );

                console.table({
                    Mode: this.state.mode,
                    Score: this.state.score,
                    LCP: Math.round(this.metrics.lcp),
                    INP: Math.round(this.metrics.inp),
                    DOM: this.metrics.dom,
                    Images: this.metrics.images,
                    Scripts: this.metrics.scripts,
                    LongTasks: this.metrics.longTasks,
                    Fixes: this.state.fixes
                });

                console.groupEnd();

            }, 3000);
        },

        /* ================= DASHBOARD ================= */
        dashboard() {

            if (!WPE_DEBUG) return;
            if (document.getElementById("wpe-dashboard")) return;

            const ui = document.createElement("div");
            ui.id = "wpe-dashboard";

            ui.style.cssText = `
                position:fixed;
                bottom:15px;
                right:15px;
                width:260px;
                background:#0a0f1f;
                color:#00ffae;
                font-family:monospace;
                font-size:12px;
                padding:10px;
                border-radius:10px;
                z-index:999999;
                box-shadow:0 0 20px rgba(0,255,174,0.3);
            `;

            ui.innerHTML = `
                <b>🚀 WPE FINAL MASTER</b><br><br>

                Mode: <span id="mode"></span><br>
                Score: <span id="score"></span>/100<br>
                LCP: <span id="lcp"></span><br>
                INP: <span id="inp"></span><br>
                DOM: <span id="dom"></span><br>
                Images: <span id="img"></span><br>
                Scripts: <span id="js"></span><br>
                Fixes: <span id="fix"></span><br>
            `;

            document.body.appendChild(ui);

            this.intervals.dashboard = setInterval(() => {

                const set = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.innerText = val;
                };

                set("mode", this.state.mode);
                set("score", this.state.score);
                set("lcp", Math.round(this.metrics.lcp));
                set("inp", Math.round(this.metrics.inp));
                set("dom", this.metrics.dom);
                set("img", this.metrics.images);
                set("js", this.metrics.scripts);
                set("fix", this.state.fixes);

            }, 1000);
        }
    };

    /* ================= START ================= */
    const start = () => {
        setTimeout(() => WPE.init(), 1200);
    };

    if (document.readyState === "complete") {
        start();
    } else {
        window.addEventListener("load", start);
    }

    /* ================= GLOBAL ACCESS (DEBUG) ================= */
    window.WPE = WPE;

})();
