<script lang="ts" setup>
import { Ref, h, ref } from "vue";
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
import { findTimeElement } from "./helper";
import {
    ActionKey,
    HeaderActionType,
    HeaderPosition,
    onRegisterHeaderAndCommand,
} from "@/composables/action";
import { icons, renderIcon } from "../icons/render";
import { NSelect } from "naive-ui";
import { getPanelClass } from "@/components/contextmenu-popselect/contextmenu";
import { Panel } from "@/store/contextmenu";
import { onRegisterContextmenu } from "@/composables/action";
import { useTaskStore } from "@/store/task";
import { t } from "@task/lang";

const props = defineProps<{
    view: ViewType;
    events?: EventObject[];
    calendars?: EventObject[];
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

const taskStore = useTaskStore();
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

onRegisterHeaderAndCommand(HeaderPosition.Left, {
    key: ActionKey.CalendarPrev,
    type: HeaderActionType.Render,
    props: {
        text: true,
        render: () => renderIcon(icons.fluent.ChevronLeft24Filled),
    },
    exec() {
        calendar.value?.prev();
    },
});

onRegisterHeaderAndCommand(HeaderPosition.Left, {
    key: ActionKey.CalendarView,
    type: HeaderActionType.Render,
    props: {
        render: () =>
            h(NSelect, {
                options: [
                    { label: "Day", value: ViewType.Day },
                    { label: "Month", value: ViewType.Month },
                    { label: "Week", value: ViewType.Week },
                ],
                placeholder: "",
                style: {
                    width: "100px",
                },
                defaultValue: props.view,
                "onUpdate:value": (v: ViewType) => {
                    calendar.value?.changeView(v);
                },
            }),
    },
});

onRegisterHeaderAndCommand(HeaderPosition.Left, {
    key: ActionKey.CalendarNext,
    type: HeaderActionType.Render,
    props: {
        text: true,
        render: () => renderIcon(icons.fluent.ChevronRight24Filled),
    },
    exec() {
        calendar.value?.next();
    },
});

onRegisterContextmenu({
    key: ActionKey.CalendarRemoveEvent,
    label: t("Remove"),
    filter: ({ panel, payload }) => panel === Panel.Calendar && payload.eventId,
    exec: async (payload) => {
        if (payload) {
            await taskStore.a.remove(payload.eventId);
            await taskStore.a.list();
        }
    },
});
</script>

<template>
    <div
        class="calendar"
        :class="getPanelClass(Panel.Calendar)"
        ref="refCalendar"
    ></div>
</template>

<style>
.calendar {
    height: 100%;
    overflow-y: auto;
}
</style>
