import { it, expect, vi, describe } from "vitest";
import { Status, usePomodoro } from "../pomodoro";

describe("Pomodoro", () => {
    it("创建一个番茄钟", () => {
        const { timer, status } = usePomodoro();

        expect(timer).toBeDefined();
        expect(status.value).toBe(Status.Focus);
    });
});
