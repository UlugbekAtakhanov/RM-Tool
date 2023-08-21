import { createRouter, createWebHistory } from "vue-router";
import { getFromLS } from "../utils/localStorage";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../layouts/LoginPageLayout.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../layouts/RegisterPageLayout.vue"),
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("../layouts/ForgotPasswordPageLayout.vue"),
    },
    {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("../layouts/ResetPasswordPageLayout.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("../layouts/HomePageLayout.vue"),
        children: [
            {
                path: "gant-chart",
                name: "gant-chart",
                component: () => import("../pages/GantPage.vue"),
            },
            {
                path: "users",
                name: "users",
                component: () => import("../pages/UsersPage.vue"),
            },
            {
                path: "resources",
                name: "resources",
                component: () => import("../pages/ResourcesPage.vue"),
            },
            {
                path: "companies",
                name: "companies",
                component: () => import("../pages/CompaniesPage.vue"),
            },
            {
                path: "settings",
                name: "settings",
                component: () => import("../pages/SettingsPage.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     const token = getFromLS("token");
//     if (token || to.name === "login" || to.name === "forgot-password" || to.name === "reset-password") {
//         next();
//     } else {
//         next("/login");
//     }
// });

export default router;
