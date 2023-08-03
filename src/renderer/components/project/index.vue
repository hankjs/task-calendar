<script lang="ts" setup>
import { computed, ref } from "vue";
import { NDrawer, NDrawerContent, NList, NListItem, NButton } from "naive-ui";
import { HeaderPosition, HeaderActionType } from "@/store/header";
import { onRegisterHeaderAndCommand } from "@/composables/action";
import { icons, renderIcon } from "@/components/icons/render";
import { RootCssVar } from "@/styles/variables";
import { useConfig } from "@/components/config/hooks";
import { t } from "@task/lang";
import { useProjectStore } from "@/store/project";
import AddProject from "./add.vue";

const show = ref(false);

onRegisterHeaderAndCommand(HeaderPosition.RightFixed, {
    key: "calendar-add-project",
    type: HeaderActionType.Icon,
    props: {
        text: true,
        renderIcon: () => renderIcon(icons.fluent.AppFolder24Filled),
    },
    exec() {
        show.value = true;
    },
});

const { cssVar } = useConfig();
const width = computed(() => cssVar[RootCssVar.Drawer["--drawer-width"]]);

const store = useProjectStore();
store.a.list();
</script>

<template>
    <NDrawer v-model:show="show" :width="width">
        <NDrawerContent :header-style="{ display: 'block' }">
            <template #header>
                <div class="-flex -justify-between">
                    <div>{{ t("Project") }}</div>

                    <div>
                        <AddProject />
                    </div>
                </div>
            </template>
            <NList>
                <NListItem v-for="p in store.projects" :key="p.id">
                    <template #prefix>
                        <n-button>Prefix</n-button>
                    </template>

                    {{ p.name }}

                    <template #suffix>
                        <n-button>Suffix</n-button>
                    </template>
                </NListItem>
            </NList>
        </NDrawerContent>
    </NDrawer>
</template>
