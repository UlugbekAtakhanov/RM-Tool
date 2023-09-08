<template>
    <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Resources</h1>
    <div>
        <div class="flex justify-end items-end mb-2 px-2">
            <DatePicker />
        </div>

        <div v-show="projectIsLoading" class="p-2 font-semibold">Loading...</div>
        <div v-show="!projectIsLoading" class="flex items-start">
            <TableLeft1 />
            <TableRight1 />
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import DatePicker from "../components/resources-page/DatePicker.vue";
    import TableLeft1 from "../components/resources-page/table/TableLeft1.vue";
    import TableRight1 from "../components/resources-page/table/TableRight1.vue";
    import { useProjectListStore } from "../store/projectStore";

    const projectListStore = useProjectListStore();
    const { projectIsLoading } = storeToRefs(projectListStore);
</script>
