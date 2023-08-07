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
import ContextmenuPopselect from "@/components/contextmenu-popselect/index.vue";

const themeOverrides: GlobalThemeOverrides = {};
</script>
<template>
    <Config>
        <ContextmenuPopselect>
            <NLoadingBarProvider>
                <NConfigProvider :theme-overrides="themeOverrides">
                    <NGlobalStyle />
                    <router-view />
                </NConfigProvider>

                <!-- Global Commnd or Header Fixed Actions -->
                <NMessageProvider>
                    <Project />
                    <Task />
                </NMessageProvider>
            </NLoadingBarProvider>
        </ContextmenuPopselect>
    </Config>
</template>
