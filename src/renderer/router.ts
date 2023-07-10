import * as VueRouter from "vue-router";

export let router = VueRouter.createRouter({
    history: VueRouter.createMemoryHistory(),
    routes: [
        { path: "/", redirect: "/window-main" },
        {
            path: "/window-main",
            component: () => import("./window/window-main.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/timer.vue"),
                },
                {
                    path: "list",
                    component: () => import("./pages/list.vue"),
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/window-main/list",
        },
    ],
});
