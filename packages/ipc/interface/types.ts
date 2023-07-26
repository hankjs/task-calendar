export namespace IPCGlobalShortcut {
    const NS = "GlobalShortcut";

    export namespace Channel {
        /** 事件注册 */
        export const register = `${NS}:register`;
    }
}

export namespace IPCElectron {
    const NS = "Electron";

    export namespace Channel {
        /** 事件注册 */
        export const on = `${NS}:on`;
    }
}

export namespace IPCLogger {
    const NS = "Logger";

    export type LogCallback = (
        error?: any,
        level?: string,
        message?: string,
        meta?: any
    ) => void;
    export type Args =
        | [message: string, callback: LogCallback]
        | [message: string, meta: any, callback: LogCallback]
        | [message: string, ...meta: any[]]
        | [message: any]
        | [infoObject: object];

    export namespace Channel {
        export const alert = `${NS}:alert`;
        export const crit = `${NS}:crit`;
        export const error = `${NS}:error`;
        export const warning = `${NS}:warning`;
        export const notice = `${NS}:notice`;
        export const info = `${NS}:info`;
        export const debug = `${NS}:debug`;
    }
}

export namespace IPCNotification {
    const NS = "Notification";

    export type Options = {
        title: string;
        body: string;
    };

    export namespace Channel {
        export const notification = `${NS}:notification`;
    }
}
