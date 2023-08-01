<template>
    <div class="bg-slate-950 text-white text-sm font-semibold p-4 flex gap-4">
        <RouterLink :to="{ name: 'gant-chart' }">Gant chart</RouterLink>
        <RouterLink :to="{ name: 'forms' }">Forms Page</RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router";
</script>

<style scoped>
    .router-link-active.router-link-exact-active {
        color: rgb(24, 160, 70);
        text-decoration: underline;
    }
</style>
