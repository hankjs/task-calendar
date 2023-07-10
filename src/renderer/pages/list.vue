<script lang="ts" setup>
import { getBridge } from "@/bridge";
import { Accelerator, Bus } from "@task/share";
import { ref } from "vue";

const worker = new Worker(new URL("../../worker/timer.worker.js", import.meta.url));
worker.postMessage({ event: "create", min: 1 });
worker.addEventListener("message", (message) => {
    switch (message.data.event) {
        case "complete":
            Bus.emit("timer-completed");
            logger.info("completed");
            break;
        case "pause":
            Bus.emit("timer-paused");
            break;
        case "reset":
            Bus.emit("timer-reset");
            break;
        case "resume":
            Bus.emit("timer-started");
            break;
        case "start":
            Bus.emit("timer-started");
            logger.info("${this.currentRoundDisplay} round started");
            break;
        case "tick":
            logger.info("tick");
            Bus.emit("timer-tick", {
                elapsed: message.data.elapsed,
                total: message.data.totalSeconds,
            });
            break;
        default:
            break;
    }
});

const id = ref<number | null>(null);
const accelerator: Accelerator.Pattern = `${Accelerator.Modifier.Ctrl}+${Accelerator.Modifier.Shift}+${Accelerator.Key.KeyA}`;

const logger = await getBridge("logger");
const globalShortcut = await getBridge("globalShortcut");

getBridge("electron").then((electron) => {
    electron.on("gs", (...args: any[]) => {
        logger.info("List message", args);
    });
});

async function onClick() {
    worker.postMessage({ event: "start" });
    const callback = async (event: any, accelerator: string) => {
        logger.info("CurrentProcessId", id);
    };
    const registered = await globalShortcut.register(accelerator, callback);
    logger.info("registered", registered);
}
</script>

<template>
    {{ id }}
    <button @click="onClick">getCurrentProcessId</button>
</template>
