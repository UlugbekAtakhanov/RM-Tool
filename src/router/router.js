import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/gant-chart",
        name: "gant-chart",
        component: () => import("../pages/GantPage.vue"),
    },
    {
        path: "/forms",
        name: "forms",
        component: () => import("../pages/FormsPage.vue"),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
