import { Action } from "@/composables/action";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum CommandCommandType {
    Button = "button",
    Icon = "icon",
    Text = "text",
}

export const useCommandStore = defineStore("command", () => {
    const commands = shallowRef<Action[]>([]);

    function registerCommand(command: Action) {
        const cmds = Array.from(commands.value);
        const index = cmds.findIndex((item) => item.key === command.key);
        if (index !== -1) {
            cmds.splice(index, 1, command);
        } else {
            cmds.push(command);
        }
        commands.value = cmds;
    }

    function unregisterCommand(command: Action) {
        const cmds = Array.from(commands.value);
        const index = cmds.findIndex((item) => item.key === command.key);
        if (index !== -1) {
            cmds.splice(index, 1);
            commands.value = cmds;
        }
    }

    return {
        commands,

        a: {
            registerCommand,
            unregisterCommand,
        },
    };
});
