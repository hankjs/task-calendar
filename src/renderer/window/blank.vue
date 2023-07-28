<script setup lang="ts"></script>

<template>
    <main class="page">
        <router-view />
    </main>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template: 1fr / 1fr;
}
</style>
