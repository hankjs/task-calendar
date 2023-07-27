import { IPCLogger } from "./types";

export interface BridgeLogger {
    alert: (...args: IPCLogger.Args) => void;
    error: (...args: IPCLogger.Args) => void;
    warning: (...args: IPCLogger.Args) => void;
    info: (...args: IPCLogger.Args) => void;
    debug: (...args: IPCLogger.Args) => void;
}
