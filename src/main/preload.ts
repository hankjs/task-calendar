import { contextBridge } from "electron";
import { Preload } from "@task/ipc/interface/preload";
import { createBridge } from "@task/ipc/renderer";

const api: Preload.TCBridge = {
  ...createBridge(),
};

contextBridge.exposeInMainWorld("TCBridge", api);
