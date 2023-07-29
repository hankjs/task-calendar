import { Task } from "@task/model";
import { BridgeDB } from "../../../interface/bridge-db";
import dayjs from "dayjs";

function getDate(day: number = 0, h: number = 0, m: number = 0) {
    return dayjs().hour(h).minute(m).add(day, "day").format();
}

function assign(target: any, ...sources: any[]) {
    sources.forEach((source) => {
        const descriptors = Object.keys(source).reduce(
            (descriptors: any, key) => {
                if (source[key] === undefined) {
                    return descriptors;
                }
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            },
            {}
        );

        // 默认情况下，Object.assign 也会复制可枚举的 Symbol 属性
        Object.getOwnPropertySymbols(source).forEach((sym) => {
            const descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor?.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
}

export class DBBridgeWeb implements BridgeDB {
    #tasks: Task[] = [
        {
            id: "1",
            calendarId: "1",
            title: "Event 2",
            start: getDate(0, 10),
            end: getDate(0, 10, 30),
        },
    ];

    async list() {
        return [...this.#tasks];
    }

    async updateTask(id: string, payload: Partial<Task>) {
        const task = this.#tasks.find((t) => t.id === id);
        if (task) {
            assign(task, payload);
        }

        return true;
    }
}
