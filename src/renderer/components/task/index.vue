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
    NCollapse,
    NCollapseItem,
    NText,
    NDatePicker,
    NSwitch,
    NSelect,
    NLoadingBarProvider,
    useLoadingBar,
} from "naive-ui";
import { RootCssVar } from "@/styles/variables";
import { useConfig } from "@/components/config/hooks";
import { t } from "@task/lang";
import { useTaskStore } from "@/store/task";
import { Task } from "@task/model";
import { HeaderPosition, HeaderActionType } from "@/components/header/store";
import { ActionKey, onRegisterHeaderAndCommand } from "@/composables/action";
import { icons, renderIcon } from "@/components/icons/render";
import Color from "@/components/color/index.vue";
import { useProjectStore } from "@/store/project";

enum CategoryType {
    Milestone = "milestone",
    Task = "task",
    Allday = "allday",
    Time = "time",
}
// prettier-ignore
const CATEGORY_OPTIONS = [
    { label: t("Milestone"), value: CategoryType.Milestone },
    { label: t("Task"), value: CategoryType.Task },
    { label: t("Allday"), value: CategoryType.Allday },
    { label: t("Time"), value: CategoryType.Time },
]
const defaultModel = () =>
    ({
        title: "",
        category: CategoryType.Time,
        body: "",
        id: undefined,
        calendarId: undefined,
        start: undefined,
        end: undefined,
        isAllday: false,
        color: "",
        backgroundColor: "",
        dragBackgroundColor: "",
        borderColor: "",
    } as Omit<Task, "id"> & {
        id?: string;
    });

const refDrawer = ref();
const show = ref(false);
const isEdit = ref(false);
const title = computed(() => {
    return isEdit.value ? t("Edit Task") : t("Add Task");
});

const { cssVar } = useConfig();
const width = computed(() => cssVar[RootCssVar.Drawer["--drawer-width"]]);

const taskStore = useTaskStore();
const projectStore = useProjectStore();
const projectOptions = computed(() => {
    if (!projectStore.projects) {
        return [];
    }

    return projectStore.projects.map((project) => ({
        label: project.name,
        value: project.id,
    }));
});

const formRef = ref<FormInst | null>(null);
const modelRef = ref<Partial<Task>>(defaultModel());

const rules: FormRules = {
    calendarId: [
        {
            required: true,
            message: t("Required"),
        },
    ],
    title: [
        {
            required: true,
            message: t("Required"),
        },
    ],
    category: [
        {
            required: true,
            message: t("Required"),
        },
    ],
};

const loadingBar = useLoadingBar();

async function onOpen(task?: Task) {
    loadingBar.start();
    try {
        isEdit.value = !!task;
        show.value = true;
        await projectStore.a.list();
        /** edit */
        if (!task) {
            return;
        }

        modelRef.value = {
            ...task,
            calendarId: task.calendarId
                ? task.calendarId
                : await projectStore.a.defaultId(),
            category: task.category ? task.category : CategoryType.Time,
        };
    } finally {
        loadingBar.finish();
    }
}

async function onFinish(e: MouseEvent) {
    e.preventDefault();
    await formRef.value?.validate();
    try {
        if (isEdit.value) {
            await taskStore.a.update(
                modelRef.value.id!,
                modelRef.value as Task
            );
        } else {
            await taskStore.a.add(modelRef.value as Task);
        }
        show.value = false;
    } catch (error) {
        console.error(error);
    }
}

function onAfterLeave() {
    modelRef.value = defaultModel();
    isEdit.value = false;
}

onRegisterHeaderAndCommand(HeaderPosition.Right, {
    key: ActionKey.CalendarAddEvent,
    type: HeaderActionType.Render,
    props: {
        text: true,
        render: () => renderIcon(icons.fluent.Add24Filled),
    },
    exec(payload?: Task) {
        onOpen(payload);
    },
});
</script>

<template>
    <NDrawer
        ref="refDrawer"
        v-model:show="show"
        @after-leave="onAfterLeave"
        :width="width"
    >
        <NDrawerContent :title="title">
            <NForm ref="formRef" :model="modelRef" :rules="rules">
                <NCollapse>
                    <NFormItem path="title" :label="t('Title')">
                        <NInput
                            v-model:value="modelRef.title"
                            @keydown.enter.prevent
                            :placeholder="t('Please Input')"
                        />
                    </NFormItem>
                    <NFormItem path="calendarId" :label="t('Project')">
                        <NSelect
                            v-model:value="modelRef.calendarId"
                            :options="projectOptions"
                        />
                    </NFormItem>
                    <NFormItem path="category" :label="t('Category')">
                        <NSelect
                            v-model:value="modelRef.category"
                            :options="CATEGORY_OPTIONS"
                            :placeholder="t('The default is Time')"
                        />
                    </NFormItem>

                    <NFormItem path="body" :label="t('Body')">
                        <NInput
                            v-model:value="modelRef.body"
                            type="textarea"
                            :placeholder="t('Please Input')"
                        />
                    </NFormItem>

                    <NFormItem path="isAllday" :label="t('IsAllday')">
                        <NSwitch v-model:value="modelRef.isAllday" />
                    </NFormItem>

                    <NFormItem path="start" :label="t('Start')">
                        <NDatePicker
                            v-model:value="modelRef.start"
                            type="datetime"
                            clearable
                        />
                    </NFormItem>

                    <NFormItem path="end" :label="t('End')">
                        <NDatePicker
                            v-model:value="modelRef.end"
                            type="datetime"
                            clearable
                        />
                    </NFormItem>

                    <NCollapseItem :title="t('Color')">
                        <template #header-extra>
                            <NText depth="3">{{
                                t("Overwrite the Project configuration")
                            }}</NText>
                        </template>

                        <Color :model="modelRef" />
                    </NCollapseItem>
                </NCollapse>
            </NForm>

            <template #footer>
                <NButton
                    :disabled="modelRef.title === ''"
                    type="primary"
                    @click="onFinish"
                >
                    {{ t("Save") }}
                </NButton>
            </template>
        </NDrawerContent>
    </NDrawer>
</template>
