import { Task } from "@task/model";

export interface BridgeDB {
    list(): Promise<Task[]>;
    updateTask(id: string, payload: Partial<Task>): Promise<boolean>;
}
