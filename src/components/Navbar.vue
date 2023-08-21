<template>
    <div class="w-full text-sm font-semibold border-b p-4 flex items-center gap-4">
        <RouterLink :to="{ name: 'home' }" class="text-2xl text-primary !no-underline">RM Tool</RouterLink>
        <div class="flex items-center ml-12 gap-2">
            Assuming the user is:
            <n-select class="!w-[300px]" type="select" v-model:value="user" @update:value="selectHandler" size="small" :options="userOptions" />
        </div>
        <div class="ml-auto divide-x-[1px] flex items-center">
            <RouterLink class="px-4" :to="{ name: 'login' }">Login</RouterLink>
            <RouterLink class="px-4" :to="{ name: 'register' }">Register</RouterLink>
        </div>

        <n-badge class="cursor-pointer group" value="1" color="#0ea5e9" :max="10" :offset="[-5, 3]">
            <n-avatar class="!bg-transparent">
                <n-icon> <i class="fa-solid fa-bell text-gray-400 text-2xl group-hover:text-gray-500"></i> </n-icon>
            </n-avatar>
        </n-badge>

        <!-- dropdown -->
        <n-dropdown trigger="click" :options="options">
            <n-button quaternary>
                <n-avatar class="px-4" round size="small" src="" />
            </n-button>
        </n-dropdown>
    </div>
</template>

<script setup>
    import { h } from "vue";
    import { RouterLink } from "vue-router";
    import { useUserStore } from "../store/userStore";
    import { storeToRefs } from "pinia";
    import { NIcon } from "naive-ui";
    import { LockClosedOutline, SettingsOutline } from "@vicons/ionicons5";
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const selectHandler = (value) => {
        userStore.setUser(value);
    };

    const userOptions = [
        {
            label: "Administrator",
            value: "super-super-admin",
        },
        {
            label: "PKF Admin",
            value: "super-admin",
        },
        {
            label: "Client Admin",
            value: "admin",
        },
        {
            label: "Resource Manager",
            value: "rm",
        },
    ];

    const options = [
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "settings",
                        },
                    },
                    { default: () => "Settings" }
                ),
            icon() {
                return h(NIcon, null, {
                    default: () => h(SettingsOutline),
                });
            },
            key: "settings",
        },
        {
            type: "divider",
            key: "d1",
        },
        {
            label: "Log out",
            icon() {
                return h(NIcon, null, {
                    default: () => h(LockClosedOutline),
                });
            },
            key: "logout",
        },
    ];
</script>

<style scoped>
    .router-link-active.router-link-exact-active {
        color: #672cc7;
        text-decoration: underline;
    }
</style>
