<script lang="ts" setup>
import { usePomodoro } from "@/composables/pomodoro";
import { computed } from "vue";

const { start, seconds, minute, round, status, category } = usePomodoro();
const strMinute = computed(() => {
    return minute.value < 10 ? `0${minute.value}` : minute.value;
});

const strSeconds = computed(() => {
    return seconds.value < 10 ? `0${seconds.value}` : seconds.value;
});

function onClickStart() {
    start();
}
</script>

<template>
    <main>
        <section>
            <h2>{{ strMinute }}:{{ strSeconds }}</h2>
            <button @click="onClickStart">Start</button>
            <ul>
                <li>Category: {{ category }}</li>
                <li>Round: {{ round }}</li>
                <li>Status: {{ status }}</li>
            </ul>
        </section>
    </main>
</template>

<style scoped>
main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

section {
    text-align: center;
    width: 300px;
}
</style>
