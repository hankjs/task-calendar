import { Project, Task } from "@task/model";

class TaskStore {
    async loadTasks() {
        const data = localStorage.getItem(TaskStore.TASKS_KEY);
        try {
            const parsed = JSON.parse(data ?? "");
            this.store =
                parsed && parsed.data
                    ? parsed
                    : {
                          data: [],
                      };
        } catch (error) {
            this.store = {
                data: [],
            };
        }
    }

    async saveTasks() {
        localStorage.setItem(
            TaskStore.TASKS_KEY,
            JSON.stringify(this.store ?? "")
        );
    }

    clearTasks() {
        localStorage.removeItem(TaskStore.TASKS_KEY);
        this.store.data = [];
    }

    getTasks() {
        return [...this.store.data];
    }

    setTasks(Tasks: Task[]) {
        this.store.data = Tasks;
    }

    static TASKS_KEY = "TASKS_KEY";

    constructor() {
        this.loadTasks();
        window.addEventListener("beforeunload", () => {
            this.saveTasks();
        });
    }

    private store!: {
        data: Task[];
    };
}
export const taskStore = new TaskStore();

class ProjectStore {
    async loadProjects() {
        const data = localStorage.getItem(ProjectStore.PROJECTS_KEY);

        try {
            const parsed = JSON.parse(data ?? "");
            this.store =
                parsed && parsed.data
                    ? parsed
                    : {
                          data: [],
                      };
        } catch (error) {
            this.store = {
                data: [],
                defaultId: "",
            };
        }
    }

    async saveProjects() {
        localStorage.setItem(
            ProjectStore.PROJECTS_KEY,
            JSON.stringify(this.store)
        );
    }

    clearProjects() {
        localStorage.removeItem(ProjectStore.PROJECTS_KEY);
        this.store.data = [];
    }

    getProjects() {
        return [...this.store.data];
    }

    setProjects(projects: Project[]) {
        this.store.data = projects;
    }

    getDefaultProjId() {
        if (this.store.defaultId) {
            return this.store.defaultId;
        }

        if (!this.store.data || this.store.data.length === 0) {
            return "";
        }

        return this.store.data[0].id;
    }

    setDefaultProjId(id: string) {
        this.store.defaultId = id;
    }

    static PROJECTS_KEY = "PROJECTS_KEY";

    constructor() {
        this.loadProjects();
        window.addEventListener("beforeunload", () => {
            this.saveProjects();
        });
    }

    private store!: {
        data: Project[];
        defaultId: string;
    };
}

export const projectStore = new ProjectStore();
