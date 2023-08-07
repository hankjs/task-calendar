<script lang="ts" setup>
import { computed, ref } from "vue";
import {
    NDrawer,
    NDrawerContent,
    NList,
    NListItem,
    NButton,
    NSpace,
} from "naive-ui";
import { HeaderPosition, HeaderActionType } from "@/components/header/store";
import { ActionKey, onRegisterHeaderAndCommand } from "@/composables/action";
import { icons, renderIcon } from "@/components/icons/render";
import { RootCssVar } from "@/styles/variables";
import { useConfig } from "@/components/config/hooks";
import { t } from "@task/lang";
import { useProjectStore } from "@/store/project";
import AddProject from "./add.vue";
import PreviewProject from "./preview.vue";
import { Project } from "@task/model";

const show = ref(false);
const refAddProject = ref<typeof AddProject | null>(null);

onRegisterHeaderAndCommand(HeaderPosition.RightFixed, {
    key: ActionKey.CalendarAddProject,
    type: HeaderActionType.Render,
    props: {
        text: true,
        render: () => renderIcon(icons.fluent.AppFolder24Filled),
    },
    exec() {
        show.value = true;
    },
});

const { cssVar } = useConfig();
const width = computed(() => cssVar[RootCssVar.Drawer["--drawer-width"]]);

const store = useProjectStore();

function onRefresh() {
    store.a.list();
}

async function onEdit(project: Project) {
    await refAddProject.value?.open(project);
}
async function onRemove(project: Project) {
    await store.a.remove(project.id);
    onRefresh();
}
</script>

<template>
    <NDrawer v-model:show="show" :width="width">
        <NDrawerContent :header-style="{ display: 'block' }">
            <template #header>
                <div class="-flex -justify-between">
                    <div>{{ t("Project") }}</div>

                    <div>
                        <AddProject ref="refAddProject" :refresh="onRefresh" />
                    </div>
                </div>
            </template>
            <NList>
                <NListItem
                    v-for="p in store.projects"
                    :key="p.id"
                    style="align-items: stretch"
                >
                    <PreviewProject :project="p">
                        {{ p.name }}
                    </PreviewProject>

                    <template style="flex: 0 0 auto" #suffix>
                        <NSpace :wrap="false">
                            <NButton @click="onEdit(p)">{{
                                t("Edit")
                            }}</NButton>
                            <NButton @click="onRemove(p)">{{
                                t("Remove")
                            }}</NButton>
                        </NSpace>
                    </template>
                </NListItem>
            </NList>
        </NDrawerContent>
    </NDrawer>
</template>
