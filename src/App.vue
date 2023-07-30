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
    import TableLeft from "./components/table/TableLeft.vue";
    import TableRight from "./components/table/TableRight.vue";
    import DatePicker from "./components/DatePicker.vue";
    import { useDateRangeStore } from "./store/DateRange";

    const dateRangeStore = useDateRangeStore();
    dateRangeStore.initialDateRange();
</script>
