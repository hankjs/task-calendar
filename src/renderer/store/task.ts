import { getBridge } from "@/bridge";
import { Task } from "@task/model";
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { useRequest } from "vue-request";

const db = getBridge("db");

export interface CalendarTask extends Omit<Task, "start" | "end"> {
    start: string;
    end: string;
}

export const useTaskStore = defineStore("task", () => {
    const rTasks = useRequest(db.task.list.bind(db.task), {
        manual: true,
    });

    //#region Actions
    async function list() {
        return await rTasks.runAsync();
    }

    async function add(task: Partial<Task>) {
        const newTask = await db.task.add(task);
        return newTask as Required<Task>;
    }

    async function update(id: string, task: Partial<CalendarTask>) {
        const payload: Partial<Task> = {
            ...task,
            start: task.start ? dayjs(task.start).format() : undefined,
            end: task.end ? dayjs(task.end).format() : undefined,
        };
        const updatedTask = await db.task.update(id, payload);
        return updatedTask as Required<Task>;
    }

    async function remove(id: string) {
        await db.task.remove(id);
    }
    //#endregion Actions

    return {
        //#region State
        tasks: rTasks.data,
        //#endregion State

        /** Actions */
        a: {
            list,
            add,
            update,
            remove,
        },
    };
});
