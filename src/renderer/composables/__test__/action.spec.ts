import { it, expect, vi, describe, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useSetupHooks } from "@/tests/component";
import {
    useHeaderStore,
    HeaderActionType,
    HeaderPosition,
} from "@/components/header/store";
import { useCommandStore } from "@/store/command";
import {
    onRegisterAll,
    onRegisterCommand,
    onRegisterHeader,
    onRegisterHeaderAndCommand,
} from "../action";
import { useContextmenuStore } from "@/components/calendar/contextmenu.store";

describe("Action Redister helper", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe("Header action", () => {
        it("registers and unregisters header actions", () => {
            const store = useHeaderStore();
            const action = {
                key: "test-action",
                type: HeaderActionType.Button,
            };

            const { $vm } = useSetupHooks(() => {
                onRegisterHeader(HeaderPosition.Left, action);
            });

            // Register action on the left
            expect(store.left).toContainEqual(action);

            $vm.unmount();
            expect(store.left).not.toContainEqual(action);
        });
    });

    describe("Command action", () => {
        it("registers and unregisters command", () => {
            const store = useCommandStore();
            const action = {
                key: "test-action",
                exec() {},
            };

            const { $vm } = useSetupHooks(() => {
                onRegisterCommand(action);
            });

            expect(store.commands).toContainEqual(action);

            $vm.unmount();
            expect(store.commands).not.toContainEqual(action);
        });
    });

    describe("Contextmenu action", () => {
        it("registers and unregisters contextmenu action", () => {
            const store = useCommandStore();
            const action = {
                key: "test-action",
                exec() {},
            };

            const { $vm } = useSetupHooks(() => {
                onRegisterCommand(action);
            });

            expect(store.commands).toContainEqual(action);

            $vm.unmount();
            expect(store.commands).not.toContainEqual(action);
        });
    });

    describe("Multi Register", () => {
        it("registers and unregisters header action and command", () => {
            const headerStore = useCommandStore();
            const commandStore = useCommandStore();
            const action = {
                key: "test-action",
                type: HeaderActionType.Button,
                exec() {},
            };

            const { $vm } = useSetupHooks(() => {
                onRegisterHeaderAndCommand(HeaderPosition.Left, action);
            });

            expect(headerStore.commands).toContainEqual(action);
            expect(commandStore.commands).toContainEqual(action);

            $vm.unmount();
            expect(commandStore.commands).not.toContainEqual(action);
            expect(headerStore.commands).not.toContainEqual(action);
        });

        it("registers and unregisters all: header, command, contextmenu", () => {
            const headerStore = useCommandStore();
            const commandStore = useCommandStore();
            const contextmenuStore = useContextmenuStore();
            const action = {
                key: "test-action",
                label: "TestAction",
                type: HeaderActionType.Button,
                exec() {},
            };

            const { $vm } = useSetupHooks(() => {
                onRegisterAll(HeaderPosition.Left, action);
            });

            expect(headerStore.commands).toContainEqual(action);
            expect(commandStore.commands).toContainEqual(action);
            expect(contextmenuStore.commands).toContainEqual(action);

            $vm.unmount();
            expect(commandStore.commands).not.toContainEqual(action);
            expect(headerStore.commands).not.toContainEqual(action);
            expect(contextmenuStore.commands).not.toContainEqual(action);
        });
    });
});
