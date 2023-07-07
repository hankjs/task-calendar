// import { IpcRendererEvent } from "electron";
import type { Accelerator } from "@task/share";

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

  export interface TCBridge {
    globalShortcut: BridgeGlobalShortcut;
    electron: BridgeElectron;
  }
}
