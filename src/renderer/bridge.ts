import { setupBridge } from "@task/ipc/renderer";
import { Preload } from "@task/ipc/interface/preload";
import { BRIDGE_KEY } from "@task/config/src/constant";

type BridgeKey = keyof Preload.TCBridge;

export function getBridge<K extends BridgeKey>(key?: K) {
    return new Promise(
        async (
            resolve: (r: Preload.TCBridge[K] | Preload.TCBridge) => void
        ) => {
            if (!globalThis[BRIDGE_KEY]) {
                await setupBridge();
            }
            if (key) {
                return resolve(
                    globalThis[BRIDGE_KEY][key] as Preload.TCBridge[K]
                );
            }

            return resolve(globalThis[BRIDGE_KEY]);
        }
    );
}
