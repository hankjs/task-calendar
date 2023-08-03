<script setup lang="ts">
import {
    NConfigProvider,
    NGlobalStyle,
    NThemeEditor,
    GlobalThemeOverrides,
} from "naive-ui";
import Config from "./components/config/index.vue";

const themeOverrides: GlobalThemeOverrides = {};
</script>
<template>
    <Config>
        <NConfigProvider :theme-overrides="themeOverrides">
            <NThemeEditor>
                <NGlobalStyle />
                <router-view />
            </NThemeEditor>
        </NConfigProvider>
    </Config>
</template>
