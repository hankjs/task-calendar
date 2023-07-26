import { Notification, ipcMain } from "electron";
import { IPCNotification } from "../interface/types";

export function IPCNotificationRegister() {
    ipcMain.handle(
        IPCNotification.Channel.notification,
        (e, options: IPCNotification.Options) => {
            new Notification(options).show();
        }
    );
}
