import { IPCLogger } from "../../../interface/types";

export const LoggerBridge = {
    alert(...args: IPCLogger.Args) {
        // @ts-expect-error typescript foolish
        console.alert(...args);
    },
    error(...args: IPCLogger.Args) {
        console.error(...args);
    },
    warning(...args: IPCLogger.Args) {
        console.warn(...args);
    },
    info(...args: IPCLogger.Args) {
        console.info(...args);
    },
    debug(...args: IPCLogger.Args) {
        console.debug(...args);
    },
};
