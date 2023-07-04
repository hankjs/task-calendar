export class Setting {
    #mainWindow = {
        devtool: __DEV__,
        envURL: process.argv[2],
        schemeURL: "app://index.html",
    };

    get mainWindow() {
        return this.#mainWindow;
    }

    constructor() { }

    load() {

    }
}

export const setting = new Setting();
