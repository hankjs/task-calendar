<script lang="ts" setup>
import Calendar from "@/components/calendar/index.vue";
import { ViewType } from "@task/config/calendar";
import { useCalendarTask } from "./calendar";
import { NButton } from "naive-ui";

const tasksHook = useCalendarTask();
const { tasks } = tasksHook;
</script>

<template>
    <section class="calendar">
        <Calendar
            :view="ViewType.Day"
            @select-date-time="tasksHook.on.selectDateTime"
            @before-update-event="tasksHook.on.beforeUpdateEvent"
            :events="tasks"
        />
    </section>
</template>

<style scoped>
.calendar {
    height: 100%;
}
</style>
