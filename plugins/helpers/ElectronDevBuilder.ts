import { ViteDevServer } from "vite";
import { Options } from "./options.type";
import { nativeNodeModulesPlugin } from "./nativeNodeModules";
import { defineStringify } from "./defines";

export class ElectronDevBuilder {
  constructor(private options: Options) {}

  async build() {
    const define = defineStringify(this.options.defines);
    const esbuild = require("esbuild");
    esbuild.buildSync({
      entryPoints: ["./src/main/preload.ts"],
      define,
      bundle: true,
      platform: "node",
      outfile: "./dist/preload.js",
      external: ["electron"],
    });
    await esbuild.build({
      entryPoints: ["./src/main/main.ts"],
      define,
      bundle: true,
      platform: "node",
      outfile: "./dist/main.js",
      plugins: [nativeNodeModulesPlugin],
      external: ["electron"],
    });
  }

  async run(server: ViteDevServer) {
    server.httpServer!.once("listening", () => {
      let { spawn } = require("child_process");
      let addressInfo = server.httpServer!.address();
      if (!addressInfo) {
        return;
      }
      let httpAddress =
        typeof addressInfo === "string"
          ? addressInfo
          : `http://${addressInfo.address}:${addressInfo.port}`;
      let electronProcess = spawn(
        require("electron").toString(),
        ["./dist/main.js", httpAddress],
        {
          cwd: process.cwd(),
          stdio: "inherit",
        }
      );
      electronProcess.on("close", () => {
        server.close();
        process.exit();
      });
    });
  }
}
