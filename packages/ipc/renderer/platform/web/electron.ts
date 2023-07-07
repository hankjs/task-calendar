import { Bus } from "./event-bus";

export const ElectronBridge = {
  on(channel: string, listener: (event: Event, ...args: any[]) => void): void {
    Bus.on(channel, listener);
  },
};
