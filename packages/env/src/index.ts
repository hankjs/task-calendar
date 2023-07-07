declare const __DEV__: boolean;

declare const VITE_APP_PLATFORM: "Web" | "Electron";

export const ENV = {
  __DEV__: __DEV__,
  VITE_APP_PLATFORM: VITE_APP_PLATFORM,
};

export enum Platform {
  Web = "Web",
  Electron = "Electron",
}
