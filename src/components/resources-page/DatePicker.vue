<template>
    <div class="w-[300px]">
        <n-date-picker v-model:value="dateValue" update-value-on-close type="daterange" :format="format" />
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { storeToRefs } from "pinia";
    import { useDateRangeStore } from "../../store/dateRangeStore";

    const format = "MMM dd, yyyy";
    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);
    const dateValue = ref([startDate.value, endDate.value]);

    watch(dateValue, () => {
        dateRangeStore.updateDateRange({ startDate: dateValue.value[0], endDate: dateValue.value[1] });
    });
</script>
