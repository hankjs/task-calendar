<script lang="ts" setup>
import { shallowReactive, shallowRef } from "vue";

defineProps<{}>();
const refVar = shallowRef(false);
function fn(): void
function fn() {
    console.log("fn");
}
fn()
</script>

<template>
    <main>Timer</main>
</template>
