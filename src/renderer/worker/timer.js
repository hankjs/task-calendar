class Timer extends EventTarget {
    constructor(min) {
        super();
        this.time = 0;
        this.totalSeconds = min * 60;

        this._complete = new Event("complete");
        this._pause = new Event("pause");
        this._reset = new Event("reset");
    }

    start() {
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

let timer;

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

function handleCreate(min) {
    timer = new Timer(min);
    timer.addEventListener("complete", handleTimerComplete);
    timer.addEventListener("pause", handleTimerPause);
    timer.addEventListener("reset", handleTimerReset);
    timer.addEventListener("start", handleTimerStart);
    timer.addEventListener("tick", handleTimerTick);
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

function handleTimerStart(event) {
    self.postMessage({
        event: "start",
        elapsed: event.detail.time,
        totalSeconds: event.detail.totalSeconds,
    });
}

function handleTimerTick(event) {
    self.postMessage({
        event: "tick",
        elapsed: event.detail.time,
        totalSeconds: event.detail.totalSeconds,
    });
}
