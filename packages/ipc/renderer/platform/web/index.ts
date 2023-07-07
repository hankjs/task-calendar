import { Preload } from "../../../interface/preload";
import { ElectronBridge } from "./electron";
import { GlobalShortcutBridge } from "./global-shortcut";

export const TCBridgeWeb: Preload.TCBridge = {
  electron: ElectronBridge,
  globalShortcut: GlobalShortcutBridge,
};
