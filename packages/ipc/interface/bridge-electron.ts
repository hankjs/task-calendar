export interface BridgeElectron {
    on(
        channel: string,
        // TODO event type platform
        listener: (event: any, ...args: any[]) => void
    ): void;
}
