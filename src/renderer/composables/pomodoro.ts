import { ref, shallowRef } from "vue";
import { useTimer } from "./timer";

export enum Status {
    /** 番茄钟 工作计时 专注 */
    Focus,

}

export function usePomodoro() {
    const { timer } = useTimer();
    const status = shallowRef(Status.Focus);

    return {
        timer,
        status
    };
}
