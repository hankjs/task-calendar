import * as VueRouter from "vue-router";

import WindowMain from "./Window/WindowMain.vue";
import WindowMainList from "./Window/WindowMain/List.vue";

export let router = VueRouter.createRouter({
  history: VueRouter.createMemoryHistory(),
  routes: [
    { path: "/", redirect: "/WindowMain/List" },
    {
      path: "/WindowMain",
      component: WindowMain,
      children: [{ path: "List", component: WindowMainList }],
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/WindowMain/List",
    },
  ],
});
