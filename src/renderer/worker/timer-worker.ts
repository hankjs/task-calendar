import mitt, { Emitter, type Handler } from "mitt";

export type TimerEvent = {
    elapsed: number;
    totalSeconds: number;
};

export type TimerEventMap = {
    create: void;
    start: TimerEvent;
    pause: void;
    complete: void;
    tick: TimerEvent;
    reset: void;
    resume: void;
};

const timerWorkerUrl = new URL("./timer.worker.js", import.meta.url);

export class TimerWorker {
    eventBus: Emitter<TimerEventMap>;
    #worker: Worker;

    constructor(seconds?: number) {
        this.eventBus = mitt<TimerEventMap>();
        this.#worker = new Worker(timerWorkerUrl);
        this.#worker.addEventListener("message", (message) => {
            switch (message.data.event) {
                case "complete":
                    this.eventBus.emit("complete");
                    break;
                case "pause":
                    this.eventBus.emit("pause");
                    break;
                case "reset":
                    this.eventBus.emit("reset");
                    break;
                case "resume":
                    this.eventBus.emit("resume");
                    break;
                case "start":
                    this.eventBus.emit("start", {
                        elapsed: message.data.elapsed,
                        totalSeconds: message.data.totalSeconds,
                    });
                    break;
                case "tick":
                    this.eventBus.emit("tick", {
                        elapsed: message.data.elapsed,
                        totalSeconds: message.data.totalSeconds,
                    });
                    break;
                default:
                    break;
            }
        });

        if (seconds !== undefined) {
            this.create(seconds);
        }
    }

    create(seconds: number) {
        this.#worker.postMessage({
            event: "create",
            seconds,
        });
        this.eventBus.emit("create")
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

    /** TODO Update TypeScript 5.2 using */
    dispose() {
        this.eventBus.all.clear();
    }

    dispatchEvent<Key extends keyof TimerEventMap>(
        type: Key,
        event: TimerEventMap[Key]
    ): void {
        this.eventBus.emit(type, event);
    }
    addEventListener<Key extends keyof TimerEventMap>(
        type: Key,
        handler: Handler<TimerEventMap[Key]>
    ): void {
        this.eventBus.on(type, handler);
    }
    removeEventListener<Key extends keyof TimerEventMap>(
        type: Key,
        handler?: Handler<TimerEventMap[Key]>
    ): void {
        this.eventBus.off(type, handler);
    }
}
