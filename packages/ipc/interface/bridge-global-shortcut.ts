import type { Accelerator } from "@task/share";

export interface BridgeGlobalShortcut {
    register(
        accelerator: Accelerator.Pattern,
        callback: (...args: any[]) => void
    ): Promise<boolean>;
}
