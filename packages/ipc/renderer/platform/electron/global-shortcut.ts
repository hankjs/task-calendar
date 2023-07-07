import { ipcRenderer } from "electron"
import type { Accelerator } from "@task/share";
import { IPCGlobalShortcut } from "../../../interface/types";

/**
 * Accelerator DOC <https://www.electronjs.org/docs/latest/api/accelerator>
 */
export const GlobalShortcutBridge = {
    register(accelerator: Accelerator.Pattern, callback: () => void): Promise<boolean> {
        return ipcRenderer.invoke(IPCGlobalShortcut.Channel.register, accelerator)
    }
}
