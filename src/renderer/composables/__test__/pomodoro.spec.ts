import { it, expect, vi, describe } from "vitest";
import { Category, Status, usePomodoro } from "../pomodoro";
import { useSetupHooks } from "@/tests/component";
import { nextTick } from "vue";

describe("Pomodoro", () => {
    it("初始类型是Focus", () => {
        const { timer, category } = useSetupHooks(usePomodoro);

        expect(timer).toBeDefined();
        expect(category.value).toBe(Category.Focus);
    });

    it("启动番茄钟，状态变为Running", () => {
        const { start, status } = useSetupHooks(usePomodoro);

        expect(status.value).toBe(Status.Pending);

        start();
        expect(status.value).toBe(Status.Running);
    });

    it("暂停运行中的番茄钟，状态变为Paused", () => {
        const { start, status, pause } = useSetupHooks(usePomodoro);

        expect(status.value).toBe(Status.Pending);

        start();
        expect(status.value).toBe(Status.Running);

        pause();
        expect(status.value).toBe(Status.Paused);
    });

    it("运行一个25分钟的番茄钟", async () => {
        const {
            seconds: second,
            minute,
            status,
            start,
        } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();

        start();
        expect(second.value).toBe(0);
        expect(status.value).toBe(Status.Running);

        const firstTick = 3;
        vi.advanceTimersByTime(firstTick * 1000);
        expect(second.value).toBe(firstTick);

        vi.advanceTimersByTime((60 - firstTick) * 1000);
        expect(second.value).toBe(60);
        await nextTick();
        expect(minute.value).toBe(1);

        vi.advanceTimersByTime(24 * 60 * 1000);
        // 最后一秒不跑，直接执行complete
        expect(second.value).toBe(25 * 60 - 1);
        await nextTick();
        expect(minute.value).toBe(24);
        expect(status.value).toBe(Status.Pending);
    });
});
