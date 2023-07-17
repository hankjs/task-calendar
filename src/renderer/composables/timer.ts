import { onUnmounted, ref, shallowRef } from "vue";
import { TimerEventMap, TimerWorker } from "@/worker/timer-worker";
import { Handler } from "mitt";

export enum Status {
    None,
    Create,
    Running,
    Complete,
}

export function useTimer() {
    const timer = shallowRef(new TimerWorker());

    const status = ref(Status.None);

    const onCreate = (handler: Handler<TimerEventMap["create"]>) => {
        timer.value.addEventListener("create", handler);
    };
    const onStart = (handler: Handler<TimerEventMap["start"]>) => {
        timer.value.addEventListener("start", handler);
    };
    const onPause = (handler: Handler<TimerEventMap["pause"]>) => {
        timer.value.addEventListener("pause", handler);
    };
    const onComplete = (handler: Handler<TimerEventMap["complete"]>) => {
        timer.value.addEventListener("complete", handler);
    };
    const onReset = (handler: Handler<TimerEventMap["reset"]>) => {
        timer.value.addEventListener("reset", handler);
    };
    const onResume = (handler: Handler<TimerEventMap["resume"]>) => {
        timer.value.addEventListener("resume", handler);
    };
    const onTick = (handler: Handler<TimerEventMap["tick"]>) => {
        timer.value.addEventListener("tick", handler);
    };

    onCreate(() => {
        status.value = Status.Create;
    });

    onStart(() => {
        status.value = Status.Running;
    });

    onComplete(() => {
        status.value = Status.Complete;
    });

    onUnmounted(() => {
        timer.value.dispose();
    });

    return {
        timer,
        status,
        onCreate,
        onStart,
        onPause,
        onComplete,
        onReset,
        onResume,
        onTick,
    };
}
