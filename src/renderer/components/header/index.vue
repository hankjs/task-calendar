<script lang="ts" setup>
import { useHeaderStore } from "./store";
import HeaderAction from "./action.vue";
import { NDivider, NSpace } from "naive-ui";

const headerStore = useHeaderStore();
</script>

<template>
    <header class="header">
        <div class="header-left">
            <HeaderAction
                class="header-action"
                v-for="action in headerStore.leftFixed"
                :key="action.key"
                :type="action.type"
                :action-props="action.props"
                :exec="action.exec"
            ></HeaderAction>

            <template v-if="headerStore.left.length">
                <HeaderAction
                    class="header-action"
                    v-for="action in headerStore.left"
                    :key="action.key"
                    :type="action.type"
                    :action-props="action.props"
                    :exec="action.exec"
                ></HeaderAction>
            </template>
        </div>
        <div class="header-rigth">
            <HeaderAction
                class="header-action"
                v-for="action in headerStore.right"
                :key="action.key"
                :type="action.type"
                :action-props="action.props"
                :exec="action.exec"
            ></HeaderAction>

            <template v-if="headerStore.rightFixed.length">
                <HeaderAction
                    class="header-action"
                    v-for="action in headerStore.rightFixed"
                    :key="action.key"
                    :type="action.type"
                    :action-props="action.props"
                    :exec="action.exec"
                ></HeaderAction>
            </template>
        </div>
    </header>
</template>

<style scoped>
.header {
    display: grid;
    grid-template: var(--header-grid-template);
    grid-template-areas: var(--header-grid-template-areas);
    height: 100%;
    padding-block: var(--header-padding-block);
    padding-inline: var(--header-padding-inline);
}

.header-rigth,
.header-left {
    display: flex;
    align-items: center;
}

.header-rigth {
    justify-content: var(--header-actions-justify-content);
}
.header-action {
    margin-right: var(--header-action-gap);
}
.header-action:nth-last-child(1) {
    margin-right: 0;
}
</style>
