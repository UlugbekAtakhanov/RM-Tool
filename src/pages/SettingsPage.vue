<template>
    <div class="flex">
        <div class="flex-1 p-4">
            <HolidaysList />
            <div id="children1" class="h-[500px]">Setting 1</div>
            <div id="children2" class="h-[500px]">Setting 2</div>
            <div id="children3" class="h-[500px]">Setting 3</div>
            <div id="children4" class="h-[500px]">Setting 4</div>
            <div id="children5" class="h-[500px]">Setting 5</div>
            <div id="api" class="h-[500px]">API</div>
        </div>
        <div class="w-1/6">
            <div class="sticky top-0">
                <Anchor />
            </div>
        </div>
    </div>
</template>

<script setup>
    import HolidaysList from "../components/settings-page/HolidaysList.vue";
    import Anchor from "../components/settings-page/Anchor.vue";
</script>
