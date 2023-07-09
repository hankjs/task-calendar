class Timer extends EventTarget {
    time: number;
    totalSeconds: number;
    private _complete: Event;
    private _pause: Event;
    private _reset: Event;

    timerInt?: any;

    constructor(min: number) {
        console.log("constructor");
        super();
        this.time = 0;
        this.totalSeconds = min * 60;

        this._complete = new Event("complete");
        this._pause = new Event("pause");
        this._reset = new Event("reset");
    }

    start() {
        console.log("start");
        if (!this.timerInt) {
            this.timerInt = setInterval(() => {
                this.time += 1;
                if (this.time >= this.totalSeconds) {
                    this.pause();
                    this.dispatchEvent(this._complete);
                } else {
                    this.dispatchEvent(
                        new CustomEvent("tick", {
                            detail: {
                                time: this.time,
                                totalSeconds: this.totalSeconds,
                            },
                        })
                    );
                }
            }, 1000);
            this.dispatchEvent(
                new CustomEvent("start", {
                    detail: {
                        time: this.time,
                        totalSeconds: this.totalSeconds,
                    },
                })
            );
        }
    }

    pause() {
        clearInterval(this.timerInt);
        delete this.timerInt;
        this.dispatchEvent(this._pause);
    }

    reset() {
        clearInterval(this.timerInt);
        delete this.timerInt;
        this.time = 0;
        this.dispatchEvent(this._reset);
    }

    resume() {
        if (!this.timerInt) {
            this.start();
            this.dispatchEvent(
                new CustomEvent("resume", {
                    detail: {
                        time: this.time,
                        totalSeconds: this.totalSeconds,
                    },
                })
            );
        }
    }
}

interface TimerEvent extends Event {
    event: string;
    detail: Timer;
}

let timer: Timer;

self.onmessage = function (msg) {
    switch (msg.data.event) {
        case "create":
            handleCreate(msg.data.min);
            break;
        case "pause":
            handlePause();
            break;
        case "reset":
            handleReset();
            break;
        case "resume":
            handleResume();
            break;
        case "start":
            handleStart();
            break;
        default:
            break;
    }
};

// External event handlers

function handleCreate(min: number) {
    timer = new Timer(min);
    timer.addEventListener("complete", handleTimerComplete);
    timer.addEventListener("pause", handleTimerPause);
    timer.addEventListener("reset", handleTimerReset);
    timer.addEventListener("start", handleTimerStart as EventListener);
    timer.addEventListener("tick", handleTimerTick as EventListener);
}

function handlePause() {
    if (!timer) return;
    timer.pause();
}

function handleReset() {
    if (!timer) return;
    timer.reset();
}

function handleResume() {
    if (!timer) return;
    timer.resume();
}

function handleStart() {
    if (!timer) return;
    timer.start();
}

// Internal timer event handlers

function handleTimerComplete() {
    self.postMessage({ event: "complete" });
}

function handleTimerPause() {
    self.postMessage({ event: "pause" });
}

function handleTimerReset() {
    self.postMessage({ event: "reset" });
}

function handleTimerStart(event: TimerEvent) {
    self.postMessage({
        event: "start",
        elapsed: event.detail.time,
        totalSeconds: event.detail.totalSeconds,
    });
}

function handleTimerTick(event: TimerEvent) {
    self.postMessage({
        event: "tick",
        elapsed: event.detail.time,
        totalSeconds: event.detail.totalSeconds,
    });
}
