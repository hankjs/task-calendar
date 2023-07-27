import { it, expect, vi, describe } from "vitest";
import { Category, PomodoroProps, Status, usePomodoro } from "../pomodoro";
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
        const { elapsed, status, category, start } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();

        /** ===从Focus开始 */
        expect(category.value).toBe(Category.Focus);

        start();
        expect(elapsed.value).toBe(0);
        expect(status.value).toBe(Status.Running);

        const firstTick = 3;
        vi.advanceTimersByTime(firstTick * 1000);
        expect(elapsed.value).toBe(firstTick);

        vi.advanceTimersByTime((60 - firstTick) * 1000);
        expect(elapsed.value).toBe(60);

        /** ===完成一个Focus */
        vi.advanceTimersByTime(24 * 60 * 1000);
        // 执行完成 归零
        expect(elapsed.value).toBe(0);
        expect(status.value).toBe(Status.Pending);
        expect(category.value).toBe(Category.ShortBreak);
    });

    it("运行一个轮回", () => {
        const config: Required<PomodoroProps> = {
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

        expect(category.value).toBe(Category.Focus);

        expectRound(1, Category.ShortBreak);
        expectRound(2, Category.ShortBreak);
        expectRound(3, Category.ShortBreak);
        expectRound(4, Category.LongBreak, config.timeLongBreak);
    });

    it("hook 输出的时间是倒计时", () => {
        const config: PomodoroProps = {
            /* 25Hours */
            timeWork: 25 * 60 * 60,
        };
        const { elapsed, totalSeconds, start, seconds, minute, hours } =
            useSetupHooks(() => usePomodoro(config));

        vi.useFakeTimers();

        expect(hours.value).toBe(25);
        expect(minute.value).toBe(0);
        expect(seconds.value).toBe(0);

        start();

        vi.advanceTimersByTime(1000);
        expect(hours.value).toBe(24);
        expect(minute.value).toBe(59);
        expect(seconds.value).toBe(59);

        vi.advanceTimersByTime(1000);
        expect(hours.value).toBe(24);
        expect(minute.value).toBe(59);
        expect(seconds.value).toBe(58);

        // 1分钟 过去了
        vi.advanceTimersByTime(60 * 1000);
        expect(hours.value).toBe(24);
        expect(minute.value).toBe(58);
        expect(seconds.value).toBe(58);

        // 1个小时 过去了
        vi.advanceTimersByTime(60 * 60 * 1000);
        expect(hours.value).toBe(23);
        expect(minute.value).toBe(58);
        expect(seconds.value).toBe(58);

        // 23个小时 过去了
        vi.advanceTimersByTime(23 * 60 * 60 * 1000);
        expect(hours.value).toBe(0);
        expect(minute.value).toBe(58);
        expect(seconds.value).toBe(58);

        // 58分钟 过去了
        vi.advanceTimersByTime(58 * 60 * 1000);
        expect(hours.value).toBe(0);
        expect(minute.value).toBe(0);
        expect(seconds.value).toBe(58);

        // 58秒 过去了
        vi.advanceTimersByTime(58 * 1000);

        // 下一个是ShortBreak
        expect(hours.value).toBe(0);
        expect(minute.value).toBe(5);
        expect(seconds.value).toBe(0);
    });

    it("start 时，再次调用 start 保持现状", () => {
        const { start, elapsed } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();
        start();
        expect(elapsed.value).toBe(0);

        vi.advanceTimersByTime(1000);
        // start 会重置elapsed
        start();
        expect(elapsed.value).toBe(1);
    });

    it("pause", () => {
        const { start, pause, status, elapsed } = useSetupHooks(usePomodoro);

        vi.useFakeTimers();
        start();
        expect(status.value).toBe(Status.Running);

        pause();
        expect(status.value).toBe(Status.Paused);

        vi.advanceTimersByTime(1000);
        expect(elapsed.value).toBe(0);

        start();
        vi.advanceTimersByTime(1000);
        expect(elapsed.value).toBe(1);
    });
});
