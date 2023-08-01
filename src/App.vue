<template>
    <n-config-provider :theme="theme" :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides">
        <n-message-provider>
            <div class="pb-[500px]">
                <Navbar />
                <RouterView />
            </div>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
    import Navbar from "./components/Navbar.vue";
    import { RouterView } from "vue-router";
    import { NConfigProvider } from "naive-ui";

    const lightThemeOverrides = {
        common: {
            primaryColor: "rgb(14 ,165, 233)",
            primaryColorHover: "rgb(3, 105 ,161 )",
            primaryColorPressed: "rgb(14 ,165, 233)",
        },
    };
    const darkThemeOverrides = {
        common: {
            primaryColor: "#FFFFFF",
        },
    };
    const theme = null;
</script>
