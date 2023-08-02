import * as VueRouter from "vue-router";

export let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        { path: "/", redirect: "/main" },
        {
            path: "/main",
            component: () => import("./window/main.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/calendar/index.vue"),
                },
            ],
        },
        {
            path: "/blank",
            component: () => import("./window/blank.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/timer/index.vue"),
                },
            ],
        },
    ],
});
