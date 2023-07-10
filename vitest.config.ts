import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        deps: {
            inline: ["jsdom-worker"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/renderer"),
        },
    },
});
