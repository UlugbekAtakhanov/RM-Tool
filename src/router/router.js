import { createRouter, createWebHistory } from "vue-router";
import { getFromLS } from "../utils/localStorage";

const token = getFromLS("token") ?? true;

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../layouts/LoginPageLayout.vue"),
        beforeEnter: async (to, from, next) => {
            if (token) {
                return next("/");
            }
            next();
        },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../layouts/RegisterPageLayout.vue"),
        beforeEnter: async (to, from, next) => {
            if (token) {
                return next("/");
            }
            next();
        },
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("../layouts/ForgotPasswordPageLayout.vue"),
        beforeEnter: async (to, from, next) => {
            if (token) {
                return next("/");
            }
            next();
        },
    },
    {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("../layouts/ResetPasswordPageLayout.vue"),
        beforeEnter: async (to, from, next) => {
            if (token) {
                return next("/");
            }
            next();
        },
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
                beforeEnter: async (to, from, next) => {
                    const userRole = getFromLS("userRole");
                    if (!["rm"].includes(userRole)) {
                        return next("/");
                    }
                    next();
                },
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
                beforeEnter: async (to, from, next) => {
                    const userRole = getFromLS("userRole");
                    if (!["rm"].includes(userRole)) {
                        return next("/");
                    }
                    next();
                },
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

router.beforeEach((to, from, next) => {
    if (token || to.name === "login" || to.name === "register" || to.name === "forgot-password" || to.name === "reset-password") {
        next();
    } else {
        next("/login");
    }
});

export default router;
