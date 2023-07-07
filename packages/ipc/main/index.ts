import { IPCElectronRegister } from "./electron/main";
import { IPCGlobalShortcutRegister } from "./global-shortcut/main";

export { CommonWindowEvent } from "./window-event";

export function IPCRegister() {
  IPCElectronRegister();
  IPCGlobalShortcutRegister();
}
