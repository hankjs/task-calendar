import { it, expect, vi, describe, beforeEach } from "vitest";
import { useTaskStore } from "../task";
import { setActivePinia, createPinia } from "pinia";

describe("useTaskStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("list", () => {
        const store = useTaskStore();
        expect(store.tasks).toBeDefined();
    });
});
