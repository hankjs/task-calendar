import { Notification, ipcMain } from "electron";
import { IPCNotification, IPCRegister } from "../interface/types";

export const IPCNotificationRegister: IPCRegister = (app) => {
    ipcMain.handle(
        IPCNotification.Channel.notification,
        (e, options: IPCNotification.Options) => {
            new Notification(options).show();
        }
    );
};
