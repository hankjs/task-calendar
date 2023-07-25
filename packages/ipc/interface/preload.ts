// import { IpcRendererEvent } from "electron";
import type { Accelerator } from "@task/share";
import { IPCLogger } from "./types";

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
        get(key: string): Promise<any>;
        set(key: string, val: any): Promise<void>;
    }

    interface BridgeLogger {
        alert: (...args: IPCLogger.Args) => void;
        error: (...args: IPCLogger.Args) => void;
        warning: (...args: IPCLogger.Args) => void;
        info: (...args: IPCLogger.Args) => void;
        debug: (...args: IPCLogger.Args) => void;
    }

    interface BridgeLogger {
        alert: (...args: IPCLogger.Args) => void;
        error: (...args: IPCLogger.Args) => void;
        warning: (...args: IPCLogger.Args) => void;
        info: (...args: IPCLogger.Args) => void;
        debug: (...args: IPCLogger.Args) => void;
    }

    export interface TCBridge {
        globalShortcut: BridgeGlobalShortcut;
        electron: BridgeElectron;
        db: BridgeDB;
        logger: BridgeLogger;
    }
}
