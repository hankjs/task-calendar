import { createApp } from "vue";
import "./assets/styles/index.scss";
import "./assets/icon/iconfont.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { setupBridge } from "@task/ipc/renderer";

setupBridge();

const app = createApp(App).use(createPinia()).use(router).mount("#app");
