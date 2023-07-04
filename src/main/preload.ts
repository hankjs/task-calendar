import { contextBridge } from 'electron';
import { Preload } from "src/preload";
import { GlobalShortcutBridge } from "./ipc/globalShortcut/preload";
import { ElectronBridge } from "./ipc/electron/preload";

const api: Preload.ElectronBridge = {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
    globalShortcut: GlobalShortcutBridge,
    electron: ElectronBridge
}

contextBridge.exposeInMainWorld('electronBridge', api);
