import { HeaderAction } from "@/composables/action";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

export enum HeaderActionType {
    Button = "button",
    Icon = "icon",
    Text = "text",
}

export enum HeaderPosition {
    Left = "left",
    Right = "right",
    RightFixed = "rightFixed",
}

export const useHeaderStore = defineStore("header", () => {
    const left = shallowRef<HeaderAction[]>([]);
    const right = shallowRef<HeaderAction[]>([]);
    const rightFixed = shallowRef<HeaderAction[]>([]);
    const positionMap = {
        [HeaderPosition.Left]: left,
        [HeaderPosition.Right]: right,
        [HeaderPosition.RightFixed]: rightFixed,
    };

    function registerAction(position: HeaderPosition, action: HeaderAction) {
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

    function unregisterAction(position: HeaderPosition, action: HeaderAction) {
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
        right,
        rightFixed,

        a: {
            registerAction,
            unregisterAction,
        },
    };
});
