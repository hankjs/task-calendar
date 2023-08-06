<script lang="ts" setup>
import { NFormItem, NColorPicker } from "naive-ui";
import { t } from "@task/lang";
import { Project } from "@task/model";

defineProps<{
    model: Partial<Project>;
}>();
const modes: any[] = ["rgb", "hex", "hsl", "hsv"];
</script>

<template>
    <NFormItem path="color" :label="t('Color')">
        <NColorPicker
            v-model:value="model.color"
            :modes="modes"
            :actions="['clear']"
            show-preview
        />
    </NFormItem>
    <NFormItem path="backgroundColor" :label="t('BackgroundColor')">
        <NColorPicker
            v-model:value="model.backgroundColor"
            :modes="modes"
            :actions="['clear']"
            show-preview
        />
    </NFormItem>
    <NFormItem path="dragBackgroundColor" :label="t('DragBackgroundColor')">
        <NColorPicker
            v-model:value="model.dragBackgroundColor"
            :modes="modes"
            :actions="['clear']"
            show-preview
        />
    </NFormItem>
    <NFormItem path="borderColor" :label="t('BorderColor')">
        <NColorPicker
            v-model:value="model.borderColor"
            :modes="modes"
            :actions="['clear']"
            show-preview
        />
    </NFormItem>
</template>
