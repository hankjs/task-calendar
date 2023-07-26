import { Preload } from "@task/ipc/interface/preload";
import { vi } from "vitest";

export const VitestTCBridge: Partial<Preload.TCBridge> = {
    notification: {
        notification: vi.fn(),
    },
};
