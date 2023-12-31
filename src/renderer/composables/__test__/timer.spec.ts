import { it, expect, vi, describe } from "vitest";
import { useTimer, Status } from "../timer";
import { useSetupHooks } from "@/tests/component";

describe("use timer WebWorker", () => {
    it("status create -> start -> complete", async () => {
        const { $vm, timer, status } = useSetupHooks(() => {
            const { timer, status } = useTimer();
            return {
                timer,
                status,
            };
        });

        expect(status.value).toBe(Status.None);

        vi.useFakeTimers();
        timer.value.create(1);
        expect(status.value).toBe(Status.Create);

        timer.value.start();
        expect(status.value).toBe(Status.Running);

        await vi.advanceTimersByTimeAsync(1000);
        expect(status.value).toBe(Status.Complete);

        $vm.unmount();
    });

    it("on[LifeCycle]", async () => {
        const {
            $vm,
            timer,
            onCreate,
            onStart,
            onPause,
            onComplete,
            onReset,
            onResume,
            onTick,
        } = useSetupHooks(() => {
            return {
                ...useTimer(),
            };
        });

        const create = vi.fn();
        const start = vi.fn();
        const pause = vi.fn();
        const complete = vi.fn();
        const reset = vi.fn();
        const resume = vi.fn();
        const tick = vi.fn();

        vi.useFakeTimers();

        onCreate(create);
        onStart(start);
        onPause(pause);
        onComplete(complete);
        onReset(reset);
        onResume(resume);
        onTick(tick);

        const totalSeconds = 3;
        timer.value.create(totalSeconds);

        expect(create).toBeCalledTimes(1);
        expect(start).toBeCalledTimes(0);
        expect(pause).toBeCalledTimes(0);
        expect(complete).toBeCalledTimes(0);
        expect(reset).toBeCalledTimes(0);
        expect(resume).toBeCalledTimes(0);
        expect(tick).toBeCalledTimes(0);

        timer.value.start();

        expect(create).toBeCalledTimes(1);
        expect(start).lastCalledWith({
            elapsed: 0,
            totalSeconds,
        });
        expect(complete).toBeCalledTimes(0);
        expect(tick).toBeCalledTimes(0);

        await vi.advanceTimersByTimeAsync(1000);

        expect(tick).lastCalledWith({
            elapsed: 1,
            totalSeconds,
        });

        timer.value.pause();

        expect(pause).toBeCalledTimes(1);

        await vi.advanceTimersByTimeAsync(1000);
        // tick not called
        expect(tick).toBeCalledTimes(1);

        timer.value.resume();

        expect(start).toBeCalledTimes(2);
        expect(resume).toBeCalledTimes(1);
        expect(tick).toBeCalledTimes(1);

        await vi.advanceTimersByTimeAsync(1000);

        expect(tick).toBeCalledTimes(2);
        expect(tick).lastCalledWith({
            elapsed: 2,
            totalSeconds,
        });

        await vi.advanceTimersByTimeAsync(1000);

        expect(create).toBeCalledTimes(1);
        expect(start).toBeCalledTimes(2);
        expect(pause).toBeCalledTimes(1);
        expect(complete).toBeCalledTimes(1);
        expect(reset).toBeCalledTimes(0);
        expect(resume).toBeCalledTimes(1);
        expect(tick).toBeCalledTimes(2);

        $vm.unmount();
    });
});
