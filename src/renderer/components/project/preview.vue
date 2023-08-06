<script lang="ts" setup>
import { computed } from "vue";
import { Project } from "@task/model";

const props = defineProps<{
    project: Project;
}>();
const style = computed(() => {
    return {
        color: props.project.color,
        borderLeftColor: props.project.borderColor,
        borderRightColor:
            props.project.dragBackgroundColor || props.project.backgroundColor,
        backgroundColor: props.project.backgroundColor,
    };
});
</script>

<template>
    <div class="project-preive" :style="style">
        {{ props.project.name }}
    </div>
</template>

<style scoped>
.project-preive {
    height: 100%;
    border-radius: 2px;
    border-left: 3px solid rgb(0, 0, 0);
    border-right: 10px solid rgb(161, 181, 108);
    margin-left: 0px;
    color: rgb(0, 0, 0);
    background-color: rgb(161, 181, 108);
    padding: 1px 0 0 3px;
}
</style>
