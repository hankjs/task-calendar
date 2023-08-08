import { useTaskStore } from "@/store/task";
import {
    EventInfo,
    SelectDateTimeInfo,
    UpdatedEventInfo,
} from "@/components/calendar/props";
import { useProjectStore } from "@/store/project";
import { computed, toRef } from "vue";

export function useCalendarTask() {
    const taskStore = useTaskStore();

    taskStore.a.list();
    const tasks = computed(() => {
        if (!taskStore.tasks) {
            return [];
        }

        return taskStore.tasks.map((task) => {
            return {
                ...task,
                raw: task,
            };
        });
    });

    //#region Handlers
    async function selectDateTime(info: SelectDateTimeInfo) {
        await taskStore.a.add(info);
        await taskStore.a.list();
    }

    async function beforeUpdateEvent(info: UpdatedEventInfo) {
        await taskStore.a.update(info.event.id, info.changes);
        await taskStore.a.list();
    }

    async function clickEvent(info: EventInfo) {
        console.log(info);
    }

    async function hoverEvent(info: EventInfo) {
        console.log(info);
    }
    //#endregion Handlers

    return {
        tasks,

        on: {
            selectDateTime,
            beforeUpdateEvent,
            clickEvent,
            hoverEvent,
        },
    };
}

export function useCalendarProject() {
    const projectStore = useProjectStore();
    const projects = toRef(projectStore, "projects");
    projectStore.a.list();

    return {
        projects,
    };
}
