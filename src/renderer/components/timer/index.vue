<script lang="ts" setup>
import { Status, usePomodoro } from "@/composables/pomodoro";
import { useTaskStore } from "@/store/task";
import { computed } from "vue";

const { seconds, minute, round, status, category, start, pause } =
    usePomodoro();
const strMinute = computed(() => {
    return minute.value < 10 ? `0${minute.value}` : minute.value;
});

const strSeconds = computed(() => {
    return seconds.value < 10 ? `0${seconds.value}` : seconds.value;
});

const taskStore = useTaskStore();
</script>

<template>
    <section class="timer">
        <h2>{{ strMinute }}:{{ strSeconds }}</h2>
        <button v-if="status !== Status.Running" @click="start">Start</button>
        <button v-else @click="pause">Pause</button>
        <ul>
            <li>Category: {{ category }}</li>
            <li>Round: {{ round }}</li>
            <li>Status: {{ status }}</li>
            <li>Task Count: {{ taskStore.tasks.length }}</li>
        </ul>
    </section>
</template>

<style scoped>
.timer {
    text-align: center;
    width: 300px;
}
</style>
