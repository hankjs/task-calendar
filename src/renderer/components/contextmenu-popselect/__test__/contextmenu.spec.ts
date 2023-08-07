import { it, expect, vi, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useContextmenuStore } from "@/store/contextmenu";
import { commands2Options, useContextmenu } from "../contextmenu";
import { useSetupHooks } from "@/tests/component";
import { ActionKey } from "@/composables/action";

describe("Contextmenu Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe("format options", () => {
        it("converts actions to options correctly", () => {
            const store = useContextmenuStore();

            const command = {
                key: ActionKey.CalendarAddEvent,
                label: "Add Event",
                exec: () => {},
            };
            const command2 = {
                key: ActionKey.CalendarAddProject,
                label: "Add Project",
                exec: () => {},
            };

            store.a.registerCommand(command);
            store.a.registerCommand(command2);

            const options = commands2Options(store.commands);
            expect(options).toContainEqual({
                label: command.label,
                value: command.key,
            });
            expect(options).toContainEqual({
                label: command2.label,
                value: command2.key,
            });
        });

        it("label fallbacks to key", () => {
            const store = useContextmenuStore();

            const command = {
                key: ActionKey.CalendarAddEvent,
                exec: () => {},
            };

            store.a.registerCommand(command);

            const options = commands2Options(store.commands);
            expect(options).toContainEqual({
                label: command.key,
                value: command.key,
            });
        });
    });

    describe("dispatch 'contextmenu'", () => {
        it("dispatches command correctly", () => {
            const store = useContextmenuStore();
            const { on } = useSetupHooks(() => useContextmenu(null));

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

            on.select(command.key);
            expect(command.exec).toHaveBeenCalled();

            on.select(command2.key);
            expect(command2.exec).toHaveBeenCalled();
            expect(command.exec).toHaveBeenCalledTimes(1);
        });
    });
});
