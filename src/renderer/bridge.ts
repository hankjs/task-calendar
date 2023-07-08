import { setupBridge } from "@task/ipc/renderer";
import { Preload } from "@task/ipc/interface/preload";

type BridgeKey = keyof Preload.TCBridge;

export function getBridge<K extends BridgeKey>(key?: K) {
    return new Promise<
        K extends BridgeKey ? Preload.TCBridge[K] : Preload.TCBridge
    >(async (resolve) => {
        if (!window.TCBridge) {
            await setupBridge();
        }
        if (key) {
            // @ts-expect-error typescript foolish
            return resolve(window.TCBridge[key]);
        }

        // @ts-expect-error typescript foolish
        return resolve(window.TCBridge);
    });
}
