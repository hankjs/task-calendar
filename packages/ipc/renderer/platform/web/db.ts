import { Task } from "@task/model";
import {
    BridgeDB,
    BridgeProjectDB,
    BridgeTaskDB,
} from "../../../interface/bridge-db";
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

const mockTasks: Task[] = [...MOCK_TASKS];

export class BridgeTaskDBWeb implements BridgeTaskDB {
    async list() {
        return mockTasks;
    }

    async add(task: Partial<Task>) {
        const params = {
            ...task,
            id: Math.random().toString(),
            createdAt: dayjs().format(),
            updatedAt: null,
        } as Task;

        mockTasks.push(params);

        return params;
    }

    async update(id: string, payload: Partial<Task>) {
        const task = mockTasks.find((t) => t.id === id);
        if (task) {
            assign(task, payload);
        }

        return task;
    }
}

export class BridgeProjectDBWeb implements BridgeProjectDB {}
