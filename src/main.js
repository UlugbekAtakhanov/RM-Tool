import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import naive from "naive-ui";
import router from "./router/router";
import { VueQueryPlugin } from "@tanstack/vue-query";

const pinia = createPinia();

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

createApp(App).use(VueQueryPlugin).use(router).use(pinia).use(naive).mount("#app");
