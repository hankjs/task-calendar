import { useCommandStore } from "@/store/command";
import {
    HeaderActionType,
    HeaderPosition,
    useHeaderStore,
} from "@/components/header/store";
import { onMounted, onUnmounted } from "vue";

export { HeaderActionType, HeaderPosition } from "@/components/header/store";

export type HeaderAction = {
    key: string;
    type: HeaderActionType;
    props?: {
        render?: () => any;
        [k: string]: any;
    };
    exec?: () => void;
};

export type CommandAction = {
    key: string;
    exec: () => void;
};

export type Action = HeaderAction | CommandAction;

export const onRegisterHeaderAction = (
    position: HeaderPosition,
    action: HeaderAction
) => {
    const store = useHeaderStore();

    onMounted(() => {
        store.a.registerAction(position, action);
    });

    onUnmounted(() => {
        store.a.unregisterAction(position, action);
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

export const onRegisterHeaderAndCommand = (
    position: HeaderPosition,
    action: HeaderAction
) => {
    onRegisterHeaderAction(position, action);
    onRegisterCommand(action);
};
