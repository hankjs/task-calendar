import { IPCNotification } from "./types";

export interface BridgeNotification {
    notification: (options: IPCNotification.Options) => void;
}
