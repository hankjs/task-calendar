import * as path from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import { defineStringify } from "./plugins/helpers/defines";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const defines = {
        NODE_ENV: env.NODE_ENV,
        __DEV__: env.NODE_ENV === "development",
        VITE_APP_PLATFORM: "Web",
    };

    for (const key in env) {
        if (key.toUpperCase().startsWith("VITE")) {
            defines[key] = env[key];
        }
    }

    const pluginOptions = {
        defines,
    };

    return {
        define: defineStringify(defines),
        test: {
            environment: "jsdom",
            deps: {
                inline: ["jsdom-worker"],
            },
            setupFiles: ["./vitest.setup.ts"],
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src/renderer"),
            },
        },
    };
});
