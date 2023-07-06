import { ViteDevServer } from "vite";
import { Options } from "./helpers/options.type";
import { ElectronDevBuilder } from "./helpers/ElectronDevBuilder";

export let devPlugin = (options: Options) => {
  return {
    name: "dev-plugin",
    async configureServer(server: ViteDevServer) {
      if (options.defines?.VITE_APP_PLATFORM === "Web") {
        return;
      }
      const builder = new ElectronDevBuilder(options);
      await builder.build()
      await builder.run(server);
    },
  };
};

export let getReplacer = () => {
  let externalModels = [
    "os",
    "fs",
    "path",
    "events",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "robotjs",
  ];
  let result = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = [
      "clipboard",
      "ipcRenderer",
      "nativeImage",
      "shell",
      "webFrame",
      "globalShortcut",
    ].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
