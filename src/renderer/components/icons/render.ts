import { AppFolder24Filled } from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { h } from "vue";

export const icons = {
    fluent: {
        AppFolder24Filled,
    },
};

export function renderIcon(comp: any) {
    return h(NIcon, null, {
        default: () => h(comp),
    });
}
