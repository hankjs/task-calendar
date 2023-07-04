import { IPCElectronRegister } from "./electron/main";
import { IPCGlobalShortcutRegister } from "./globalShortcut/main";

export function IPCRegister() {
    IPCElectronRegister();
    IPCGlobalShortcutRegister();
}