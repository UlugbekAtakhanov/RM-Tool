<template>
    <div class="transition-all duration-300" :class="isOpen ? 'w-[500px]' : 'w-[140px]'">
        <table class="bg-white text-xs w-[500px]">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px]">
                    <th class="px-1 w-8 cursor-pointer" @click="isOpen = !isOpen">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="{1.5}"
                            stroke="currentColor"
                            class="w-4 mx-auto transition-all"
                            :class="isOpen ? 'rotate-0' : 'rotate-180'"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </th>
                    <th class="text-left">Project name</th>
                    <th>YE</th>
                    <th>Scope</th>
                    <th>Manager</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in projectList" :key="item.id" class="hover:bg-sky-50 border-b text-center h-[33px]">
                    <td class="text-xs">{{ index + 1 }}</td>
                    <td class="text-left w-[150px]">{{ item.title }}</td>
                    <td>{{ item.ye }}</td>
                    <td>{{ item.scope }}</td>
                    <td>{{ item.manager }}</td>
                    <td>{{ item.team.join() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useProjectListStore } from "../../../store/project";
    const { projectList: list } = useProjectListStore();
    const projectList = ref(list);

    const isOpen = ref(false);
</script>
