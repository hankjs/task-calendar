import { it, expect, vi, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { ContextmenuKey, useContextmenuStore } from "../contextmenu.store";
import { commands2Options, useContextmenu } from "../contextmenu";
import { useSetupHooks } from "@/tests/component";

describe("Contextmenu Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe("format options", () => {
        it("converts actions to options correctly", () => {
            const store = useContextmenuStore();

            const command = {
                key: ContextmenuKey.CalendarAddEvent,
                label: "Add Event",
                exec: () => {},
            };
            const command2 = {
                key: ContextmenuKey.CalendarAddProject,
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
                key: ContextmenuKey.CalendarAddEvent,
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

    it("should format options correctly", () => {
        const store = useContextmenuStore();
        const { options } = useSetupHooks(() =>
            useContextmenu(null, { calendar: null })
        );

        const command = {
            key: ContextmenuKey.CalendarAddEvent,
            label: "Add Event",
            exec: () => {},
        };
        const command2 = {
            key: ContextmenuKey.CalendarAddProject,
            label: "Add Project",
            exec: () => {},
        };

        store.a.registerCommand(command);
        store.a.registerCommand(command2);

        expect(options.value).toContainEqual({
            label: command.label,
            value: command.key,
        });
        expect(options.value).toContainEqual({
            label: command2.label,
            value: command2.key,
        });
    });

    describe("dispatch 'contextmenu'", () => {
        it("dispatches command correctly", () => {
            const store = useContextmenuStore();
            const { on } = useSetupHooks(() =>
                useContextmenu(null, { calendar: null })
            );

            const command = {
                key: ContextmenuKey.CalendarAddEvent,
                exec: vi.fn(),
            };
            const command2 = {
                key: ContextmenuKey.CalendarAddProject,
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
