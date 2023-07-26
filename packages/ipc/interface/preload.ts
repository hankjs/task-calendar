// import { IpcRendererEvent } from "electron";
import type { Accelerator } from "@task/share";
import { IPCLogger, IPCNotification } from "./types";

export namespace Preload {
    interface BridgeGlobalShortcut {
        register(
            accelerator: Accelerator.Pattern,
            callback: (...args: any[]) => void
        ): Promise<boolean>;
    }

    interface BridgeElectron {
        on(
            channel: string,
            // TODO event type platform
            listener: (event: any, ...args: any[]) => void
        ): void;
    }

    interface BridgeDB {
        list(): Promise<any[]>;
    }

    interface BridgeLogger {
        alert: (...args: IPCLogger.Args) => void;
        error: (...args: IPCLogger.Args) => void;
        warning: (...args: IPCLogger.Args) => void;
        info: (...args: IPCLogger.Args) => void;
        debug: (...args: IPCLogger.Args) => void;
    }

    interface BridgeNotification {
        notification: (options: IPCNotification.Options) => void;
    }

    export interface TCBridge {
        globalShortcut: BridgeGlobalShortcut;
        electron: BridgeElectron;
        db: BridgeDB;
        logger: BridgeLogger;
        notification: BridgeNotification;
    }
}
