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
import { useEventListener } from "@vueuse/core";
import { throttle } from "lodash-es";
import ContextmenuPopselect from "./contextmenu-popselect.vue";
import { findTimeElement } from "./helper";

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
    (e: "clickEvent", eventInfo: EventInfo): void;
    (e: "hoverEvent", eventInfo: EventInfo): void;
}>();

const refCalendar = ref<Element | null>(null);
const { calendar } = useCalendar(
    refCalendar as Ref<Element | null>,
    props,
    emits
);

useEventListener(
    refCalendar,
    "mousemove",
    throttle((e: MouseEvent) => {
        if (!e.target || !e.ctrlKey) return;
        const target = e.target as HTMLElement;
        let parent = findTimeElement(target);
        if (!parent) {
            return;
        }

        const event = calendar.value?.getEvent(
            parent.dataset.eventId as string,
            parent.dataset.calendarId as string
        );
        if (!event) {
            return;
        }

        emits("hoverEvent", {
            event,
            nativeEvent: e,
        });
    }, 500)
);
</script>

<template>
    <ContextmenuPopselect :calendar="calendar">
        <div class="calendar" ref="refCalendar"></div>
    </ContextmenuPopselect>
</template>

<style>
.calendar {
    height: 100%;
    overflow-y: auto;
}
</style>
