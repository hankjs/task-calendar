import { Preload } from "@task/ipc/interface/preload";
import { vi } from "vitest";
import { TCBridgeWeb } from "@task/ipc/renderer/platform/web";

export const VitestTCBridge: Partial<Preload.TCBridge> = {
    ...TCBridgeWeb,
    notification: {
        notification: vi.fn(),
    },
};
