<script lang="ts" setup>
import { HeaderActionType } from "@/store/header";
import { NButton } from "naive-ui";
import { h } from "vue";

const props = defineProps<{
    type: HeaderActionType;
    actionProps: any;
}>();

const actionComponentMap = {
    [HeaderActionType.Button]: NButton,
    [HeaderActionType.Icon]: NButton,
    [HeaderActionType.Text]: (props: any) =>
        h(props.at ?? "span", props, props.render()),
};
</script>

<template>
    <component
        class="header-action-item"
        :class="[`header-action-item--${props.type}`]"
        :is="actionComponentMap[props.type]"
        v-bind="actionProps"
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
