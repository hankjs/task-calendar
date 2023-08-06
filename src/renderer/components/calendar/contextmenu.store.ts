import { ContextmenuAction } from "@/composables/action";
import { SelectOption } from "naive-ui";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum ContextmenuKey {
    CalendarAddEvent = "CalendarAddEvent",
    CalendarAddProject = "CalendarAddProject",
}

export const useContextmenuStore = defineStore("contextmenu", () => {
    const contextmenus = shallowRef<ContextmenuAction[]>([]);

    function registerContextmenu(contextmenu: ContextmenuAction) {
        const cmds = Array.from(contextmenus.value);
        const index = cmds.findIndex((item) => item.key === contextmenu.key);
        if (index !== -1) {
            cmds.splice(index, 1, contextmenu);
        } else {
            cmds.push(contextmenu);
        }
        contextmenus.value = cmds;
    }

    function unregisterContextmenu(contextmenu: ContextmenuAction) {
        const cmds = Array.from(contextmenus.value);
        const index = cmds.findIndex((item) => item.key === contextmenu.key);
        if (index !== -1) {
            cmds.splice(index, 1);
            contextmenus.value = cmds;
        }
    }

    function dispatch(key: ContextmenuKey, payload: any) {
        const cmd = contextmenus.value.find((item) => item.key === key);
        if (cmd && cmd.exec) {
            cmd.exec(payload);
        }
    }

    return {
        contextmenus,

        a: {
            registerContextmenu,
            unregisterContextmenu,
            dispatch,
        },
    };
});

export function actions2Options(actions: ContextmenuAction[]) {
    return actions.map((item) => {
        return {
            label: item.label ?? item.key,
            value: item.key,
        } as SelectOption;
    });
}
