import { ipcRenderer } from "electron";
import { IPCLogger } from "../../../interface/types";

export const LoggerBridge = {
  alert(...args: IPCLogger.Args) {
    ipcRenderer.invoke(IPCLogger.Channel.alert, ...args);
  },
  error(...args: IPCLogger.Args) {
    ipcRenderer.invoke(IPCLogger.Channel.error, ...args);
  },
  warning(...args: IPCLogger.Args) {
    ipcRenderer.invoke(IPCLogger.Channel.warning, ...args);
  },
  info(...args: IPCLogger.Args) {
    ipcRenderer.invoke(IPCLogger.Channel.info, ...args);
  },
  debug(...args: IPCLogger.Args) {
    ipcRenderer.invoke(IPCLogger.Channel.debug, ...args);
  },
};
