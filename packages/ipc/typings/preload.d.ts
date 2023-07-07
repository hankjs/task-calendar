import { Preload } from "../interface/preload";

declare global {
  interface Window {
    TCBridge: Preload.TCBridge;
  }
}
