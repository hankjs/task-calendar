import { ipcMain } from "electron";
import { IPCGlobalShortcut } from "../../interface/types";

export function IPCGlobalShortcutRegister() {
    ipcMain.handle(IPCGlobalShortcut.Channel.register, (e, accelerator) => {
        e.sender.postMessage("gs", accelerator);
    });
}