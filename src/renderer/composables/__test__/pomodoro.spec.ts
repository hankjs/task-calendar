import { it, expect, vi, describe } from "vitest";
import { Category, PomodoroProps, Status, usePomodoro } from "../pomodoro";
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

    it("运行一个25分钟的番茄钟", () => {
        const {
            seconds: second,
            minute,
            status,
            category,
            start,
        } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();

        /** ===从Focus开始 */
        expect(category.value).toBe(Category.Focus);

        start();
        expect(second.value).toBe(0);
        expect(status.value).toBe(Status.Running);

        const firstTick = 3;
        vi.advanceTimersByTime(firstTick * 1000);
        expect(second.value).toBe(firstTick);

        vi.advanceTimersByTime((60 - firstTick) * 1000);
        expect(second.value).toBe(60);
        expect(minute.value).toBe(1);

        /** ===完成一个Focus */
        vi.advanceTimersByTime(24 * 60 * 1000);
        // 最后一秒不跑，直接执行complete
        expect(second.value).toBe(25 * 60 - 1);
        expect(minute.value).toBe(24);
        expect(status.value).toBe(Status.Pending);
        expect(category.value).toBe(Category.ShortBreak);
    });

    it("运行一个轮回", () => {
        const config: PomodoroProps = {
            workRounds: 4,
            timeLongBreak: 15,
            timeShortBreak: 5,
            timeWork: 25,
        };
        const { round, status, category, start } = useSetupHooks(() =>
            usePomodoro(config)
        );

        vi.useFakeTimers();

        function expectRound(
            roundCount: number,
            breakCategory: Category,
            breakTime: number = config.timeShortBreak
        ) {
            /** ========
             *  从Focus开始
             * ========= */
            start();
            expect(round.value).toBe(roundCount);
            expect(status.value).toBe(Status.Running);

            /** ========
             * 完成一个Focus, 类型换成ShortBreak
             * ========= */
            vi.advanceTimersByTime(config.timeWork * 1000);
            expect(status.value).toBe(Status.Pending);
            expect(category.value).toBe(breakCategory);

            /** ========
             * R1, ShortBreak开始
             * ========= */
            start();
            expect(round.value).toBe(roundCount);
            expect(status.value).toBe(Status.Running);

            /** ========
             * 完成一个ShortBreak, 类型换成Focus
             * ========= */
            vi.advanceTimersByTime(breakTime * 1000);
            expect(status.value).toBe(Status.Pending);
            expect(category.value).toBe(Category.Focus);
        }

        expect(round.value).toBe(0);
        expect(category.value).toBe(Category.Focus);

        expectRound(1, Category.ShortBreak);
        expectRound(2, Category.ShortBreak);
        expectRound(3, Category.ShortBreak);
        expectRound(4, Category.LongBreak, config.timeLongBreak);
    });
});
