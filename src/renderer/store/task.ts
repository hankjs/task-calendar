import { getBridge } from "@/bridge";
import { Task } from "@task/model";
import { defineStore } from "pinia";
import { shallowRef } from "vue";
import dayjs from "dayjs";

const db = getBridge("db");

export interface CalendarTask extends Omit<Task, "start" | "end"> {
    start: Date;
    end: Date;
}

export const useTaskStore = defineStore("task", () => {
    const tasks = shallowRef<Task[]>([]);

    async function requestTasks() {
        const list = await db.list();
        tasks.value = list;
    }
    requestTasks();

    async function updateTask(id: string, task: Partial<CalendarTask>) {
        const payload: Partial<Task> = {
            ...task,
            start: task.start
                ? dayjs(task.start.toString()).format()
                : undefined,
            end: task.end ? dayjs(task.end.toString()).format() : undefined,
        };
        await db.updateTask(id, payload);
        await requestTasks();
    }

    return { tasks, updateTask };
});
