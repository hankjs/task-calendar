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

type PomodoroProps = {
    workRounds: number;
    timeLongBreak: number;
    timeShortBreak: number;
    timeWork: number;
};

export function usePomodoro(
    props: PomodoroProps = {
        workRounds: 4,
        timeLongBreak: 15,
        timeShortBreak: 5,
        timeWork: 25,
    }
) {
    const { timer, onTick, onComplete } = useTimer();
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
        status.value = Status.Running;
        timer.value.create(props.timeWork * 60);
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
            category.value = Category.ShortBreak;
        }
    });
    //#endregion Timer

    return {
        //#region Field
        timer,
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
