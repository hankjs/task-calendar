import { it, expect, vi, describe } from "vitest";
import { TimerWorker } from "./timer";

describe("timer abstract class worker", () => {
    it("timer create and start", async () => {
        class Timer extends TimerWorker {
            constructor(min: number) {
                super(min);
            }

            onStart(detail: { elapsed: number; totalSeconds: number }): void {}
            onPause(): void {}
            onComplete(): void {}
            onTick(detail: { elapsed: number; totalSeconds: number }): void {}
            onReset(): void {}
            onResume(): void {}
        }

        const timer = new Timer(1);
        const spyTimerOnStart = vi.spyOn(timer, "onStart");

        expect(spyTimerOnStart).not.toBeCalled();

        timer.start();
        expect(spyTimerOnStart).toBeCalled();
    });
});
