import { Task } from "@task/model";

export interface BridgeTaskDB {
    list(): Promise<Task[]>;
    add(task: Partial<Task>): Promise<Task | void>;
    update(id: string, task: Partial<Task>): Promise<Task | void>;
}

export interface BridgeProjectDB {}

export interface BridgeDB {
    task: BridgeTaskDB;
    project: BridgeProjectDB;
}
