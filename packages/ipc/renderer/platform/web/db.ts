import { Project, Task } from "@task/model";
import {
    BridgeDB,
    BridgeProjectDB,
    BridgeTaskDB,
} from "../../../interface/bridge-db";
import dayjs from "dayjs";
import { projectStore, taskStore } from "./db.data";

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

export class DBBridgeWeb implements BridgeDB {
    task: BridgeTaskDB;
    project: BridgeProjectDB;

    constructor() {
        this.project = new BridgeProjectDBWeb(this);
        this.task = new BridgeTaskDBWeb(this);
    }
}

export class BridgeTaskDBWeb implements BridgeTaskDB {
    async list() {
        return taskStore.getTasks();
    }

    async add(task: Partial<Task>) {
        let { calendarId } = task;
        if (!calendarId) {
            calendarId = await this.db.project.getDefaultId();
        }

        const newTask = {
            ...task,
            id: String(Date.now()),
            calendarId,
            createdAt: dayjs().format(),
            updatedAt: null,
        } as Task;

        const store = taskStore.getTasks();
        store.push(newTask);
        taskStore.setTasks(store);

        return newTask;
    }

    async update(id: string, payload: Partial<Task>) {
        const store = taskStore.getTasks();
        const task = store.find((t) => t.id === id);

        if (!task) {
            return;
        }

        const updatedTask = {
            updatedAt: dayjs().format(),
        } as Required<Task>;
        Object.assign(updatedTask, task, removeUndefined(payload));
        const index = store.findIndex((t) => t.id === id);
        store.splice(index, 1, updatedTask);
        taskStore.setTasks(store);

        return updatedTask;
    }

    async remove(id: string) {
        const store = taskStore.getTasks();
        const index = store.findIndex((t) => t.id === id);

        if (index < 0) {
            return false;
        }

        store.splice(index, 1);
        taskStore.setTasks(store);

        return true;
    }
    constructor(db: DBBridgeWeb) {
        this.db = db;
    }

    private db: DBBridgeWeb;
}

export class BridgeProjectDBWeb implements BridgeProjectDB {
    async getDefaultId() {
        return projectStore.getDefaultProjId();
    }

    async list(): Promise<Project[]> {
        return projectStore.getProjects();
    }

    async add(project: Partial<Project>): Promise<void | Project> {
        const store = projectStore.getProjects();
        const newProject = {
            ...project,
            id: String(Date.now()),
            createdAt: dayjs().format(),
            updatedAt: null,
        } as Project;

        store.push(newProject);
        projectStore.setProjects(store);

        return newProject;
    }

    async update(
        id: string,
        payload: Partial<Project>
    ): Promise<void | Project> {
        const store = projectStore.getProjects();
        const project = store.find((t) => t.id === id);

        if (!project) {
            return;
        }

        const updatedProject = {
            updatedAt: dayjs().format(),
        } as Required<Project>;
        Object.assign(updatedProject, project, removeUndefined(payload));
        const index = store.findIndex((t) => t.id === id);
        store.splice(index, 1, updatedProject);
        projectStore.setProjects(store);

        return updatedProject;
    }

    async remove(id: string): Promise<boolean> {
        const store = projectStore.getProjects();
        const index = store.findIndex((t) => t.id === id);

        if (index < 0) {
            return false;
        }

        store.splice(index, 1);
        projectStore.setProjects(store);

        return true;
    }

    constructor(db: DBBridgeWeb) {
        this.db = db;
    }

    private db: DBBridgeWeb;
}
