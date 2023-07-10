import { it, expect, vi, describe } from "vitest";
import { VitestWorker } from "./vitest-worker";

describe("vitest web worker", () => {
    it("vitest worker ping pong", async () => {
        const worker = new VitestWorker(
            new URL("./ping.js", import.meta.url)
        );
        const sypPong = vi.fn();
        worker.addEventListener("message", (message) => {
            switch (message.data.event) {
                case "pong":
                    sypPong();
                    break;
                default:
                    break;
            }
        });
        expect(sypPong).not.toBeCalled();

        worker.postMessage({ event: "ping" });
        expect(sypPong).toBeCalled();
    });

});
