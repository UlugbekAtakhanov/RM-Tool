<template>
    <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Resources</h1>
    <div>
        <div class="flex justify-end items-end mb-2 px-2">
            <DatePicker />
        </div>
        <div class="flex items-start">
            <TableLeft1 />
            <div class="flex items-start overflow-y-scroll">
                <TableRight1 />
            </div>
            <!-- <TableLeft /> -->
            <!-- <TableRight /> -->
        </div>
        <!-- <div class="flex items-start overflow-y-scroll"> -->
        <!-- <TableLeft1 /> -->
        <!-- <TableRight1 /> -->
        <!-- <TableLeft /> -->
        <!-- <TableRight /> -->
        <!-- </div> -->
    </div>
</template>

<script setup>
    // import TableLeft from "../components/resources-page/table/TableLeft.vue";
    // import TableRight from "../components/resources-page/table/TableRight.vue";
    import DatePicker from "../components/resources-page/DatePicker.vue";
    import TableLeft1 from "../components/resources-page/table/TableLeft1.vue";
    import TableRight1 from "../components/resources-page/table/TableRight1.vue";
</script>
