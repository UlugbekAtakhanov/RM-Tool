<template>
    <n-config-provider :theme="theme" :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides">
        <n-message-provider>
            <n-loading-bar-provider>
                <n-dialog-provider>
                    <RouterView />
                </n-dialog-provider>
            </n-loading-bar-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
    import { NConfigProvider } from "naive-ui";
    import "./axios/global";
    import { globalRouter } from "./router/globalRouter";
    import { useRouter } from "vue-router";
    import { onMounted } from "vue";
    import { addToLS } from "./utils/localStorage";

    // must be deleted in future
    onMounted(() => addToLS("userRole", "super-super-admin"));

    // configuring global router to use in axios interceptor
    const router = useRouter();
    globalRouter.router = router;

    // onMounted(() => {
    //     const fetchData = async () => {
    //         onMounted;
    //         try {
    //             const data = await axios.get("/products");
    //             console.log(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchData();
    // });

    const lightThemeOverrides = {
        common: {
            primaryColor: "#672CC7",
            primaryColorHover: "#471894",
            primaryColorPressed: "#7d4dcc",
        },
    };

    const darkThemeOverrides = {
        common: {
            primaryColor: "#FFFFFF",
        },
    };

    const theme = null;
</script>
