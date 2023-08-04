<script lang="ts" setup>
import { HeaderActionType } from "@/components/header/store";
import { NButton } from "naive-ui";
import { computed } from "vue";
import { h } from "vue";

const props = defineProps<{
    type: HeaderActionType;
    actionProps?: {
        render?: () => any;
        [k: string]: any;
    };
    execEvent?: string;
    exec?: () => void;
}>();

const actionComponentMap = {
    [HeaderActionType.Button]: NButton,
    [HeaderActionType.Icon]: NButton,
    [HeaderActionType.Text]: (props: any) =>
        h(props.at ?? "span", props, props.render()),
};

const execEvent = computed(() => props.execEvent ?? "click");
</script>

<template>
    <component
        class="header-action-item"
        :class="[`header-action-item--${props.type}`]"
        :is="actionComponentMap[props.type]"
        v-bind="actionProps"
        v-on="{ [execEvent]: props.exec }"
        >{{
            props.actionProps?.render ? props.actionProps.render() : null
        }}</component
    >
</template>

<style>
.header-action-item--icon .n-button__icon {
    font-size: 25px;
    margin: 0;
}
</style>
