import { getBridge } from "@/bridge";
import { Project } from "@task/model";
import { defineStore } from "pinia";
import { useRequest } from "vue-request";

const db = getBridge("db");

export interface CalendarProject extends Omit<Project, ""> {}

export const useProjectStore = defineStore("project", () => {
    const rProjects = useRequest(db.project.list.bind(db.project), {
        manual: true,
    });

    //#region Actions
    async function list() {
        return await rProjects.runAsync();
    }

    async function add(project: Partial<Project>) {
        const newProject = await db.project.add(project);
        return newProject as Required<Project>;
    }

    async function update(id: string, project: Partial<CalendarProject>) {
        const payload: Partial<Project> = {
            ...project,
        };
        const updatedProject = await db.project.update(id, payload);
        return updatedProject as Required<Project>;
    }

    async function remove(id: string) {
        await db.project.remove(id);
    }
    //#endregion Actions

    return {
        //#region State
        projects: rProjects.data,
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
