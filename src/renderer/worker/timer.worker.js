class Timer extends EventTarget {
    time;
    totalSeconds;
    _complete;
    _pause;
    _reset;
    timerInt;

    constructor(seconds) {
        super();
        this.time = 0;
        this.totalSeconds = seconds;

        this._complete = new Event("complete");
        this._pause = new Event("pause");
        this._reset = new Event("reset");
    }

    start() {
        if (!this.timerInt) {
            this.timerInt = setInterval(() => {
                this.time += 1;
                if (this.time >= this.totalSeconds) {
                    this.complete()
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

    complete() {
        clearInterval(this.timerInt);
        delete this.timerInt;
        this.dispatchEvent(this._complete);
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
            handleCreate(msg.data.seconds);
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

function handleCreate(seconds) {
    timer = new Timer(seconds);
    timer.addEventListener("start", handleTimerStart);
    timer.addEventListener("pause", handleTimerPause);
    timer.addEventListener("resume", handleTimerResume);
    timer.addEventListener("complete", handleTimerComplete);

    timer.addEventListener("reset", handleTimerReset);

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

function handleTimerResume() {
    self.postMessage({ event: "resume" });
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
