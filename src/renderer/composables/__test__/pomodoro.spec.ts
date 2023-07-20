import { it, expect, vi, describe, afterAll } from "vitest";
import { Category, Status, usePomodoro } from "../pomodoro";
import { useSetupHooks } from "@/tests/component";

describe("Pomodoro", () => {
    it("创建一个番茄钟", () => {
        const { timer, category: status } = usePomodoro();

        expect(timer).toBeDefined();
        expect(status.value).toBe(Category.Focus);
        afterAll(() =>{
            wrapper.unmount()
        })
    });

    it("开始一个番茄钟", () => {
        const { start, status } = usePomodoro();

        expect(status.value).toBe(Status.Pending);

        start();
        expect(status.value).toBe(Status.Running);
    });

    it("运行中暂停", () => {
        const { start, status, pause } = usePomodoro();

        expect(status.value).toBe(Status.Pending);

        start();
        expect(status.value).toBe(Status.Running);

        pause();
        expect(status.value).toBe(Status.Paused);
    });
});
