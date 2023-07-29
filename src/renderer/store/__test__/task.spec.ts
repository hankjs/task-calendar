import { it, expect, vi, describe, beforeEach } from "vitest";
import { useTaskStore } from "../task";
import { setActivePinia, createPinia } from "pinia";
import { BRIDGE_KEY } from "@task/config/constant";
import { useSetupHooks } from "@/tests/component";

const mockBridge = globalThis[BRIDGE_KEY];

describe("useTaskStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("should return tasks", async () => {
        const { store } = useSetupHooks(() => ({
            store: useTaskStore(),
        }));

        await store.a.init();
        expect(store.tasks).toBeDefined();
    });
    // Task 增删改查

    describe("add task", () => {
        it("should add task to the first position", async () => {
            const { store } = useSetupHooks(() => ({
                store: useTaskStore(),
            }));

            const task = await store.a.add({
                title: "Task1",
            });
            expect(store.tasks[0]).toEqual(task);
        });
    });
});
