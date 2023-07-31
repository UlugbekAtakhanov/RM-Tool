<template>
    <table class="bg-white flex-1 shrink-0 rounded-l-md text-xs">
        <thead>
            <tr class="border-b whitespace-nowrap h-[33px]">
                <th class="px-1">#</th>
                <th class="text-left">Project name</th>
                <th>YE</th>
                <th>Scope</th>
                <th>Manager</th>
                <th>Team</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in projectList" :key="item.id" class="hover:bg-sky-50 text-center h-[33px]">
                <td class="text-xs">{{ index + 1 }}</td>
                <td class="text-left">{{ item.title }}</td>
                <td>{{ item.ye }}</td>
                <td>{{ item.scope }}</td>
                <td>{{ item.manager }}</td>
                <td>{{ item.team.join() }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { ref } from "vue";
    import data from "../../data/auditor.json";
    const projectList = ref(data);
</script>
