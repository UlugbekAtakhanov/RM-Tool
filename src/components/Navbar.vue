<template>
    <div class="w-full text-sm font-semibold border-b p-4 flex items-center gap-4">
        <h1 class="text-2xl text-primary">RM Tool</h1>
        <div class="ml-auto divide-x-[1px] flex items-center">
            <RouterLink class="px-4" :to="{ name: 'forms' }">Forms Page</RouterLink>
            <RouterLink class="px-4" :to="{ name: 'login' }">Login</RouterLink>
            <RouterLink class="px-4" :to="{ name: 'register' }">Register</RouterLink>
        </div>

        <n-badge class="cursor-pointer group" value="1" color="#0ea5e9" :max="10" :offset="[-5, 3]">
            <n-avatar class="!bg-transparent">
                <n-icon> <i class="fa-solid fa-bell text-gray-400 text-2xl group-hover:text-gray-500"></i> </n-icon>
            </n-avatar>
        </n-badge>
        <n-avatar class="px-4" round size="small" src="" />
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router";
</script>

<style scoped>
    .router-link-active.router-link-exact-active {
        color: #672cc7;
        text-decoration: underline;
    }
</style>
