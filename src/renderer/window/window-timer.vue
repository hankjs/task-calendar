<script setup lang="ts"></script>

<template>
    <main class="page">
        <Suspense>
            <router-view />
        </Suspense>
    </main>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
