<template>
    <div class="w-[300px] ml-auto mb-2">
        <VueTailwindDatepicker
            placeholder="from ... to ..."
            :formatter="formatter"
            separator=" - "
            overlay
            v-model="dateValue"
            class="font-semibold text-xs"
        />
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import VueTailwindDatepicker from "vue-tailwind-datepicker";
    import { storeToRefs } from "pinia";
    import { useDateRangeStore } from "../../store/DateRange";

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const dateValue = ref({
        startDate: startDate.value,
        endDate: endDate.value,
    });

    watch(dateValue, () => {
        dateRangeStore.updateDateRange(dateValue.value);
    });

    const formatter = ref({
        date: "DD MMM YYYY",
        month: "MMM",
    });
</script>
