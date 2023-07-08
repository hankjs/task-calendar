import { Preload } from "../../../interface/preload";
import { Settings } from "../../../interface/db";
import { TaskWebDB } from "./db";
import { ElectronBridge } from "./electron";
import { GlobalShortcutBridge } from "./global-shortcut";
import { LoggerBridge } from "./logger";

export const TCBridgeWeb: Preload.TCBridge = {
  electron: ElectronBridge,
  globalShortcut: GlobalShortcutBridge,
  db: new TaskWebDB<Settings>("user-preferences"),
  logger: LoggerBridge
};
