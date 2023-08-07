import { it, expect, vi, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useContextmenuStore } from "../contextmenu";
import { ActionKey } from "@/composables/action";

describe("Contextmenu Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("registers and unregisters command correctly", () => {
        const store = useContextmenuStore();

        const command = {
            key: ActionKey.CalendarAddEvent,
            exec: () => {},
        };

        store.a.registerCommand(command);
        expect(store.commands).toContainEqual(command);

        store.a.unregisterCommand(command);
        expect(store.commands).not.toContainEqual(command);

        const command2 = {
            key: ActionKey.CalendarAddProject,
            exec: () => {},
        };
        store.a.registerCommand(command2);
        expect(store.commands).toContainEqual(command2);

        store.a.unregisterCommand(command2);
        expect(store.commands).not.toContainEqual(command2);
    });

    it("dispatches command correctly", () => {
        const store = useContextmenuStore();

        const command = {
            key: ActionKey.CalendarAddEvent,
            exec: vi.fn(),
        };
        const command2 = {
            key: ActionKey.CalendarAddProject,
            exec: vi.fn(),
        };

        store.a.registerCommand(command);
        store.a.registerCommand(command2);

        store.a.dispatch(command.key, {});
        expect(command.exec).toHaveBeenCalled();
        expect(command2.exec).not.toHaveBeenCalled();

        store.a.dispatch(command2.key, {});
        expect(command2.exec).toHaveBeenCalled();
        expect(command.exec).toHaveBeenCalledTimes(1);
    });
});
