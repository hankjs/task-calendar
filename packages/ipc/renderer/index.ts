import { BRIDGE_KEY } from "@task/config/constant";
import { Preload } from "../interface/preload";
import { TCBridgeWeb } from "./platform/web";

declare global {
    interface Window {
        TCBridge: Preload.TCBridge;
    }
    var TCBridge: Preload.TCBridge;
}

export function setupBridge() {
    // @ts-expect-error typescript foolish
    if (VITE_APP_PLATFORM === "Electron") {
        // Electron init bridge in src/main/preload.ts
        return;
    }

    globalThis[BRIDGE_KEY] = TCBridgeWeb;
}
