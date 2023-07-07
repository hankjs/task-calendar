import { ipcRenderer, type IpcRendererEvent } from "electron"

export const ElectronBridge = {
    on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void {
        ipcRenderer.on(channel, listener);
    }
}
