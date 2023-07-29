<script lang="ts" setup>
import Calendar from "@/components/calendar/index.vue";
import { ViewType } from "@task/config/calendar";
import { useTaskStore } from "@/store/task";
import {
    SelectDateTimeInfo,
    UpdatedEventInfo,
} from "@/components/calendar/props";

const taskStore = useTaskStore();
function onSelectDateTime(info: SelectDateTimeInfo) {
    console.log(info);
}

function onBeforeUpdateEvent(info: UpdatedEventInfo) {
    taskStore.updateTask(info.event.id, info.changes);
}
</script>

<template>
    <section class="calendar">
        <Calendar
            :view="ViewType.Day"
            @select-date-time="onSelectDateTime"
            @before-update-event="onBeforeUpdateEvent"
            :events="taskStore.tasks"
        />
    </section>
</template>

<style scoped>
.calendar {
    display: grid;
    grid-template: 1fr / 1fr;
}
</style>
