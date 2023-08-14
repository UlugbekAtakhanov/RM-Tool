<template>
    <n-space vertical class="overflow-y-scroll">
        <n-layout has-sider class="h-screen">
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="42"
                :width="240"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
            >
                <div class="h-full overflow-y-scroll">
                    <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="40" :collapsed-icon-size="18" :options="menuOptions" />
                </div>
            </n-layout-sider>
            <n-layout class="">
                <RouterView />
            </n-layout>
        </n-layout>
    </n-space>
</template>

<script setup>
    import { h, ref } from "vue";
    import { NIcon } from "naive-ui";
    import {
        PersonAddOutline,
        HomeOutline,
        BarChartOutline,
        LeafOutline,
        BookOutline as BookIcon,
        PersonOutline as PersonIcon,
        WineOutline as WineIcon,
    } from "@vicons/ionicons5";
    import { RouterLink } from "vue-router";

    function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) });
    }

    const menuOptions = [
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "home",
                        },
                    },
                    { default: () => "Home" }
                ),
            key: "home",
            icon: renderIcon(HomeOutline),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "gant-chart",
                        },
                    },
                    { default: () => "Dashboard" }
                ),
            key: "gant-chart",
            icon: renderIcon(BarChartOutline),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "companies",
                        },
                    },
                    { default: () => "Companies" }
                ),
            key: "companies",
            icon: renderIcon(LeafOutline),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "users",
                        },
                    },
                    { default: () => "Users" }
                ),
            key: "users",
            icon: renderIcon(PersonAddOutline),
        },
        {
            label: "Sth else",
            key: "pinball-1973",
            icon: renderIcon(BookIcon),
            // disabled: true,
            children: [
                {
                    label: () =>
                        h(
                            RouterLink,
                            {
                                to: {
                                    name: "gant-chart",
                                },
                            },
                            { default: () => "Audit" }
                        ),
                    key: "audit",
                },
                {
                    label: "Review",
                    key: "review",
                },
            ],
        },
        {
            label: "Sth else",
            key: "a-wild-sheep-chase",
            disabled: true,
            icon: renderIcon(BookIcon),
        },
        {
            label: "Sth else",
            key: "Dance Dance Dance",
            icon: renderIcon(BookIcon),
            children: [
                {
                    type: "group",
                    label: "People",
                    key: "people",
                    children: [
                        {
                            label: "Narrator",
                            key: "narrator",
                            icon: renderIcon(PersonIcon),
                        },
                        {
                            label: "Sheep Man",
                            key: "sheep-man",
                            icon: renderIcon(PersonIcon),
                        },
                    ],
                },
                {
                    label: "Beverage",
                    key: "beverage",
                    icon: renderIcon(WineIcon),
                    children: [
                        {
                            label: "Whisky",
                            key: "whisky",
                        },
                    ],
                },
                {
                    label: "Food",
                    key: "food",
                    children: [
                        {
                            label: "Sandwich",
                            key: "sandwich",
                        },
                    ],
                },
                {
                    label: "The past increases. The future recedes.",
                    key: "the-past-increases-the-future-recedes",
                },
            ],
        },
    ];

    const activeKey = ref(null);
    const collapsed = ref(true);
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 2px;
        border-radius: 100%;
    }

    ::-webkit-scrollbar-track {
        cursor: pointer;
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 30px;
        background: lightgray;
        width: 30%;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: gray;
    }
</style>
