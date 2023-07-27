import { ipcMain } from "electron";
import { IPCGlobalShortcut, IPCRegister } from "../interface/types";

export const IPCGlobalShortcutRegister: IPCRegister = (app) => {
    ipcMain.handle(IPCGlobalShortcut.Channel.register, (e, accelerator) => {
        e.sender.postMessage("gs", accelerator);
    });
};
