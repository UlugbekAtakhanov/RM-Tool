<template>
    <div class="w-[300px]">
        <n-date-picker v-model:value="dateValue" update-value-on-close type="daterange" :format="format" />
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from "vue";
    import { storeToRefs } from "pinia";
    import { useDateRangeStore } from "../../store/dateRangeStore";
    import { useProjectListStore } from "../../store/projectStore";

    const format = "MMM dd, yyyy";
    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);
    const dateValue = ref([startDate.value, endDate.value]);

    const projectListStore = useProjectListStore();
    const { getResourcesWithProjects } = projectListStore;

    onMounted(() => getResourcesWithProjects({ startDate: startDate.value, endDate: endDate.value }));

    watch(dateValue, () => {
        dateRangeStore.updateDateRange({ startDate: dateValue.value[0], endDate: dateValue.value[1] });
        getResourcesWithProjects({ startDate: startDate.value, endDate: endDate.value });
    });
</script>
