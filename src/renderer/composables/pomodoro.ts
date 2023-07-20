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

export function usePomodoro() {
    const { timer } = useTimer();
    const category = shallowRef(Category.Focus);
    const status = shallowRef(Status.Pending);

    function start() {
        status.value = Status.Running;
    }

    function pause() {
        status.value = Status.Paused;
    }

    return {
        //#region Field
        timer,
        category,
        status,
        //#endregion

        //#region Method
        start,
        pause,
        //#endregion
    };
}
