import { setupBridge } from "@task/ipc/renderer";
import { Preload } from "@task/ipc/interface/preload";
import { BRIDGE_KEY } from "@task/config/constant";

type BridgeKey = keyof Preload.TCBridge;

export function getBridge(): Preload.TCBridge;
export function getBridge<K extends BridgeKey>(key: K): Preload.TCBridge[K];
export function getBridge<K extends BridgeKey>(key?: K) {
    if (!globalThis[BRIDGE_KEY]) {
        setupBridge();
    }
    if (key) {
        return globalThis[BRIDGE_KEY][key] as Preload.TCBridge[K];
    }

    return globalThis[BRIDGE_KEY];
}
