<script lang="ts" setup>
import { getBridge } from "@/bridge";
import { Accelerator } from "@task/share";
import { ref } from "vue";

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
    const callback = async (event: any, accelerator: string) => {
        logger.info(event, accelerator);
        logger.info("CurrentProcessId", id);
    };
    const registered = await globalShortcut.register(
        accelerator,
        callback
    );
    logger.info("registered", registered);
}
</script>

<template>
    {{ id }}
    <button @click="onClick">getCurrentProcessId</button>
</template>
