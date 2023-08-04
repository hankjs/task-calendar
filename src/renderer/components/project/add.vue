<script lang="ts" setup>
import { computed, ref, shallowRef } from "vue";
import {
    NDrawer,
    NDrawerContent,
    NButton,
    NForm,
    NFormItem,
    NInput,
    FormInst,
    FormRules,
    NColorPicker,
} from "naive-ui";
import { RootCssVar } from "@/styles/variables";
import { useConfig } from "@/components/config/hooks";
import { t } from "@task/lang";
import { useProjectStore } from "@/store/project";
import { Project } from "@task/model";

const defaultModel = () => ({
    name: "",
    id: undefined,
    color: "",
    backgroundColor: "",
    dragBackgroundColor: "",
    borderColor: "",
});
const show = ref(false);
const isEdit = ref(false);
const title = computed(() => {
    return isEdit.value ? t("Edit Project") : t("Add Project");
});

const { cssVar } = useConfig();
const width = computed(() => cssVar[RootCssVar.Drawer["--drawer-width"]]);
const modes: any[] = ["rgb", "hex", "hsl", "hsv"];

const store = useProjectStore();
const openResolve = shallowRef<(project: Project) => void>(Promise.resolve);
const openReject = shallowRef<(project?: any) => void>(() => {});

const formRef = ref<FormInst | null>(null);
const modelRef = ref<Partial<Project>>(defaultModel());

const rules: FormRules = {
    name: [
        {
            required: true,
            message: t("Required"),
        },
    ],
};

async function onOpen(project?: Project) {
    isEdit.value = !!project;
    show.value = true;
    console.log("modelRef.value", modelRef.value);
    /** edit */
    if (!project) {
        return;
    }

    modelRef.value = {
        ...project,
    };

    return new Promise<Project>((resolve, reject) => {
        openResolve.value = resolve;
        openReject.value = reject;
    });
}

async function onFinish(e: MouseEvent) {
    e.preventDefault();
    await formRef.value?.validate();
    try {
        if (isEdit.value) {
            const res = await store.a.update(
                modelRef.value.id!,
                modelRef.value as Project
            );
            openResolve.value(res);
        } else {
            await store.a.add(modelRef.value as Project);
        }
        show.value = false;
    } catch (error) {
        console.error(error);
    }
}

function onAfterLeave() {
    openReject.value();
    modelRef.value = defaultModel();
    isEdit.value = false;
    openResolve.value = Promise.resolve;
    openReject.value = () => {};
}

defineExpose({
    open: onOpen,
});
</script>

<template>
    <NButton type="primary" @click="onOpen()">{{ t("Add") }}</NButton>

    <NDrawer v-model:show="show" @after-leave="onAfterLeave" :width="width">
        <NDrawerContent :title="title">
            <NForm ref="formRef" :model="modelRef" :rules="rules">
                <NFormItem path="name" :label="t('Name')">
                    <NInput
                        v-model:value="modelRef.name"
                        @keydown.enter.prevent
                        :placeholder="t('Please Input')"
                    />
                </NFormItem>

                <NFormItem path="color" :label="t('Color')">
                    <NColorPicker
                        v-model:value="modelRef.color"
                        :modes="modes"
                        :actions="['clear']"
                        show-preview
                    />
                </NFormItem>
                <NFormItem path="backgroundColor" :label="t('BackgroundColor')">
                    <NColorPicker
                        v-model:value="modelRef.backgroundColor"
                        :modes="modes"
                        :actions="['clear']"
                        show-preview
                    />
                </NFormItem>
                <NFormItem
                    path="dragBackgroundColor"
                    :label="t('DragBackgroundColor')"
                >
                    <NColorPicker
                        v-model:value="modelRef.dragBackgroundColor"
                        :modes="modes"
                        :actions="['clear']"
                        show-preview
                    />
                </NFormItem>
                <NFormItem path="borderColor" :label="t('BorderColor')">
                    <NColorPicker
                        v-model:value="modelRef.borderColor"
                        :modes="modes"
                        :actions="['clear']"
                        show-preview
                    />
                </NFormItem>
            </NForm>

            <template #footer>
                <NButton
                    :disabled="modelRef.name === ''"
                    type="primary"
                    @click="onFinish"
                >
                    {{ t("Save") }}
                </NButton>
            </template>
        </NDrawerContent>
    </NDrawer>
</template>
