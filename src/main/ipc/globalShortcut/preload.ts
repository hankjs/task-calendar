import { ipcRenderer } from "electron"
import type { Accelerator } from "../../../../packages/share/src/Accelerator";
import { IPCGlobalShortcut } from "./namespace";

/**
 * Accelerator DOC <https://www.electronjs.org/docs/latest/api/accelerator>
 */
export const GlobalShortcutBridge = {
    register(accelerator: Accelerator.Pattern, callback: () => void): Promise<boolean> {
        return ipcRenderer.invoke(IPCGlobalShortcut.Channel.register, accelerator)
    }
}
