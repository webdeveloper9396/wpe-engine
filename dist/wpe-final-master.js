(function () {
    'use strict';

    /* =========================================
       DEBUG GATE (ONLY ?wpe_debug=1)
    ========================================= */
    const WPE_DEBUG = location.search.includes("wpe_debug=1");

    /* =========================================
       CORE BOOT LOGIC
    ========================================= */
    if (WPE_DEBUG) {
        console.log("[WPE AI v20 SaaS] Booting Engine...");
    }

    /* =========================================
       SAAS CORE ENGINE
    ========================================= */
    const WPE = {

        version: "v20-saas-core",

        state: {
            mode: "SAFE",
            score: 100,
            fixes: 0,
            running: false,
            queue: []
        },

        metrics: {
            lcp: 0,
            inp: 0,
            cls: 0,
            dom: 0,
            scripts: 0,
            images: 0,
            longTasks: 0
        },

        timers: {},

        /* =====================================
           INIT SYSTEM
        ===================================== */
        init() {

            if (this.state.running) return;
            this.state.running = true;

            this.detectDevice();
            this.initObservers();
            this.initScheduler();

            if (WPE_DEBUG) {
                this.initDebugConsole();
                this.initDashboard();
                console.log("[WPE AI v20] ACTIVE");
            }
        },

        /* =====================================
           DEVICE INTELLIGENCE
        ===================================== */
        detectDevice() {

            const mem = navigator.deviceMemory || 4;
            const cpu = navigator.hardwareConcurrency || 4;

            if (mem <= 2 || cpu <= 2) {
                this.state.mode = "AGGRESSIVE";
            } else if (mem <= 4) {
                this.state.mode = "BALANCED";
            } else {
                this.state.mode = "SAFE";
            }

            if (WPE_DEBUG) console.log("[MODE]", this.state.mode);
        },

        /* =====================================
           PERFORMANCE TRACKING
        ===================================== */
        initObservers() {

            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    this.metrics.lcp = entries.at(-1)?.startTime || 0;
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

            this.timers.metrics = setInterval(() => {

                this.metrics.dom = document.getElementsByTagName("*").length;
                this.metrics.images = document.images.length;
                this.metrics.scripts = document.scripts.length;

            }, 1500);
        },

        /* =====================================
           SAAS SCHEDULER ENGINE
        ===================================== */
        initScheduler() {

            document.addEventListener("DOMContentLoaded", () => {
                this.optimizeImages();
                this.injectPreconnect();
                this.optimizeCSS();
            });

            window.addEventListener("load", () => {
                this.delayThirdPartyScripts();
                this.runScoringEngine();
            });
        },

        /* =====================================
           IMAGE OPTIMIZER (SAFE)
        ===================================== */
        optimizeImages() {

            document.querySelectorAll("img").forEach(img => {

                const critical =
                    img.closest("header") ||
                    img.closest(".hero") ||
                    img.closest(".banner");

                if (critical) {
                    img.loading = "eager";
                    img.fetchPriority = "high";
                } else {
                    img.loading = "lazy";
                }

                img.decoding = "async";
            });

            this.state.fixes++;
        },

        /* =====================================
           SCRIPT DELAY ENGINE (SAFE SAAS STYLE)
        ===================================== */
        delayThirdPartyScripts() {

            const BLOCK = [
                "gtag",
                "googletagmanager",
                "facebook",
                "hotjar",
                "analytics",
                "ads"
            ];

            document.querySelectorAll("script[src]").forEach(script => {

                if (BLOCK.some(k => script.src.includes(k))) {

                    const clone = script.cloneNode(true);
                    script.remove();

                    const delay = this.state.mode === "AGGRESSIVE"
                        ? 2500
                        : this.state.mode === "BALANCED"
                            ? 1200
                            : 600;

                    setTimeout(() => {
                        document.body.appendChild(clone);
                    }, delay);
                }
            });

            this.state.fixes++;
        },

        /* =====================================
           CSS BOOST (SAFE)
        ===================================== */
        optimizeCSS() {

            const style = document.createElement("style");

            style.textContent = `
                html,body{overflow-x:hidden;}
                img{content-visibility:auto;}
                *{box-sizing:border-box;}
            `;

            document.head.appendChild(style);
        },

        /* =====================================
           PRECONNECT SYSTEM
        ===================================== */
        injectPreconnect() {

            const domains = [
                "https://fonts.googleapis.com",
                "https://fonts.gstatic.com"
            ];

            domains.forEach(url => {

                const link = document.createElement("link");
                link.rel = "preconnect";
                link.href = url;

                if (url.includes("gstatic")) {
                    link.crossOrigin = "anonymous";
                }

                document.head.appendChild(link);
            });
        },

        /* =====================================
           SCORING ENGINE (REALISTIC)
        ===================================== */
        runScoringEngine() {

            this.timers.score = setInterval(() => {

                let score = 100;

                score -= Math.min(this.metrics.lcp / 120, 35);
                score -= Math.min(this.metrics.inp / 15, 25);
                score -= Math.min(this.metrics.dom / 300, 15);
                score -= Math.min(this.metrics.longTasks * 2, 20);

                this.state.score = Math.max(Math.round(score), 0);

            }, 1500);
        },

        /* =====================================
           DEBUG CONSOLE (ONLY DEBUG MODE)
        ===================================== */
        initDebugConsole() {

            if (!WPE_DEBUG) return;

            console.log("%c🚀 WPE AI v20 SaaS DEBUG",
                "color:#00ffae;font-weight:bold;"
            );

            this.timers.debug = setInterval(() => {

                console.group("WPE AI v20 REPORT");

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

        /* =====================================
           DASHBOARD (ONLY DEBUG MODE)
        ===================================== */
        initDashboard() {

            if (!WPE_DEBUG) return;
            if (document.getElementById("wpe-v20-ui")) return;

            const box = document.createElement("div");
            box.id = "wpe-v20-ui";

            box.style.cssText = `
                position:fixed;
                bottom:15px;
                right:15px;
                width:240px;
                background:#0b0f1a;
                color:#00ffae;
                font-family:monospace;
                font-size:11px;
                padding:10px;
                border-radius:10px;
                z-index:999999;
            `;

            box.innerHTML = `
                <b>WPE AI v20 SaaS</b><br><br>
                Mode: <span id="m"></span><br>
                Score: <span id="s"></span><br>
                LCP: <span id="l"></span><br>
                INP: <span id="i"></span><br>
                DOM: <span id="d"></span><br>
            `;

            document.body.appendChild(box);

            this.timers.dashboard = setInterval(() => {

                const set = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.innerText = val;
                };

                set("m", this.state.mode);
                set("s", this.state.score);
                set("l", Math.round(this.metrics.lcp));
                set("i", Math.round(this.metrics.inp));
                set("d", this.metrics.dom);

            }, 1000);
        }
    };

    /* =========================================
       BOOT STRAP
    ========================================= */
    const boot = () => {
        setTimeout(() => WPE.init(), 900);
    };

    if (document.readyState === "complete") {
        boot();
    } else {
        window.addEventListener("load", boot);
    }

    /* =========================================
       EXPORT (SAAS READY FUTURE)
    ========================================= */
    window.WPE_AI = WPE;

})();
