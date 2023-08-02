<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NThemeEditor } from "naive-ui";
</script>
<template>
    <NConfigProvider>
        <NThemeEditor>
            <NGlobalStyle />
            <router-view />
        </NThemeEditor>
    </NConfigProvider>
</template>
