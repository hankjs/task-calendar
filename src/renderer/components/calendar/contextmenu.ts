import { MaybeRefOrGetter, computed, shallowRef } from "vue";
import { EventInfo } from "./props";
import { useEventListener } from "@vueuse/core";
import { SelectOption } from "naive-ui/es/select";
import Calendar from "@toast-ui/calendar";
import { findTimeElement } from "./helper";
import { t } from "@task/lang";
import { actions2Options, useContextmenuStore } from "./contextmenu.store";
import { ContextmenuKey } from "./contextmenu.store";

type Props = {
    calendar: Calendar | null;
};

export function useContextmenu(
    container: MaybeRefOrGetter<Element | null>,
    props: Props
) {
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

    useEventListener(container, "contextmenu", (e: PointerEvent) => {
        e.preventDefault();
        if (!e.target || cmStore.contextmenus.length === 0) return;
        const target = e.target as HTMLElement;
        let parent = findTimeElement(target);
        let event = null;

        if (parent) {
            event = props.calendar?.getEvent(
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
        data.value = {
            x: 0,
            y: 0,
            event: null,
        };
    }

    function select(value: ContextmenuKey) {
        cmStore.a.dispatch(value, data.value.event);
    }
    //#endregion
    const options = computed(() => {
        return actions2Options(cmStore.contextmenus);
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
