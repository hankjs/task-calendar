<script lang="ts" setup>
import Calendar from "@/components/calendar/index.vue";
</script>

<template>
    <section class="calendar">
        <Calendar />
    </section>
</template>

<style scoped>
.calendar {
    display: grid;
    grid-template: 1fr / 1fr;
}
</style>
