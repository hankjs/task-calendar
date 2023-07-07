import { app, Event, BrowserWindow } from "electron";

import { IPCRegister, CommonWindowEvent } from "@task/ipc/main";
import { PluginManager } from "./plugins/PluginManager";
import { MainWindow } from "./windows/MainWindow";
import { WindowManager } from "./windows/WindowManager";
import { setting } from "./setting/Setting";

export class App {
    #windowManager = new WindowManager();
    #pluginManager = new PluginManager();

    constructor() {
        app.on("browser-window-created", (e, win) =>
            this.onBrowserWindowCreated(e, win)
        );

        app.whenReady().then(() => this.onReady());
        app.on("will-quit", () => this.onWillQuit());
    }

    onReady() {
        setting.load();
        IPCRegister();

        this.#windowManager.push(new MainWindow());

        CommonWindowEvent.listen();
    }

    onWillQuit() {
        this.#pluginManager.clear();
    }

    onBrowserWindowCreated(e: Event, win: BrowserWindow) {}
}