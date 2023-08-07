import { findTimeElement } from "@/components/calendar/helper";
import { ActionKey, ContextmenuAction } from "@/composables/action";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum Panel {
    Menu = "menu",
    Calendar = "calendar",
    Header = "header",
    Footer = "footer",
}

export type ContextmenuFilter = {
    panel: Panel | null;
    target: HTMLElement | null;
    payload: any;
};

const defaultFilter = () => true;
export const useContextmenuStore = defineStore("contextmenu", () => {
    const commands = shallowRef<ContextmenuAction[]>([]);

    function registerCommand(contextmenu: ContextmenuAction) {
        const cmds = Array.from(commands.value);
        const index = cmds.findIndex((item) => item.key === contextmenu.key);

        if (!contextmenu.filter) {
            contextmenu.filter = defaultFilter;
        }

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

    function dispatch(key: ActionKey, payload: any) {
        const cmd = commands.value.find((item) => item.key === key);
        if (cmd && cmd.exec) {
            cmd.exec(payload);
        }
    }

    function getPayload(panel: Panel, target: HTMLElement | null) {
        const payload: any = {};

        if (panel === Panel.Calendar) {
            const parent = findTimeElement(target!);

            if (parent) {
                payload.eventId = parent.dataset.eventId as string;
                payload.calendarId = parent.dataset.calendarId as string;
            }
        }

        return payload;
    }

    function filter({
        panel,
        target,
        payload,
    }: {
        panel: Panel | null;
        target: HTMLElement | null;
        payload: any;
    }) {
        const cmds = Array.from(commands.value);

        return cmds.filter((cmd) => cmd.filter!({ panel, target, payload }));
    }

    return {
        commands,

        a: {
            registerCommand,
            unregisterCommand,
            dispatch,
            filter,
            getPayload,
        },
    };
});
