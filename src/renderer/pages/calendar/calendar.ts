import { useTaskStore } from "@/store/task";
import {
    SelectDateTimeInfo,
    UpdatedEventInfo,
} from "@/components/calendar/props";
import { useProjectStore } from "@/store/project";
import { toRef } from "vue";

export function useCalendarTask() {
    const taskStore = useTaskStore();
    taskStore.a.list();
    const tasks = toRef(taskStore, "tasks");

    //#region Handlers
    async function selectDateTime(info: SelectDateTimeInfo) {
        await taskStore.a.add(info);
        await taskStore.a.list();
    }

    async function beforeUpdateEvent(info: UpdatedEventInfo) {
        await taskStore.a.update(info.event.id, info.changes);
        await taskStore.a.list();
    }
    //#endregion Handlers

    return {
        tasks,

        on: {
            selectDateTime,
            beforeUpdateEvent,
        },
    };
}

export function useCalendarProject() {
    const projectStore = useProjectStore();

    return {
        projects: projectStore.projects,
    };
}
