import { getBridge } from "@/bridge";
import { Preload } from "packages/ipc/interface/preload";
import { IPCNotification } from "@task/ipc/interface/types";
import { onMounted, shallowRef } from "vue";

export function useNotification() {
    const refNotification = shallowRef<Preload.TCBridge["notification"] | null>(
        null
    );

    onMounted(async () => {
        refNotification.value = getBridge(
            "notification"
        ) as Preload.TCBridge["notification"];
    });

    function notification(options: IPCNotification.Options) {
        refNotification.value?.notification(options);
    }

    return {
        notification,
    };
}
