<template>
    <div class="w-full bg-white/80 backdrop-blur-xl text-sm font-semibold p-4 flex items-center gap-4">
        <RouterLink :to="{ name: 'home' }" class="text-2xl !text-primary !no-underline">RM Tool</RouterLink>

        <div class="ml-auto divide-x-[1px] flex items-center">
            <div class="px-4">
                <n-badge class="cursor-pointer group" value="1" color="#38bdf8" :max="10" :offset="[-5, 3]">
                    <n-avatar class="!bg-transparent">
                        <n-icon> <i class="fa-solid fa-bell text-gray-400 text-2xl group-hover:text-gray-500"></i> </n-icon>
                    </n-avatar>
                </n-badge>
            </div>

            <!-- dropdown -->
            <div>
                <n-dropdown trigger="click" :options="options" @select="handleSelect">
                    <n-button quaternary>
                        <n-avatar round size="small" src="" />
                    </n-button>
                </n-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { LockClosedOutline } from "@vicons/ionicons5";
    import { NIcon, useMessage } from "naive-ui";
    import { h } from "vue";
    import { RouterLink, useRouter } from "vue-router";
    import { clearLS } from "../utils/localStorage";

    const router = useRouter();
    const message = useMessage();

    const options = [
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

    const handleSelect = (key) => {
        if (key === "logout") {
            clearLS();
            router.push({ name: "login" });
            message.error("Logged out");
        }
    };
</script>

<style scoped>
    .router-link-active.router-link-exact-active {
        color: #672cc7;
        text-decoration: underline;
    }
</style>
