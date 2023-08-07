import { it, expect, vi, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useHeaderStore, HeaderActionType, HeaderPosition } from "../store";

describe("Header Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("registers and unregisters actions correctly", () => {
        const store = useHeaderStore();

        const action = {
            key: "test-action",
            type: HeaderActionType.Button,
        };

        // Register action on the left
        store.a.registerCommand(HeaderPosition.Left, action);
        expect(store.left).toContainEqual(action);

        // Unregister action from the left
        store.a.unregisterCommand(HeaderPosition.Left, action);
        expect(store.left).not.toContainEqual(action);

        // Register action on the right
        store.a.registerCommand(HeaderPosition.Right, action);
        expect(store.right).toContainEqual(action);

        // Unregister action from the right
        store.a.unregisterCommand(HeaderPosition.Right, action);
        expect(store.right).not.toContainEqual(action);
    });
});
