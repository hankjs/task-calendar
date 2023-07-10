import "jsdom-worker";
import { test, expect, vi } from "vitest";
import timerWorker from "@/worker/timer?raw";

test("timer", async () => {
    const worker = new Worker(URL.createObjectURL(new Blob([timerWorker])));
    const fn = vi.fn();
    worker.postMessage({ event: "create", min: 1 });
    worker.addEventListener("message", (message) => {
        switch (message.data.event) {
            case "start":
                fn();
                break;
            default:
                break;
        }
    });

    expect(fn).toBeCalled()
});
