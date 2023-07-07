import { ENV } from "@task/env";
import { Preload } from "../interface/preload";

type TCBridge = Preload.TCBridge;

export function createBridge(): TCBridge {
  if (ENV.VITE_APP_PLATFORM === "Electron") {
    return require("./platform/electron").default;
  }
  // TODO Web
  return require("./platform/electron").default;
}
