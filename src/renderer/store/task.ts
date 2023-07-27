import { Task } from "@task/model";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export const useTaskStore = defineStore("task", () => {
    const tasks = shallowRef<Task[]>([]);

    return { tasks };
});
