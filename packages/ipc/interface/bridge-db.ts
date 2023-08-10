import { Task, Project } from "@task/model";

export interface BridgeTaskDB {
    list(): Promise<Task[]>;
    detail(id: string): Promise<Task | null>;
    add(task: Partial<Task>): Promise<Task | void>;
    update(id: string, task: Partial<Task>): Promise<Task | void>;
    remove(id: string): Promise<boolean>;
}

export interface BridgeProjectDB {
    list(): Promise<Project[]>;
    detail(id: string): Promise<Project | null>;
    add(project: Partial<Project>): Promise<Project | void>;
    update(id: string, project: Partial<Project>): Promise<Project | void>;
    remove(id: string): Promise<boolean>;

    getDefaultId(): Promise<string>;
}

export interface BridgeDB {
    task: BridgeTaskDB;
    project: BridgeProjectDB;
}
