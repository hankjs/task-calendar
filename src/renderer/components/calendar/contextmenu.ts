import { MaybeRefOrGetter, computed, shallowRef } from "vue";
import { EventInfo } from "./props";
import { useEventListener } from "@vueuse/core";
import { SelectOption } from "naive-ui/es/select";
import Calendar from "@toast-ui/calendar";
import { findTimeElement } from "./helper";
import { t } from "@task/lang";
import { ContextmenuType, useContextmenuStore } from "@/store/contextmenu";
import {
    ActionKey,
    ContextmenuAction,
    onRegisterContextmenu,
} from "@/composables/action";
import { useTaskStore } from "@/store/task";
import { nextTick } from "vue";

type Props = {
    calendar: Calendar | null;
};

export function useContextmenu(
    container: MaybeRefOrGetter<Element | null>,
    props: Props
) {
    const taskStore = useTaskStore();
    const show = shallowRef(false);
    const data = shallowRef<{
        x: number;
        y: number;
        event: EventInfo | null;
    }>({
        x: 0,
        y: 0,
        event: null,
    });
    const cmStore = useContextmenuStore();
    const commands = computed(() =>
        cmStore.commands.filter((cmd) =>
            cmd.filter!({ type: ContextmenuType.Calendar })
        )
    );

    useEventListener(container, "contextmenu", (e: PointerEvent) => {
        e.preventDefault();
        if (!e.target || commands.value.length === 0) return;
        const target = e.target as HTMLElement;
        let parent = findTimeElement(target);
        let event = null;

        if (parent && props.calendar) {
            event = props.calendar.getEvent(
                parent.dataset.eventId as string,
                parent.dataset.calendarId as string
            );
        }

        data.value = {
            x: e.clientX,
            y: e.clientY,
            event,
        };
        show.value = true;
    });

    //#region Methods
    function close() {
        show.value = false;
        const { x, y } = data.value;
        data.value = {
            x,
            y,
            event: null,
        };
    }

    function select(value: ActionKey) {
        cmStore.a.dispatch(value, data.value.event);
        close();
    }
    //#endregion
    const options = computed(() => {
        return commands2Options(commands.value);
    });

    onRegisterContextmenu({
        key: ActionKey.CalendarRemoveEvent,
        label: t("Remove"),
        filter: ({ type }) => type === ContextmenuType.Calendar,
        exec: async (event) => {
            if (event) {
                await taskStore.a.remove(event.id);
                await taskStore.a.list();
            }
        },
    });

    return {
        show,
        data,
        options,

        on: {
            select,
            close,
        },
    };
}

export function commands2Options(actions: ContextmenuAction[]) {
    return actions.map((item) => {
        return {
            label: item.label ?? item.key,
            value: item.key,
        } as SelectOption;
    });
}
