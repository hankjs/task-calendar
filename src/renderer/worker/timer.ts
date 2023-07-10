const timerWorkerUrl = new URL("./timer.worker.js", import.meta.url);

type Detail = {
    elapsed: number;
    totalSeconds: number;
};

export abstract class TimerWorker {
    #worker: Worker;

    constructor(min?: number) {
        this.#worker = new Worker(timerWorkerUrl);
        this.#worker.addEventListener("message", (message) => {
            switch (message.data.event) {
                case "complete":
                    this.onComplete();
                    break;
                case "pause":
                    this.onPause();
                    break;
                case "reset":
                    this.onReset();
                    break;
                case "resume":
                    this.onResume();
                    break;
                case "start":
                    this.onStart({
                        elapsed: message.data.elapsed,
                        totalSeconds: message.data.totalSeconds,
                    });
                    break;
                case "tick":
                    this.onTick({
                        elapsed: message.data.elapsed,
                        totalSeconds: message.data.totalSeconds,
                    });
                    break;
                default:
                    break;
            }
        });

        if (min !== undefined) {
            this.create(min);
        }
    }

    create(min: number) {
        this.#worker.postMessage({
            event: "create",
            min,
        });
    }
    start() {
        this.#worker.postMessage({
            event: "start",
        });
    }
    pause() {
        this.#worker.postMessage({
            event: "pause",
        });
    }
    reset() {
        this.#worker.postMessage({
            event: "reset",
        });
    }
    resume() {
        this.#worker.postMessage({
            event: "resume",
        });
    }

    abstract onStart(detail: Detail): void;
    abstract onPause(): void;
    abstract onComplete(): void;

    abstract onTick(detail: Detail): void;

    abstract onReset(): void;
    abstract onResume(): void;
}
