<script setup lang="ts">
import { h, shallowRef, type Component, computed } from "vue";
import {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutFooter,
    NMenu,
    NIcon,
} from "naive-ui";
import { BookOutline as BookIcon } from "@vicons/ionicons5";
import { useConfig } from "@/components/config/hooks";
import { RootCssVar } from "@/styles/variables";

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const inverted = shallowRef(false);
const isCollapse = shallowRef(false);
const menuOptions = [
    {
        label: "且听风吟",
        key: "hear-the-wind-sing",
        icon: renderIcon(BookIcon),
    },
];

function onCollapse(e: boolean) {
    isCollapse.value = e;
}

const { cssVar } = useConfig();
const menuWidth = computed(
    () => cssVar[RootCssVar.PageMain["--page-main-menu-width"]]
);
const menuCollapsedWidth = computed(
    () => cssVar[RootCssVar.PageMain["--page-main-menu-width--is-collapsed"]]
);
</script>

<template>
    <NLayout has-sider>
        <div
            class="page"
            :class="{
                'is-collapse': isCollapse,
            }"
        >
            <NLayoutSider
                class="nav"
                bordered
                show-trigger
                :collapsed="isCollapse"
                collapse-mode="width"
                @update:collapsed="onCollapse"
                :collapsed-width="menuCollapsedWidth"
                :width="menuWidth"
                :native-scrollbar="false"
                :inverted="inverted"
            >
                <NMenu
                    :inverted="inverted"
                    :collapsed-width="menuCollapsedWidth"
                    :collapsed-icon-size="22"
                    :options="menuOptions"
                />
            </NLayoutSider>
            <NLayoutHeader class="header" :inverted="inverted" bordered>
                Header Header Header
                <n-menu
                    mode="horizontal"
                    :inverted="inverted"
                    :options="menuOptions"
                />
            </NLayoutHeader>
            <main class="main">
                <Suspense>
                    <router-view />
                </Suspense>
            </main>
            <NLayoutFooter class="footer" :inverted="inverted" bordered>
                Footer Footer Footer
            </NLayoutFooter>
        </div>
    </NLayout>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;

    display: grid;
    /* grid: var(--page-main-grid); */
    grid-template: var(--page-main-grid-template);
    grid-template-areas: var(--page-main-grid-template-areas);
}

.page.is-collapse {
    grid-template: var(--page-main-grid-template--is-collapsed);
    grid-template-areas: var(--page-main-grid-template-areas--is-collapsed);
}

.nav {
    grid-area: nav;
}

.main {
    grid-area: main;
}

.header {
    grid-area: header;
}

.footer {
    grid-area: footer;
}
</style>
