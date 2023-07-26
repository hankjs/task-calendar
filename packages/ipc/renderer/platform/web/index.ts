import { Preload } from "../../../interface/preload";
import { DBBridge } from "./db";
import { ElectronBridge } from "./electron";
import { GlobalShortcutBridge } from "./global-shortcut";
import { LoggerBridge } from "./logger";
import { NotificationBridge } from "./notification";

export const TCBridgeWeb: Preload.TCBridge = {
    electron: ElectronBridge,
    globalShortcut: GlobalShortcutBridge,
    db: DBBridge,
    logger: LoggerBridge,
    notification: NotificationBridge,
};
