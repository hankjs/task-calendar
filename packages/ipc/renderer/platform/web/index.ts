import { Preload } from "../../../interface/preload";
import { DBBridgeWeb } from "./db";
import { ElectronBridge } from "./electron";
import { GlobalShortcutBridge } from "./global-shortcut";
import { LoggerBridge } from "./logger";
import { NotificationBridge } from "./notification";

export const TCBridgeWeb: Preload.TCBridge = {
    electron: ElectronBridge,
    globalShortcut: GlobalShortcutBridge,
    db: new DBBridgeWeb(),
    logger: LoggerBridge,
    notification: NotificationBridge,
};
