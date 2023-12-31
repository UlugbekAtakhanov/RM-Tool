<!-- with weekends - approved currently -->
<template>
    <div class="flex-[2] shrink-0 overflow-x-scroll sticky top-0">
        <!-- days row -->
        <table class="bg-white rounded-r-md text-[10px] border-l">
            <thead>
                <tr class="border-b h-[33px] bg-purple-50">
                    <th
                        v-for="day in arrOfDays"
                        :key="day.id"
                        class="whitespace-nowrap border-r min-w-[80px] px-2"
                        :class="day.holiday ? 'bg-red-50' : day.isWeekends ? 'bg-sky-50' : ''"
                    >
                        {{ format(new Date(day.date), "EEE, dd MMM") }}
                    </th>
                </tr>
            </thead>
        </table>

        <!-- gant chart -->
        <div
            v-for="(item, parentIndex) in projectListComputed"
            :key="parentIndex"
            class="bg-white h-[33px] relative flex overflow-hidden hover:bg-sky-50 hover:border-"
            :style="{ width: arrOfDays.length * 80 + 'px' }"
        >
            <!-- drop zone -->
            <div
                @drop="(e) => onDrop(e, item, parentIndex)"
                @dragenter.prevent
                @dragover.prevent
                v-for="(day, index) in arrOfDays"
                :data-index="index"
                :key="index"
                class="w-[80px] text-xs border-l"
                :class="day.holiday ? 'bg-red-50' : day.isWeekends ? 'bg-sky-50' : ''"
                :projectList="projectList"
            ></div>
            <GantLine :item="item" :projectList="projectList" />
        </div>
    </div>

    <!-- <div class="fixed top-[310px] right-4 bg-slate-900 text-white p-1 rounded w-1/2 overflow-y-scroll h-[600px]">
        <pre>{{ JSON.stringify(projectList, null, 2) }}</pre>
    </div> -->
</template>

<script setup>
    import { format } from "date-fns";
    import { storeToRefs } from "pinia";
    import { computed } from "vue";
    import { useDateRangeStore } from "../../../store/dateRangeStore";
    import { useHolidaysListStore } from "../../../store/holidaysStore";
    import { daysInMilliseconds, daysWithWeekends } from "../../../utils/Days";
    import GantLine from "./GantLine.vue";
    import { useProjectListStore } from "../../../store/projectStore";

    const holidaysStore = useHolidaysListStore();
    const { holidaysList } = storeToRefs(holidaysStore);

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const projectListStore = useProjectListStore();
    const { modifiedProjectList: projectList } = storeToRefs(projectListStore);

    const computedHolidaysList = computed(() => {
        return holidaysList.value.map((item) => {
            const date = format(new Date(`${new Date().getFullYear()}-${item.month}-${item.day}`), "MMM dd, yyyy");
            return { ...item, key: item.id, date };
        });
    });

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        const days = daysWithWeekends(start, end);
        const holidays = computedHolidaysList.value.map((holiday) => new Date(holiday.date).getTime());
        return days.map((day) => ({ ...day, holiday: !day.isWeekends && holidays.includes(new Date(day.date).getTime()) }));
    });

    // modify project list giving new keys - startPoint, duration
    const projectListComputed = computed(() => {
        const newList = projectList.value.map((project) => {
            const newObj = {
                ...project,
                startPoint: (new Date(project.startDate) - new Date(startDate.value)) / daysInMilliseconds(1),
                duration: (new Date(project.endDate) - new Date(project.startDate)) / daysInMilliseconds(1),
            };
            return newObj;
        });
        return newList;
    });

    // on drop effect
    const onDrop = (e, el) => {
        const end = e.target.getBoundingClientRect().x;
        const start = parseInt(e.dataTransfer.getData("startPoint"));

        const width = parseInt(e.dataTransfer.getData("width"));

        const parentId = parseInt(e.dataTransfer.getData("parentId"));
        const parentIndex = projectList.value.findIndex((item) => item.id === parentId);

        const diff = Math.round((end - start) / 80 - parseInt(width / 80 / 2));

        el.startPoint = el.startPoint + diff;
        el.from = format(new Date(new Date(el.from).getTime() + daysInMilliseconds(diff)), "MMM dd, yyyy");
        el.to = format(new Date(new Date(el.to).getTime() + daysInMilliseconds(diff)), "MMM dd, yyyy");

        if (el.id === parentId) {
            const { startPoint, ...rest } = el;
            projectList.value[parentIndex] = rest;
        }
    };
</script>

<style scoped>
    ::-webkit-scrollbar {
        height: 10px;
    }
    ::-webkit-scrollbar-track {
        cursor: pointer;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: 30px;
    }
    ::-webkit-scrollbar-thumb {
        background: lightgray;
        width: 70%;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: gray;
    }
</style>
