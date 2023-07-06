import { IPCElectronRegister } from "./electron/main";
import { IPCGlobalShortcutRegister } from "./globalShortcut/main";

export { CommonWindowEvent } from "./CommonWindowEvent";

export function IPCRegister() {
  IPCElectronRegister();
  IPCGlobalShortcutRegister();
}
