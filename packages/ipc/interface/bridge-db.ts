import { Task } from "@task/model";

export interface BridgeDB {
    list(): Promise<Task[]>;
}
