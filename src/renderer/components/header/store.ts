import { HeaderAction } from "@/composables/action";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum HeaderActionType {
    Button = "button",
    Text = "text",
    Render = "render",
}

export enum HeaderPosition {
    Left = "left",
    LeftFixed = "leftFixed",
    Right = "right",
    RightFixed = "rightFixed",
}

export const useHeaderStore = defineStore("header", () => {
    const left = shallowRef<HeaderAction[]>([]);
    const leftFixed = shallowRef<HeaderAction[]>([]);
    const right = shallowRef<HeaderAction[]>([]);
    const rightFixed = shallowRef<HeaderAction[]>([]);
    const positionMap = {
        [HeaderPosition.Left]: left,
        [HeaderPosition.LeftFixed]: leftFixed,
        [HeaderPosition.Right]: right,
        [HeaderPosition.RightFixed]: rightFixed,
    };

    function registerCommand(position: HeaderPosition, action: HeaderAction) {
        const list = positionMap[position];
        const actions = Array.from(list.value);
        const index = actions.findIndex((item) => item.key === action.key);
        if (index !== -1) {
            actions.splice(index, 1, action);
        } else {
            actions.push(action);
        }
        list.value = actions;
    }

    function unregisterCommand(position: HeaderPosition, action: HeaderAction) {
        const list = position === HeaderPosition.Left ? left : right;
        const actions = Array.from(list.value);
        const index = actions.findIndex((item) => item.key === action.key);
        if (index !== -1) {
            actions.splice(index, 1);
            list.value = actions;
        }
    }

    return {
        left,
        leftFixed,
        right,
        rightFixed,

        a: {
            registerCommand,
            unregisterCommand,
        },
    };
});
