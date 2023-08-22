<template>
    <div>
        <table class="bg-white text-xs border-b border-l">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px] bg-purple-50">
                    <th
                        v-for="day in arrOfDays"
                        class="whitespace-nowrap border-r min-w-[80px] px-2 text-[10px]"
                        :class="day.holiday ? 'bg-red-50' : day.isWeekends ? 'bg-sky-50' : ''"
                    >
                        {{ format(new Date(day.date), "EEE, dd MMM") }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in resourceListComputed" :key="item.id" class="hover:bg-sky-50 text-center group">
                    <td :colspan="arrOfDays.length" class="overflow-hidden">
                        <div class="bg-white group-hover:bg-sky-50" :style="{ width: arrOfDays.length * 80 + 'px' }">
                            <div v-for="(project, index) in item.projects" class="h-[33px] flex relative">
                                <div
                                    v-for="(day, index) in arrOfDays"
                                    :data-index="index"
                                    :key="index"
                                    class="border-r -translate-x-[1px] w-[80px] group-hover:bg-sky-50"
                                    :class="day.holiday ? 'bg-red-50' : day.isWeekends ? 'bg-sky-50' : ''"
                                ></div>
                                <Gantline1 :item="project" :index="index" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { useProjectListStore } from "../../../store/projectStore";
    import { useDateRangeStore } from "../../../store/dateRangeStore";
    import { storeToRefs } from "pinia";
    import { format } from "date-fns";
    import { daysWithWeekends, daysInMilliseconds } from "../../../utils/Days";
    import Gantline1 from "./GantLine1.vue";
    import { useHolidaysStore } from "../../../store/holidaysStore";

    const holidaysStore = useHolidaysStore();
    const { holidaysList } = storeToRefs(holidaysStore);

    const projectListStore = useProjectListStore();
    const { resourceList } = storeToRefs(projectListStore);

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        const days = daysWithWeekends(start, end);
        const holidays = holidaysList.value.map((holiday) => new Date(holiday.date).getTime());
        return days.map((day) => ({ ...day, holiday: !day.isWeekends && holidays.includes(new Date(day.date).getTime()) }));
    });

    // modify project list giving new keys - startPoint, duration
    const resourceListComputed = computed(() => {
        const newList = resourceList.value.map((project) => {
            const newProjects = project.projects.map((item) => {
                return {
                    ...item,
                    startPoint: (new Date(item.from) - new Date(startDate.value)) / daysInMilliseconds(1),
                    duration: (new Date(item.to) - new Date(item.from)) / daysInMilliseconds(1),
                };
            });
            return { ...project, projects: newProjects };
        });
        return newList;
    });
</script>
