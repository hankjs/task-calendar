import { IPCNotification } from "interface/types";

export const NotificationBridge = {
    notification(options: IPCNotification.Options) {
        console.log("notification web");
    },
};
