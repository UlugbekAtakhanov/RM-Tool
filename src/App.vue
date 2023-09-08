<template>
    <n-config-provider :theme="theme" :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides">
        <n-message-provider>
            <n-loading-bar-provider>
                <n-dialog-provider>
                    <RouterView />
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </n-dialog-provider>
            </n-loading-bar-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
    import { NConfigProvider } from "naive-ui";
    import { useRouter } from "vue-router";
    import "./axios/global";
    import { globalRouter } from "./router/globalRouter";

    // configuring global router to use in axios interceptor
    const router = useRouter();
    globalRouter.router = router;

    const lightThemeOverrides = {
        common: {
            primaryColor: "#0369a1",
            primaryColorHover: "#075985",
            primaryColorPressed: "#0284c7",
            hoverColor: "#38bdf8",
            buttonColor2Hover: "#38bdf8",
            // primaryColor: "#672CC7",
            // primaryColorHover: "#471894",
            // primaryColorPressed: "#7d4dcc",
        },
    };

    const darkThemeOverrides = {
        common: {
            primaryColor: "#FFFFFF",
        },
    };

    const theme = null;
</script>
