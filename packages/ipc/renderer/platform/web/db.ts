import { Project, Task } from "@task/model";
import {
    BridgeDB,
    BridgeProjectDB,
    BridgeTaskDB,
} from "../../../interface/bridge-db";
import dayjs from "dayjs";

function getDate(day: number = 0, h: number = 0, m: number = 0) {
    return dayjs().hour(h).minute(m).add(day, "day").format();
}

function removeUndefined(obj: any) {
    const ret = {
        ...obj,
    };
    Object.keys(ret).forEach((key) => {
        if (ret[key] === undefined) {
            delete ret[key];
        }
    });
    return ret;
}

const MOCK_TASKS: Task[] = [
    {
        id: "1",
        calendarId: "1",
        title: "Event 2",
        start: getDate(0, 10),
        end: getDate(0, 10, 30),
        createdAt: dayjs().format(),
        updatedAt: null,
    },
];

export class DBBridgeWeb implements BridgeDB {
    task: BridgeTaskDB;
    project: BridgeProjectDB;

    constructor() {
        this.task = new BridgeTaskDBWeb();
        this.project = new BridgeProjectDBWeb();
    }
}

let store: Task[] = [];

export function clearTasks() {
    store = [];
}

export class BridgeTaskDBWeb implements BridgeTaskDB {
    async list() {
        return store;
    }

    async add(task: Partial<Task>) {
        const newTask = {
            ...task,
            id: String(Date.now()),
            createdAt: dayjs().format(),
            updatedAt: null,
        } as Task;

        const list = [...store];
        list.push(newTask);
        store = list;

        return newTask;
    }

    async update(id: string, payload: Partial<Task>) {
        const task = store.find((t) => t.id === id);

        if (!task) {
            return;
        }

        const updatedTask = {
            updatedAt: dayjs().format(),
        } as Required<Task>;
        Object.assign(updatedTask, task, removeUndefined(payload));
        const index = store.findIndex((t) => t.id === id);
        const list = [...store];
        list.splice(index, 1, updatedTask);
        store = list;

        return updatedTask;
    }

    async remove(id: string) {
        const index = store.findIndex((t) => t.id === id);

        if (index < 0) {
            return false;
        }

        const list = [...store];
        list.splice(index, 1);
        store = list;

        return true;
    }
}

let projectStore: Project[] = [];

export function clearProjects() {
    projectStore = [];
}

export class BridgeProjectDBWeb implements BridgeProjectDB {
    async list(): Promise<Project[]> {
        return projectStore;
    }
    async add(project: Partial<Project>): Promise<void | Project> {
        const newProject = {
            ...project,
            id: String(Date.now()),
            createdAt: dayjs().format(),
            updatedAt: null,
        } as Project;

        const list = [...projectStore];
        list.push(newProject);
        projectStore = list;

        return newProject;
    }
    async update(
        id: string,
        payload: Partial<Project>
    ): Promise<void | Project> {
        const project = projectStore.find((t) => t.id === id);

        if (!project) {
            return;
        }

        const updatedProject = {
            updatedAt: dayjs().format(),
        } as Required<Project>;
        Object.assign(updatedProject, project, removeUndefined(payload));
        const index = projectStore.findIndex((t) => t.id === id);
        const list = [...projectStore];
        list.splice(index, 1, updatedProject);
        projectStore = list;

        return updatedProject;
    }

    async remove(id: string): Promise<boolean> {
        const index = projectStore.findIndex((t) => t.id === id);

        if (index < 0) {
            return false;
        }

        const list = [...projectStore];
        list.splice(index, 1);
        projectStore = list;

        return true;
    }
}
