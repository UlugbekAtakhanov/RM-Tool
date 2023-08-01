<template>
    <h1 class="text-2xl font-semibold text-center p-4">RM Tool</h1>
    <div class="px-4">
        <DatePicker />
        <div class="flex items-start">
            <TableLeft />
            <TableRight />
        </div>
    </div>
</template>

<script setup>
    import DatePicker from "../components/gant-page/DatePicker.vue";
    import TableLeft from "../components/gant-page/table/TableLeft.vue";
    import TableRight from "../components/gant-page/table/TableRight.vue";
    import { useDateRangeStore } from "../store/DateRange";

    const dateRangeStore = useDateRangeStore();
    dateRangeStore.initialDateRange();
</script>
