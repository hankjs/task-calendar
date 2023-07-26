import { ipcRenderer } from "electron";
import { IPCDB } from "../../../interface/types";

export const DBBridge = {
    async list() {
        const res = await ipcRenderer.invoke(IPCDB.Channel.list);
        return res;
    },
};
