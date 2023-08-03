import { defineStore } from "pinia";
import { onMounted, onUnmounted, shallowRef } from "vue";

export enum HeaderActionType {
    Button = "button",
    Icon = "icon",
    Text = "text",
}
export type HeaderActions = {
    key: string;
    type: HeaderActionType;
    props: any;
};

export enum HaederActionPosition {
    Left = "left",
    Right = "right",
}

export const useHeaderStore = defineStore("header", () => {
    const left = shallowRef<HeaderActions[]>([]);
    const right = shallowRef<HeaderActions[]>([]);
    const rightFixed = shallowRef<HeaderActions[]>([]);

    function registerAction(
        position: HaederActionPosition,
        action: HeaderActions
    ) {
        const list = position === HaederActionPosition.Left ? left : right;
        const actions = Array.from(list.value);
        const index = actions.findIndex((item) => item.key === action.key);
        if (index !== -1) {
            actions.splice(index, 1, action);
        } else {
            actions.push(action);
        }
        list.value = actions;
    }

    function unregisterAction(
        position: HaederActionPosition,
        action: HeaderActions
    ) {
        const list = position === HaederActionPosition.Left ? left : right;
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

export const onRegisterHeaderAction = (
    position: HaederActionPosition,
    action: HeaderActions
) => {
    const store = useHeaderStore();

    onMounted(() => {
        store.a.registerAction(position, action);
    });

    onUnmounted(() => {
        store.a.unregisterAction(position, action);
    });
};
