<script setup lang="ts"></script>

<template>
    <main class="page">
        <nav class="nav"></nav>
        <section class="container">
            <header class="header"></header>

            <section>
                <Suspense>
                    <router-view />
                </Suspense>
            </section>
        </section>
    </main>
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
