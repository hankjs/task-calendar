import { ipcRenderer } from "electron";
import { IPCNotification } from "interface/types";

export const NotificationBridge = {
    notification(options: IPCNotification.Options) {
        return ipcRenderer.invoke(
            IPCNotification.Channel.notification,
            options
        );
    },
};
