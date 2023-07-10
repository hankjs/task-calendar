import { it, expect, vi, describe } from "vitest";
import timerWorker from "@/worker/timer?raw";
import { MockWorker } from "@/tests/worker.mock";

describe("timer web worker", () => {
    it("timer create and start", async () => {
        const worker = new MockWorker(timerWorker);
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
        worker.postMessage({ event: "start" });
        expect(fn).toBeCalled();
    });

    it("timer complete", async () => {
        vi.useFakeTimers()
        const worker = new MockWorker(timerWorker);
        const spyStart = vi.fn();
        const spyComplete = vi.fn();
        worker.postMessage({ event: "create", min: 1 });
        worker.addEventListener("message", (message) => {
            switch (message.data.event) {
                case "start":
                    spyStart();
                    break;
                case "complete":
                    spyComplete();
                    break;
                default:
                    break;
            }
        });
        worker.postMessage({ event: "start" });

        expect(spyStart).toBeCalled();
        expect(spyComplete).not.toBeCalled();

        /** vi.clearAllTimers inadequacy */
        vi.advanceTimersByTime(1000 * 60 * 1);
        
        expect(spyStart).toBeCalledTimes(1);
        expect(spyComplete).toBeCalled();
    });
});
