<script lang="ts" setup>
import { getBridge } from "@/bridge";
import { Status, usePomodoro } from "@/composables/pomodoro";
import { Preload } from "@task/ipc/interface/preload";
import { computed, shallowRef } from "vue";

const { seconds, minute, round, status, category, start, pause } =
    usePomodoro();
const strMinute = computed(() => {
    return minute.value < 10 ? `0${minute.value}` : minute.value;
});

const strSeconds = computed(() => {
    return seconds.value < 10 ? `0${seconds.value}` : seconds.value;
});

const list = shallowRef<any[]>([]);

async function requestList() {
    const db = (await getBridge("db")) as Preload.TCBridge["db"];
    list.value = await db.list();
    console.log("list.value", list.value);
}
requestList();
</script>

<template>
    <section>
        <h2>{{ strMinute }}:{{ strSeconds }}</h2>
        <button v-if="status !== Status.Running" @click="start">Start</button>
        <button v-else @click="pause">Pause</button>
        <ul>
            <li>Category: {{ category }}</li>
            <li>Round: {{ round }}</li>
            <li>Status: {{ status }}</li>
        </ul>
    </section>
</template>

<style scoped>
section {
    text-align: center;
    width: 300px;
}
</style>
