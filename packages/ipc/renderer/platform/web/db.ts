import { Task } from "@task/model";
import { BridgeDB } from "../../../interface/bridge-db";

export class DBBridgeWeb implements BridgeDB {
    #tasks: Task[] = [];

    async list() {
        return this.#tasks;
    }
}
