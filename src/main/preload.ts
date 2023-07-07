import { contextBridge } from "electron";
import { Preload } from "@task/ipc/interface/preload";
import { TCBridgeElectron } from "@task/ipc/renderer/platform/electron";

const api: Preload.TCBridge = {
  ...TCBridgeElectron,
};

contextBridge.exposeInMainWorld("TCBridge", api);
