import { IPCElectronRegister } from "./electron";
import { IPCGlobalShortcutRegister } from "./global-shortcut";
import { IPCLoggerRegister } from "./logger";

export { CommonWindowEvent } from "./window-event";
export { logger } from "./logger";

export function IPCRegister() {
  IPCElectronRegister();
  IPCGlobalShortcutRegister();
  IPCLoggerRegister()
}
