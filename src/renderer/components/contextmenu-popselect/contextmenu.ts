import { MaybeRefOrGetter, computed, shallowRef } from "vue";
import { useEventListener } from "@vueuse/core";
import { SelectOption } from "naive-ui/es/select";
import { Panel, useContextmenuStore } from "@/store/contextmenu";
import { ActionKey, ContextmenuAction } from "@/composables/action";
import { ref } from "vue";

export function getPanelClass(p: Panel) {
    return `contextmenu-panel contextmenu-panel-${p}`;
}

export function useContextmenu(container: MaybeRefOrGetter<Element | null>) {
    const show = shallowRef(false);
    const data = shallowRef<{
        x: number;
        y: number;
        target: HTMLElement | null;
        panel: Panel | null;
        payload: any | null;
    }>({
        x: 0,
        y: 0,
        target: null,
        panel: null,
        payload: null,
    });
    const cmStore = useContextmenuStore();
    const commands = ref<ContextmenuAction[]>([]);

    useEventListener(container, "contextmenu", (e: PointerEvent) => {
        e.preventDefault();
        if (!e.target || cmStore.commands.length === 0) return;
        const target = e.target as HTMLElement;
        const panel = findPanel(target);
        const payload = cmStore.a.getPayload(panel!, target);
        commands.value = cmStore.a.filter({
            panel,
            target,
            payload,
        });

        if (commands.value.length === 0) return;
        data.value = {
            x: e.clientX,
            y: e.clientY,
            target,
            panel,
            payload,
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
            target: null,
            panel: null,
            payload: null,
        };
    }

    function select(value: ActionKey) {
        cmStore.a.dispatch(value, data.value.payload);
        close();
    }
    //#endregion
    const options = computed(() => {
        return commands2Options(commands.value);
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

export function findPanel(target: HTMLElement): Panel | null {
    let parent: HTMLElement | null = target;
    let panel: Panel | null = null;
    while (parent !== null) {
        if (parent.classList.contains("contextmenu-panel")) {
            const cls = Array.from(parent.classList).find((c) => {
                return c.startsWith("contextmenu-panel-");
            });
            if (cls) {
                panel = cls.replace("contextmenu-panel-", "") as Panel;
            }
            break;
        }
        parent = parent.parentElement;
    }

    return panel;
}
