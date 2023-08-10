<script lang="ts" setup>
import { h, ref } from "vue";
import { NSelect } from "naive-ui";
import Calendar from "@/components/calendar/index.vue";
import { ViewType } from "@task/config/calendar";
import { useCalendarProject, useCalendarTask } from "./calendar";
import {
    ActionKey,
    HeaderActionType,
    HeaderPosition,
    onRegisterHeaderAndCommand,
} from "@/composables/action";
import { onRegisterContextmenu } from "@/composables/action";
import { t } from "@task/lang";
import { Panel } from "@/store/contextmenu";
import { useTaskStore } from "@/store/task";
import { useCommandStore } from "@/store/command";
import { icons, renderIcon } from "@/components/icons/render";

const refCalendar = ref<typeof Calendar | null>(null);

const taskStore = useTaskStore();
const commandStore = useCommandStore();
const tasksHook = useCalendarTask();
const { tasks, on } = tasksHook;
const projectsHook = useCalendarProject();
const { projects } = projectsHook;
const view = ref(ViewType.Day);

onRegisterHeaderAndCommand(HeaderPosition.Left, {
    key: ActionKey.CalendarPrev,
    type: HeaderActionType.Render,
    props: {
        text: true,
        render: () => renderIcon(icons.fluent.ChevronLeft24Filled),
    },
    exec() {
        refCalendar.value?.prev();
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
                defaultValue: view.value,
                "onUpdate:value": (v: ViewType) => {},
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
        refCalendar.value?.next();
    },
});

onRegisterContextmenu({
    key: ActionKey.ContextmenuEditEvent,
    label: t("Edit"),
    filter: ({ panel, payload }) => panel === Panel.Calendar && payload.eventId,
    exec: async (payload) => {
        const task = await taskStore.a.detail(payload.eventId);
        if (!task) {
            return;
        }
        commandStore.a.dispatch(ActionKey.CalendarAddEvent, task);
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
    <section class="calendar">
        <Calendar
            ref="refCalendar"
            :view="view"
            @select-date-time="on.selectDateTime"
            @before-update-event="on.beforeUpdateEvent"
            @click-event="on.clickEvent"
            @hover-event="on.hoverEvent"
            :events="tasks"
            :calendars="projects"
        />
    </section>
</template>

<style scoped>
.calendar {
    height: 100%;
}
</style>
