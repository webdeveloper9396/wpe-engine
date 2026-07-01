(function () {
    'use strict';

    console.log("[WPE FINAL MASTER] Engine Loaded");

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

        init() {
            this.detectEnvironment();
            this.setupObservers();
            this.runAnalyzer();
            this.autoOptimizer();
            this.debugConsole();

            console.log("[WPE FINAL MASTER] Active");
        },

        /* ---------------- ENV DETECT ---------------- */
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

            console.log("[WPE MODE]", this.state.mode);
        },

        /* ---------------- OBSERVERS ---------------- */
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

            setInterval(() => {
                this.metrics.dom = document.getElementsByTagName("*").length;
                this.metrics.images = document.images.length;
                this.metrics.scripts = document.scripts.length;
            }, 1500);
        },

        /* ---------------- ANALYZER ---------------- */
        runAnalyzer() {
            setInterval(() => {

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

        /* ---------------- AUTO OPTIMIZER ---------------- */
        autoOptimizer() {

            setInterval(() => {

                if (!this.state.auto) return;

                if (this.metrics.lcp > 2500) this.fixLCP();
                if (this.metrics.inp > 200) this.fixINP();
                if (this.metrics.dom > 2200) this.fixDOM();

            }, 2500);
        },

        /* ---------------- FIX ENGINE ---------------- */
        fixLCP() {
            document.querySelectorAll("img").forEach(img => {
                if (img.closest(".hero")) {
                    const link = document.createElement("link");
                    link.rel = "preload";
                    link.as = "image";
                    link.href = img.src;
                    document.head.appendChild(link);

                    img.loading = "eager";
                }
            });

            this.state.fixes++;
            console.log("[WPE FIX] LCP optimized");
        },

        fixINP() {
            const heavy = ["facebook", "gtag", "chat", "hotjar"];

            document.querySelectorAll("script[src]").forEach(s => {
                if (heavy.some(k => s.src.includes(k))) {
                    s.defer = true;
                }
            });

            this.state.fixes++;
            console.log("[WPE FIX] INP optimized");
        },

        fixDOM() {
            document.querySelectorAll("[data-temp], [data-unused]").forEach(el => el.remove());
            this.state.fixes++;
            console.log("[WPE FIX] DOM cleaned");
        },

        /* ---------------- DebugConsole ---------------- */
        debugConsole() {
        
            setInterval(() => {
        
                console.clear();
        
                console.group("🚀 WPE FINAL MASTER");
        
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
        
        }
    };

    /* ---------------- START ---------------- */
    const start = () => {
        setTimeout(() => WPE.init(), 1200);
    };

    if (document.readyState === "complete") {
        start();
    } else {
        window.addEventListener("load", start);
    }

})();
