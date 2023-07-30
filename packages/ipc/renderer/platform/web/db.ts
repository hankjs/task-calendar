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

function removeUndefined(obj: any) {
    const ret = {
        ...obj,
    };
    Object.keys(ret).forEach((key) => {
        if (ret[key] === undefined) {
            delete ret[key];
        }
    });
    console.log("ret", ret);
    return ret;
}

function assign(target: any, ...sources: any[]) {
    sources.forEach((source) => {
        const descriptors = Object.keys(source).reduce(
            (descriptors: any, key) => {
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

        const updatedTask = {} as Required<Task>;
        Object.assign(updatedTask, task, removeUndefined(payload));
        const index = store.findIndex((t) => t.id === id);
        const list = [...store];
        list.splice(index, 1, updatedTask as Task);
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

export class BridgeProjectDBWeb implements BridgeProjectDB {}
