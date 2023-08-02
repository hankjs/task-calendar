import { it, expect, vi, describe, beforeEach } from "vitest";
import { useProjectStore } from "../project";
import { setActivePinia, createPinia } from "pinia";
import { useSetupHooks } from "@/tests/component";
import { projectStore } from "@task/ipc/renderer/platform/web/db.data";

describe("useProjectStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        projectStore.clearProjects();
    });

    it("should return projects", async () => {
        const { store } = useSetupHooks(() => ({
            store: useProjectStore(),
        }));

        await store.a.list();
        expect(store.projects).toBeDefined();
    });

    describe("add project", () => {
        it("should add project to the first position", async () => {
            const { store } = useSetupHooks(() => ({
                store: useProjectStore(),
            }));

            const project = await store.a.add({
                name: "Project1",
            });
            await store.a.list();
            expect(store.projects![0]).toEqual(project);
        });
    });

    describe("update project", () => {
        it("should update project", async () => {
            const { store } = useSetupHooks(() => ({
                store: useProjectStore(),
            }));

            const project = await store.a.add({
                name: "Project1",
            });
            await store.a.list();
            expect(store.projects![0].name).toEqual("Project1");

            await store.a.update(project.id, {
                name: "Project2",
            });
            await store.a.list();
            expect(store.projects![0].name).toEqual("Project2");
        });

        it("only update not undefined field", async () => {
            const { store } = useSetupHooks(() => ({
                store: useProjectStore(),
            }));

            const project = await store.a.add({
                name: "Project1",
                color: "#ccc",
                backgroundColor: "#ccc",
                dragBackgroundColor: "#ccc",
                borderColor: "#ccc",
            });

            /** only end changed */
            await store.a.update(project.id, {
                color: "#fff",
            });
            await store.a.list();
            expect(store.projects![0].backgroundColor).toEqual("#ccc");
            expect(store.projects![0].color).toEqual("#fff");
        });
    });

    describe("delete project", () => {
        it("should delete project", async () => {
            const { store } = useSetupHooks(() => ({
                store: useProjectStore(),
            }));

            const project = await store.a.add({
                name: "Project1",
            });
            await store.a.list();
            expect(store.projects![0]).toEqual(project);

            await store.a.remove(project.id);
            await store.a.list();
            expect(store.projects).toHaveLength(0);
        });
    });
});
