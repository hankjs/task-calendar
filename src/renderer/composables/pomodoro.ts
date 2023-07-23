import { ref, shallowRef } from "vue";
import { useTimer } from "./timer";

export enum Category {
    /** 番茄钟 专注 */
    Focus,
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
    const second = shallowRef(0);

    function start() {
        status.value = Status.Running;
        timer.value.create(props.timeWork * 60 * 1000);
        timer.value.start()
    }

    function pause() {
        status.value = Status.Paused;
    }

    //#region Timer
    onTick(({ elapsed }) => {
        second.value = elapsed;
    });

    onComplete(() => {
        status.value = Status.Pending;
    });
    //#endregion Timer

    return {
        //#region Field
        timer,
        category,
        status,

        second,
        //#endregion Field

        //#region Method
        start,
        pause,
        //#endregion Method
    };
}
