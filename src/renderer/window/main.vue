<script setup lang="ts">
import { h, shallowRef, type Component } from "vue";
import {
    NLayoutHeader,
    NLayoutSider,
    NLayoutFooter,
    NMenu,
    NIcon,
} from "naive-ui";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
} from "@vicons/ionicons5";

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
    {
        label: "1973年的弹珠玩具",
        key: "pinball-1973",
        icon: renderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: "鼠",
                key: "rat",
            },
        ],
    },
    {
        label: "寻羊冒险记",
        key: "a-wild-sheep-chase",
        disabled: true,
        icon: renderIcon(BookIcon),
    },
    {
        label: "舞，舞，舞",
        key: "dance-dance-dance",
        icon: renderIcon(BookIcon),
        children: [
            {
                type: "group",
                label: "人物",
                key: "people",
                children: [
                    {
                        label: "叙事者",
                        key: "narrator",
                        icon: renderIcon(PersonIcon),
                    },
                    {
                        label: "羊男",
                        key: "sheep-man",
                        icon: renderIcon(PersonIcon),
                    },
                ],
            },
            {
                label: "饮品",
                key: "beverage",
                icon: renderIcon(WineIcon),
                children: [
                    {
                        label: "威士忌",
                        key: "whisky",
                    },
                ],
            },
            {
                label: "食物",
                key: "food",
                children: [
                    {
                        label: "三明治",
                        key: "sandwich",
                    },
                ],
            },
            {
                label: "过去增多，未来减少",
                key: "the-past-increases-the-future-recedes",
            },
        ],
    },
];

function onCollapse(e: boolean) {
    isCollapse.value = e;
}
</script>

<template>
    <div
        class="page"
        :class="{
            'is-collapse': isCollapse,
        }"
        has-sider
    >
        <NLayoutSider
            class="nav"
            bordered
            show-trigger
            :collapsed="isCollapse"
            collapse-mode="width"
            @update:collapsed="onCollapse"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            :inverted="inverted"
        >
            <NMenu
                :inverted="inverted"
                :collapsed-width="64"
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
