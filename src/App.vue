<template>
    <n-config-provider :theme="theme" :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides">
        <n-message-provider>
            <n-dialog-provider>
                <RouterView />
            </n-dialog-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
    import { NConfigProvider } from "naive-ui";
    import axios from "axios";
    import { onMounted } from "vue";

    // onMounted(() => {
    //     const fetchData = async () => {
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
