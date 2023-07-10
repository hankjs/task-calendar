<script lang="ts" setup>
import { shallowReactive, shallowRef } from "vue";

defineProps<{}>();
const refVar = shallowRef(false);
</script>

<template>
    <main>Timer</main>
</template>
