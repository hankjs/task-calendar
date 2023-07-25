import { computed, ref, shallowRef, watch } from "vue";
import { useTimer } from "./timer";

export enum Category {
    /** 番茄钟 专注 */
    Focus,
    /** 短休息 */
    ShortBreak,
    /** 长休息 */
    LongBreak,
}

export enum Status {
    /** 待机 */
    Pending,
    /** 运行中 */
    Running,
    /** 暂停中 */
    Paused,
}

export type PomodoroProps = {
    /** 工作轮数，一轮一个LongBreak */
    workRounds: number;
    /** 长休息 时长(秒) */
    timeLongBreak: number;
    /** 短休息 时长(秒) */
    timeShortBreak: number;
    /** 一个Focus 时长(秒) */
    timeWork: number;
};

export function usePomodoro(
    props: PomodoroProps = {
        workRounds: 4,
        timeLongBreak: 15 * 60,
        timeShortBreak: 5 * 60,
        timeWork: 25 * 60,
    }
) {
    const { timer, onTick, onComplete } = useTimer();
    const round = ref(0);
    const category = shallowRef(Category.Focus);
    const status = shallowRef(Status.Pending);
    const seconds = shallowRef(0);
    const minute = computed(() => {
        return Math.floor(seconds.value / 60);
    });
    const hours = computed(() => {
        return Math.floor(seconds.value / 60);
    });

    function start() {
        if (category.value === Category.Focus) {
            round.value++;
        }
        status.value = Status.Running;
        const time =
            category.value === Category.Focus
                ? props.timeWork
                : round.value % props.workRounds === 0
                ? props.timeLongBreak
                : props.timeShortBreak;
        timer.value.create(time);
        timer.value.start();
    }

    function pause() {
        status.value = Status.Paused;
    }

    //#region Timer
    onTick(({ elapsed }) => {
        seconds.value = elapsed;
    });

    onComplete(() => {
        status.value = Status.Pending;
        const currentCategory = category.value;

        if (currentCategory === Category.Focus) {
            category.value =
                round.value % props.workRounds === 0
                    ? Category.LongBreak
                    : Category.ShortBreak;
            return;
        }

        // 一轮完成 重置
        if (
            currentCategory === Category.LongBreak ||
            currentCategory === Category.ShortBreak
        ) {
            category.value = Category.Focus;
        }
    });
    //#endregion Timer

    return {
        //#region Field
        timer,

        round,
        category,
        status,

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
