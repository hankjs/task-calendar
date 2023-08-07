import { useCommandStore } from "@/store/command";
import {
    HeaderActionType,
    HeaderPosition,
    useHeaderStore,
} from "@/components/header/store";
import { onMounted, onUnmounted } from "vue";
import { useContextmenuStore } from "@/components/calendar/contextmenu.store";

export { HeaderActionType, HeaderPosition } from "@/components/header/store";

export type HeaderAction = {
    key: string;
    type: HeaderActionType;
    props?: {
        render?: () => any;
        [k: string]: any;
    };
    exec?: (payload?: any) => void;
};

export type CommandAction = {
    key: string;
    exec: (payload?: any) => void;
};

export type ContextmenuAction = {
    key: string;
    label?: string;
    exec: (payload?: any) => void;
};

export type Action = HeaderAction | CommandAction | ContextmenuAction;

export const onRegisterHeader = (
    position: HeaderPosition,
    action: HeaderAction
) => {
    const store = useHeaderStore();

    onMounted(() => {
        store.a.registerCommand(position, action);
    });

    onUnmounted(() => {
        store.a.unregisterCommand(position, action);
    });
};

export const onRegisterCommand = (command: Action) => {
    const store = useCommandStore();

    onMounted(() => {
        store.a.registerCommand(command);
    });

    onUnmounted(() => {
        store.a.unregisterCommand(command);
    });
};

export const onRegisterContextmenu = (action: Action) => {
    const store = useContextmenuStore();

    onMounted(() => {
        store.a.registerCommand(action as ContextmenuAction);
    });

    onUnmounted(() => {
        store.a.unregisterCommand(action as ContextmenuAction);
    });
};

export const onRegisterHeaderAndCommand = (
    position: HeaderPosition,
    action: HeaderAction
) => {
    onRegisterHeader(position, action);
    onRegisterCommand(action);
};

/**
 * Header, Command, Contextmenu
 * @param position Header position
 * @param action
 */
export const onRegisterAll = (
    position: HeaderPosition,
    action: HeaderAction
) => {
    onRegisterHeader(position, action);
    onRegisterCommand(action);
    onRegisterContextmenu(action);
};
