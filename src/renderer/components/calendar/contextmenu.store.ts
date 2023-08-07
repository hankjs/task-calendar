import { ContextmenuAction } from "@/composables/action";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum ContextmenuKey {
    CalendarAddEvent = "CalendarAddEvent",
    CalendarAddProject = "CalendarAddProject",
}

export const useContextmenuStore = defineStore("contextmenu", () => {
    const commands = shallowRef<ContextmenuAction[]>([]);

    function registerCommand(contextmenu: ContextmenuAction) {
        const cmds = Array.from(commands.value);
        const index = cmds.findIndex((item) => item.key === contextmenu.key);
        if (index !== -1) {
            cmds.splice(index, 1, contextmenu);
        } else {
            cmds.push(contextmenu);
        }
        commands.value = cmds;
    }

    function unregisterCommand(contextmenu: ContextmenuAction) {
        const cmds = Array.from(commands.value);
        const index = cmds.findIndex((item) => item.key === contextmenu.key);
        if (index !== -1) {
            cmds.splice(index, 1);
            commands.value = cmds;
        }
    }

    function dispatch(key: ContextmenuKey, payload: any) {
        const cmd = commands.value.find((item) => item.key === key);
        if (cmd && cmd.exec) {
            cmd.exec(payload);
        }
    }

    return {
        commands,

        a: {
            registerCommand,
            unregisterCommand,
            dispatch,
        },
    };
});
