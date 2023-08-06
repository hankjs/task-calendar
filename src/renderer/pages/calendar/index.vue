<script lang="ts" setup>
import Calendar from "@/components/calendar/index.vue";
import { ViewType } from "@task/config/calendar";
import { useCalendarTask } from "./calendar";

const tasksHook = useCalendarTask();
const { tasks, on } = tasksHook;
</script>

<template>
    <section class="calendar">
        <Calendar
            :view="ViewType.Day"
            @select-date-time="on.selectDateTime"
            @before-update-event="on.beforeUpdateEvent"
            @click-event="on.clickEvent"
            @hover-event="on.hoverEvent"
            :events="tasks"
        />
    </section>
</template>

<style scoped>
.calendar {
    height: 100%;
}
</style>
