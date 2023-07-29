import { getBridge } from "@/bridge";
import { Task } from "@task/model";
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { useRequest } from "vue-request";
import { shallowRef } from "vue";

const db = getBridge("db");

export interface CalendarTask extends Omit<Task, "start" | "end"> {
    start: Date;
    end: Date;
}

export const useTaskStore = defineStore("task", () => {
    const tasks = shallowRef<Task[]>([]);
    const rTasks = useRequest(db.task.list.bind(db.task), {
        manual: true,
    });

    //#region Actions
    async function init() {
        const res = await rTasks.runAsync();
        tasks.value = res;
    }

    async function add(task: Partial<Task>) {
        const newTask = await db.task.add(task);
        tasks.value = [...tasks.value, newTask as Task];
        return newTask;
    }

    async function update(id: string, task: Partial<CalendarTask>) {
        const payload: Partial<Task> = {
            ...task,
            start: task.start
                ? dayjs(task.start.toString()).format()
                : undefined,
            end: task.end ? dayjs(task.end.toString()).format() : undefined,
        };
        await db.task.update(id, payload);
    }
    //#endregion Actions

    return {
        //#region State
        tasks,
        //#endregion State

        /** Actions */
        a: {
            init,
            add,
            update,
        },
    };
});
