import { it, expect, vi, describe, beforeEach } from "vitest";
import dayjs from "dayjs";
import { useTaskStore } from "../task";
import { setActivePinia, createPinia } from "pinia";
import { useSetupHooks } from "@/tests/component";
import { taskStore } from "@task/ipc/renderer/platform/web/db.data";

describe("useTaskStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        taskStore.clearTasks();
    });

    it("should return tasks", async () => {
        const { store } = useSetupHooks(() => ({
            store: useTaskStore(),
        }));

        await store.a.list();
        expect(store.tasks).toBeDefined();
    });

    describe("add task", () => {
        it("should add task to the first position", async () => {
            const { store } = useSetupHooks(() => ({
                store: useTaskStore(),
            }));

            const task = await store.a.add({
                title: "Task1",
            });
            await store.a.list();
            expect(store.tasks![0]).toEqual(task);
        });
    });

    describe("update task", () => {
        it("should update task", async () => {
            const { store } = useSetupHooks(() => ({
                store: useTaskStore(),
            }));

            const task = await store.a.add({
                title: "Task1",
            });
            await store.a.list();
            expect(store.tasks![0].title).toEqual("Task1");

            await store.a.update(task.id, {
                title: "Task2",
            });
            await store.a.list();
            expect(store.tasks![0].title).toEqual("Task2");
        });

        it("only update not undefined field", async () => {
            const { store } = useSetupHooks(() => ({
                store: useTaskStore(),
            }));

            const start = dayjs().format();
            const end = dayjs().add(1, "day").format();

            const task = await store.a.add({
                title: "Task1",
                start,
            });

            /** only end changed */
            await store.a.update(task.id, {
                end,
            });
            await store.a.list();
            expect(store.tasks![0].start).toEqual(start);
            expect(store.tasks![0].end).toEqual(end);

            const changedTitle = "Task2";
            await store.a.update(task.id, {
                title: changedTitle,
            });
            await store.a.list();
            expect(store.tasks![0].title).toEqual(changedTitle);
            expect(store.tasks![0].start).toEqual(start);
            expect(store.tasks![0].end).toEqual(end);
        });
    });

    describe("delete task", () => {
        it("should delete task", async () => {
            const { store } = useSetupHooks(() => ({
                store: useTaskStore(),
            }));

            const task = await store.a.add({
                title: "Task1",
            });
            await store.a.list();
            expect(store.tasks![0]).toEqual(task);

            await store.a.remove(task.id);
            await store.a.list();
            expect(store.tasks).toHaveLength(0);
        });
    });
});
