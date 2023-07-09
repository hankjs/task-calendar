import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { devPlugin, getReplacer } from "./plugins/devPlugin";
import optimizer from "vite-plugin-optimizer";
import { buildPlugin } from "./plugins/buildPlugin";
import { defineStringify } from "./plugins/helpers/defines";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const defines = {
        NODE_ENV: env.NODE_ENV,
        __DEV__: env.NODE_ENV === "development",
        VITE_APP_PLATFORM: "Electron",
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
        plugins: [optimizer(getReplacer()), devPlugin(pluginOptions), vue()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src/renderer"),
            },
        },
        build: {
            rollupOptions: {
                plugins: [buildPlugin(pluginOptions)],
            },
        },
    };
});
