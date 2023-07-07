import type { Accelerator } from "@task/share";
import { IPCGlobalShortcut } from "../../../interface/types";

/**
 * Accelerator DOC <https://www.electronjs.org/docs/latest/api/accelerator>
 */
export const GlobalShortcutBridge = {
    register(accelerator: Accelerator.Pattern, callback: () => void): Promise<boolean> {
        console.log(IPCGlobalShortcut.Channel.register, accelerator, callback);
        return Promise.resolve(true)
    }
}
