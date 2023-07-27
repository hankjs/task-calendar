import { BridgeDB } from "./bridge-db";
import { BridgeGlobalShortcut } from "./bridge-global-shortcut";
import { BridgeElectron } from "./bridge-electron";
import { BridgeLogger } from "./bridge-logger";
import { BridgeNotification } from "./bridge-notification";

export namespace Preload {
    export interface TCBridge {
        globalShortcut: BridgeGlobalShortcut;
        electron: BridgeElectron;
        db: BridgeDB;
        logger: BridgeLogger;
        notification: BridgeNotification;
    }
}
