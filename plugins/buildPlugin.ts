import { ElectronBuilder } from "./helpers/ElectronBuilder";
import { Options } from "./helpers/options.type";

export let buildPlugin = (options: Options) => {
  return {
    name: "build-plugin",
    closeBundle: async () => {
      if (options.defines?.VITE_APP_PLATFORM === "Web") {
        return;
      }
      let buildObj = new ElectronBuilder(options);
      await buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    },
  };
};
