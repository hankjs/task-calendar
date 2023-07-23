import { it, expect, vi, describe } from "vitest";
import { Category, Status, usePomodoro } from "../pomodoro";
import { useSetupHooks } from "@/tests/component";

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

    it("运行一个25分钟的番茄钟", () => {
        const { second, start } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();

        start();
        expect(second.value).toBe(0);

        vi.advanceTimersByTime(3 * 1000);
        expect(second.value).toBe(3);
    });
});
