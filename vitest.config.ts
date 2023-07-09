import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "happy-dom",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/renderer"),
        },
    },
});
