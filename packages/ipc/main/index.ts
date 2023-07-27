import { App } from "../interface/types";
import { IPCDBRegister } from "./db";
import { IPCElectronRegister } from "./electron";
import { IPCGlobalShortcutRegister } from "./global-shortcut";
import { IPCLoggerRegister } from "./logger";
import { IPCNotificationRegister } from "./notification";

export { CommonWindowEvent } from "./window-event";
export { logger } from "./logger";

export function IPCRegister(app: App) {
    IPCElectronRegister(app);
    IPCGlobalShortcutRegister(app);
    IPCLoggerRegister(app);
    IPCNotificationRegister(app);
    IPCDBRegister(app);
}
