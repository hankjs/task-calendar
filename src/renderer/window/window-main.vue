<script setup lang="ts"></script>

<template>
    <div class="page">
        <nav class="nav"></nav>
        <div class="container">
            <header class="header"></header>

            <main>
                <Suspense>
                    <router-view />
                </Suspense>
            </main>
        </div>
    </div>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template: 100% / 400px 1fr;
}

.nav {
    background-color: #2e2e2e;
}

.container {
    display: grid;
    grid-template: 48px 1fr / 100%;
}

.header {
    background-color: #383838;
}
</style>
