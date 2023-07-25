import { computed, ref, shallowRef, watch } from "vue";
import { useTimer } from "./timer";

export enum Category {
    /** 番茄钟 专注 */
    Focus = "Focus",
    /** 短休息 */
    ShortBreak = "ShortBreak",
    /** 长休息 */
    LongBreak = "LongBreak",
}

export enum Status {
    /** 待机 */
    Pending = "Pending",
    /** 运行中 */
    Running = "Running",
    /** 暂停中 */
    Paused = "Paused",
}

export type PomodoroProps = {
    /** 工作轮数，一轮一个LongBreak */
    workRounds?: number;
    /** 长休息 时长(秒) */
    timeLongBreak?: number;
    /** 短休息 时长(秒) */
    timeShortBreak?: number;
    /** 一个Focus 时长(秒) */
    timeWork?: number;
};

export function usePomodoro(props: PomodoroProps = {}) {
    const {
        workRounds = 4,
        timeLongBreak = 15 * 60,
        timeShortBreak = 5 * 60,
        timeWork = 25 * 60,
    } = props;
    const { timer, onTick, onStart, onComplete } = useTimer();
    const round = ref(1);
    const category = shallowRef(Category.Focus);
    const status = shallowRef(Status.Pending);
    const elapsed = shallowRef(0);
    const totalSeconds = shallowRef(timeWork);
    const hours = computed(() => {
        return Math.floor((totalSeconds.value - elapsed.value) / 60 / 60);
    });
    const minute = computed(() => {
        return Math.floor(((totalSeconds.value - elapsed.value) / 60) % 60);
    });
    const seconds = computed(() => {
        return Math.floor((totalSeconds.value - elapsed.value) % 60);
    });

    function start() {
        status.value = Status.Running;
        elapsed.value = 0;
        const time =
            category.value === Category.Focus
                ? timeWork
                : round.value % workRounds === 0
                ? timeLongBreak
                : timeShortBreak;
        timer.value.create(time);
        timer.value.start();
    }

    function pause() {
        status.value = Status.Paused;
    }

    //#region Timer
    onStart(({ totalSeconds: _ }) => {
        totalSeconds.value = _;
    });

    onTick(({ elapsed: _ }) => {
        elapsed.value = _;
    });

    onComplete(() => {
        status.value = Status.Pending;
        const currentCategory = category.value;

        if (currentCategory === Category.Focus) {
            category.value =
                round.value % workRounds === 0
                    ? Category.LongBreak
                    : Category.ShortBreak;
        } else if (currentCategory === Category.ShortBreak) {
            category.value = Category.Focus;
        } else if (currentCategory === Category.LongBreak) {
            round.value = 1;
            category.value = Category.Focus;
        }

        /** Reset */
        elapsed.value = 0;
        switch (category.value) {
            case Category.Focus:
                round.value++;
                totalSeconds.value = timeWork;
                break;
            case Category.ShortBreak:
                totalSeconds.value = timeShortBreak;
                break;
            case Category.LongBreak:
                totalSeconds.value = timeLongBreak;
                break;

            default:
                break;
        }
    });
    //#endregion Timer

    return {
        //#region Field
        timer,

        round,
        category,
        status,

        elapsed,
        totalSeconds,
        seconds,
        minute,
        hours,
        //#endregion Field

        //#region Method
        start,
        pause,
        //#endregion Method
    };
}
