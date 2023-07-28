<script lang="ts" setup>
import { ref, shallowRef, watch } from "vue";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { ViewType } from "./types";

const props = defineProps<{
    view?: ViewType;
}>();
// const emits = defineEmits([]);

const refCalendar = ref<Element | null>(null);
const calendar = shallowRef<Calendar | null>(null);

watch(
    () => props.view,
    (view) => {
        if (!view) {
            return;
        }

        calendar.value?.changeView(view);
    }
);

watch(refCalendar, () => {
    if (!refCalendar.value) {
        return;
    }

    calendar.value = new Calendar(refCalendar.value as Element, {
        defaultView: props.view ?? ViewType.Week,
        template: {
            time(event) {
                const { start, end, title } = event;
                console.log("start", start);
                console.log("end", end);

                return `<span style="color: white;">${11} ${title}</span>`;
            },
            allday(event) {
                return `<span style="color: gray;">${event.title}</span>`;
            },
        },
        calendars: [
            {
                id: "cal1",
                name: "Personal",
                backgroundColor: "#03bd9e",
            },
            {
                id: "cal2",
                name: "Work",
                backgroundColor: "#00a9ff",
            },
        ],
    });
});
</script>

<template>
    <div class="calendar" ref="refCalendar"></div>
</template>

<style scoped>
.calendar {
}
</style>
