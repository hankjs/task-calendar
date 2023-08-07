import {
    AppFolder24Filled,
    Add24Filled,
    ChevronLeft24Filled,
    ChevronRight24Filled,
} from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { h } from "vue";

export const icons = {
    fluent: {
        AppFolder24Filled,
        Add24Filled,
        ChevronLeft24Filled,
        ChevronRight24Filled,
    },
};

export function renderIcon(component: any) {
    return h(NIcon, {
        component,
    });
}
