import * as VueRouter from "vue-router";

export let router = VueRouter.createRouter({
    history: VueRouter.createMemoryHistory(),
    routes: [
        { path: "/", redirect: "/blank" },
        {
            path: "/main",
            component: () => import("./window/main.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/timer/index.vue"),
                },
            ],
        },
        {
            path: "/blank",
            component: () => import("./window/blank.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/calendar/index.vue"),
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/window-main",
        },
    ],
});
