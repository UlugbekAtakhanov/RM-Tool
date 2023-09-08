<template>
    <div class="h-screen grid grid-rows-[auto,1fr] overflow-hidden">
        <Navbar />
        <SideMenu />
    </div>
</template>

<script setup>
    import { useLoadingBar, useMessage } from "naive-ui";
    import Navbar from "../components/Navbar.vue";
    import SideMenu from "../components/SideMenu.vue";
    import { useHolidaysListStore } from "../store/holidaysStore";
    import { onMounted } from "vue";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const holidaysStore = useHolidaysListStore();
    const { getHolidays } = holidaysStore;

    onMounted(() => getHolidays({ message, loadingBar }));
</script>
