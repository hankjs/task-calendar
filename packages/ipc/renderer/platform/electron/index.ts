import { Preload } from "../../../interface/preload";
import { Settings } from "../../../interface/db";
import { TaskFileDB } from "./db";
import { ElectronBridge } from "./electron";
import { GlobalShortcutBridge } from "./global-shortcut";
import { LoggerBridge } from "./logger";
import { NotificationBridge } from "./notification";

export const TCBridgeElectron: Preload.TCBridge = {
    electron: ElectronBridge,
    globalShortcut: GlobalShortcutBridge,
    db: new TaskFileDB<Settings>("user-preferences"),
    logger: LoggerBridge,
    notification: NotificationBridge,
};
