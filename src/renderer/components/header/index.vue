<script lang="ts" setup>
import { useHeaderStore } from "./store";
import HeaderAction from "./action.vue";
import { NDivider } from "naive-ui";

const headerStore = useHeaderStore();
</script>

<template>
    <header class="header">
        <div class="header-title">
            <HeaderAction
                v-for="action in headerStore.leftFixed"
                :key="action.key"
                :type="action.type"
                :action-props="action.props"
                :exec="action.exec"
            ></HeaderAction>

            <template v-if="headerStore.left.length">
                <NDivider vertical />

                <HeaderAction
                    v-for="action in headerStore.left"
                    :key="action.key"
                    :type="action.type"
                    :action-props="action.props"
                    :exec="action.exec"
                ></HeaderAction>
            </template>
        </div>
        <div class="header-actions">
            <HeaderAction
                v-for="action in headerStore.right"
                :key="action.key"
                :type="action.type"
                :action-props="action.props"
                :exec="action.exec"
            ></HeaderAction>

            <template v-if="headerStore.rightFixed.length">
                <NDivider vertical />

                <HeaderAction
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

.header-actions,
.header-title {
    display: flex;
    align-items: center;
}

.header-actions {
    justify-content: var(--header-actions-justify-content);
}
</style>
