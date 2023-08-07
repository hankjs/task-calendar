import { useCommandStore } from "@/store/command";
import {
    HeaderActionType,
    HeaderPosition,
    useHeaderStore,
} from "@/components/header/store";
import { onMounted, onUnmounted } from "vue";
import {
    ContextmenuFilter,
    ContextmenuType,
    useContextmenuStore,
} from "@/store/contextmenu";

export { HeaderActionType, HeaderPosition } from "@/components/header/store";

export enum ActionKey {
    CalendarAddEvent = "CalendarAddEvent",
    CalendarRemoveEvent = "CalendarRemoveEvent",
    CalendarAddProject = "CalendarAddProject",
    CalendarView = "CalendarView",
    CalendarPrev = "CalendarPrev",
    CalendarNext = "CalendarNext",
}

export type HeaderAction = {
    key: ActionKey;
    type: HeaderActionType;
    props?: {
        render?: () => any;
        [k: string]: any;
    };
    exec?: (payload?: any) => void;
};

export type CommandAction = {
    key: ActionKey;
    exec: (payload?: any) => void;
};

export type ContextmenuAction = {
    key: ActionKey;
    label?: string;
    filter?: (exp: ContextmenuFilter) => boolean;
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
