import { ipcMain } from "electron";
import { IPCDB, IPCRegister } from "../interface/types";

export const IPCDBRegister: IPCRegister = (app) => {
    ipcMain.handle(IPCDB.Channel.list, (e) => {
        return [
            {
                id: 1,
            },
        ];
    });
};
