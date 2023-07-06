import { contextBridge } from 'electron';
import { Preload } from "src/typings/preload";
import { GlobalShortcutBridge } from "@packages/ipc/main/globalShortcut/preload";
import { ElectronBridge } from "@packages/ipc/main/electron/preload";

const api: Preload.ElectronBridge = {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
    globalShortcut: GlobalShortcutBridge,
    electron: ElectronBridge
}

contextBridge.exposeInMainWorld('TCBridge', api);
