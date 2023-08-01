import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import naive from "naive-ui";
import { router } from "./router/router";

const pinia = createPinia();

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

createApp(App).use(router).use(pinia).use(autoAnimatePlugin).use(naive).mount("#app");
