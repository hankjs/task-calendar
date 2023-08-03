<script lang="ts" setup>
import { Ref, ref } from "vue";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { ViewType } from "@task/config/calendar";
import { useCalendar } from "./calendar";
import { EventObject } from "@toast-ui/calendar";
import {
    DayNameInfo,
    EventInfo,
    MoreEventsButton,
    SelectDateTimeInfo,
    UpdatedEventInfo,
} from "./props";

const props = defineProps<{
    view?: ViewType;
    events?: EventObject[];
}>();
const emits = defineEmits<{
    (e: "selectDateTime", info: SelectDateTimeInfo): void;
    (e: "beforeCreateEvent", event: EventObject): void;
    (e: "beforeUpdateEvent", updatedEventInfo: UpdatedEventInfo): void;
    (e: "beforeDeleteEvent", event: EventObject): void;
    (e: "afterRenderEvent", event: EventObject): void;
    (e: "clickDayName", dayNameInfo: DayNameInfo): void;
    (e: "clickEvent", eventInfo: EventInfo): void;
    (e: "clickMoreEventsBtn", moreEventsBtnInfo: MoreEventsButton): void;
    (e: "clickTimezonesCollapseBtn", prevCollapsedState: boolean): void;
}>();

const refCalendar = ref<Element | null>(null);
useCalendar(refCalendar as Ref<Element | null>, props, emits);
</script>

<template>
    <div class="calendar" ref="refCalendar"></div>
</template>

<style>
.calendar {
    overflow-y: auto;
}
</style>
