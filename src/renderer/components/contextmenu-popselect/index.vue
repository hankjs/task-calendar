<script lang="ts" setup>
import { ref } from "vue";
import { NPopselect } from "naive-ui";
import { useContextmenu } from "./contextmenu";
import Calendar from "@toast-ui/calendar";
import { RootCssVar } from "@/styles/variables";
const refContainer = ref<Element | null>(null);

const { show, options, data, on } = useContextmenu(refContainer);
</script>

<template>
    <div class="container" ref="refContainer">
        <slot />
    </div>

    <NPopselect
        trigger="manual"
        :style="{
            minWidth: `var(${RootCssVar.Calendar['--contextmenu-min-width']})`,
        }"
        placement="bottom"
        :options="options"
        :show-arrow="false"
        :show="show"
        :x="data.x"
        :y="data.y"
        @update:value="on.select"
        @clickoutside="on.close"
    />
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
