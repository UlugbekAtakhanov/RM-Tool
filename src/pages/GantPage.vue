<template>
    <h1 class="text-2xl font-semibold text-center p-4">RM Tool</h1>
    <div>
        <DatePicker />
        <div class="flex items-start">
            <TableLeft />
            <TableRight2 />
        </div>
    </div>
</template>

<script setup>
    import DatePicker from "../components/gant-page/DatePicker.vue";
    import TableLeft from "../components/gant-page/table/TableLeft.vue";
    import TableRight1 from "../components/gant-page/table/TableRight1.vue";
import TableRight2 from "../components/gant-page/table/TableRight2.vue";
    import { useDateRangeStore } from "../store/DateRange";

    const dateRangeStore = useDateRangeStore();
    dateRangeStore.initialDateRange();
</script>
