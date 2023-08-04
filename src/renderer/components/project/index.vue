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
import { onRegisterHeaderAndCommand } from "@/composables/action";
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

async function onEdit(project: Project) {
    await refAddProject.value?.open(project);
    store.a.list();
}
async function onRemove(project: Project) {
    await store.a.remove(project.id);
    store.a.list();
}
</script>

<template>
    <NDrawer v-model:show="show" :width="width">
        <NDrawerContent :header-style="{ display: 'block' }">
            <template #header>
                <div class="-flex -justify-between">
                    <div>{{ t("Project") }}</div>

                    <div>
                        <AddProject ref="refAddProject" />
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
                        <NSpace>
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
