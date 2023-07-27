<script lang="ts" setup>
import Timer from "@/components/timer/index.vue";
import { useTaskStore } from "@/store/task";

const taskStore = useTaskStore();
</script>

<template>
    <section>
        <Timer />
        {{ taskStore.tasks.length }}
    </section>
</template>

<style scoped>
section {
    text-align: center;
    width: 300px;
}
</style>
