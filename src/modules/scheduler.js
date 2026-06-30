export default class Scheduler {

    constructor() {

        this.queue = [];
        this.isRunning = false;

    }

    /**
     * Init module
     */
    init(engine) {

        this.engine = engine;

        this.engine.logger?.log("Scheduler module initialized");

    }

    /**
     * Add task to queue
     * priority: high | medium | low
     */
    addTask(callback, priority = "low") {

        this.queue.push({
            callback,
            priority
        });

        this.processQueue();

    }

    /**
     * Sort tasks by priority
     */
    sortQueue() {

        const order = {
            high: 1,
            medium: 2,
            low: 3
        };

        this.queue.sort((a, b) => order[a.priority] - order[b.priority]);

    }

    /**
     * Process queue safely
     */
    processQueue() {

        if (this.isRunning) return;

        this.isRunning = true;

        this.sortQueue();

        const run = () => {

            const task = this.queue.shift();

            if (task && typeof task.callback === "function") {

                try {

                    task.callback();

                } catch (err) {

                    console.warn("Scheduler task error:", err);

                }

            }

            if (this.queue.length > 0) {

                this.schedule(run);

            } else {

                this.isRunning = false;

            }

        };

        this.schedule(run);

    }

    /**
     * Smart scheduling (idle or timeout fallback)
     */
    schedule(callback) {

        if (typeof window === "undefined") return;

        if ("requestIdleCallback" in window) {

            requestIdleCallback(callback, { timeout: 2000 });

        } else {

            setTimeout(callback, 50);

        }

    }

}
