import { it, expect, vi, describe } from "vitest";
import { TimerWorker } from "./timer-worker";

describe("timer abstract class worker", () => {
    it("timer create and start", async () => {
        const timer = new TimerWorker(1);
        const spyTimerStart = vi.spyOn(timer, "start");

        expect(spyTimerStart).not.toBeCalled();

        timer.start();
        expect(spyTimerStart).toBeCalled();
    });
});
