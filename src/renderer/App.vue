<script setup lang="ts">
import {
    NConfigProvider,
    NGlobalStyle,
    NThemeEditor,
    GlobalThemeOverrides,
    NMessageProvider,
    NLoadingBarProvider,
} from "naive-ui";
import Config from "./components/config/index.vue";
import Project from "./components/project/index.vue";
import Task from "./components/task/index.vue";

const themeOverrides: GlobalThemeOverrides = {};
</script>
<template>
    <Config>
        <NLoadingBarProvider>
            <NConfigProvider :theme-overrides="themeOverrides">
                <NThemeEditor>
                    <NGlobalStyle />
                    <router-view />
                </NThemeEditor>
            </NConfigProvider>

            <!-- Global Commnd or Header Fixed Actions -->
            <NMessageProvider>
                <Project />
                <Task />
            </NMessageProvider>
        </NLoadingBarProvider>
    </Config>
</template>
