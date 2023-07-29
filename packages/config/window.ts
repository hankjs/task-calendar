import path from "path";
import { BrowserWindowConstructorOptions } from "electron";

export const WINDOW_CONFIG: BrowserWindowConstructorOptions = {
    frame: true,
    show: true,
    webPreferences: {
        /** preload.js load on runtime. dist/main.js load dist/preload.js */
        preload: path.join(__dirname, "./preload.js"),
        nodeIntegration: false,
        allowRunningInsecureContent: false,
        sandbox: false,
        webSecurity: false,
        contextIsolation: true,
        webviewTag: true,
        spellcheck: false,
        disableHtmlFullscreenWindowResize: true,
    },
};
