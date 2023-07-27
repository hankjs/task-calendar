import { getBridge } from "@/bridge";
import { Task } from "@task/model";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

const db = getBridge("db");

export const useTaskStore = defineStore("task", () => {
    const tasks = shallowRef<Task[]>([]);

    db.list().then((list) => {
        tasks.value = list;
    });

    return { tasks };
});
