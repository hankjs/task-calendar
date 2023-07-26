import { BRIDGE_KEY } from "@task/config/src/constant";
import { Preload } from "../interface/preload";

declare global {
    interface Window {
        TCBridge: Preload.TCBridge;
    }
    var TCBridge: Preload.TCBridge;
}

export async function setupBridge() {
    // @ts-expect-error typescript foolish
    if (VITE_APP_PLATFORM === "Electron") {
        // Electron init bridge in src/main/preload.ts
        return;
    }

    const bridge = await import("./platform/web");
    globalThis[BRIDGE_KEY] = bridge.TCBridgeWeb;
}
