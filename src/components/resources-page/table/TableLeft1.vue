<template>
    <div class="transition-all duration-300" :class="isOpen ? 'w-[]' : 'w-[]'">
        <table class="bg-white text-xs border-b">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px]">
                    <th class="px-1 w-8 cursor-pointer" @click="isOpen = !isOpen">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="{1.5}"
                            stroke="currentColor"
                            class="w-4 mx-auto transition-all"
                            :class="isOpen ? 'rotate-0' : 'rotate-180'"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </th>
                    <th class="text-left pr-10">Resource name</th>
                    <th class="text-left pr-10">Position</th>
                    <th class="text-left pr-10">Coach</th>
                    <th class="text-left pr-10">Projects</th>
                    <th class="text-center border-r px-2">Hours</th>
                    <th
                        v-for="day in arrOfDays"
                        class="whitespace-nowrap border-r min-w-[80px] px-2 text-[10px]"
                        :class="day.isWeekends ? 'bg-sky-50' : ''"
                    >
                        {{ format(new Date(day.date), "dd-MMM-EEE") }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in resourceListComputed" :key="item.id" class="hover:bg-sky-50 divide-y text-center group">
                    <td class="text-xs align-top">{{ index + 1 }}</td>
                    <td class="text-left w-[150px] align-top">{{ item.name }}</td>

                    <td class="text-left w-[150px] align-top">{{ item.position }}</td>

                    <td class="text-left w-[150px] align-top">{{ item.coach }}</td>

                    <td class="text-left w-[150px]">
                        <div v-for="project in item.projects" :key="project.id" class="h-[33px]">
                            {{ project.name }}
                        </div>
                    </td>

                    <td class="text-left w-[150px] border-r">
                        <div v-for="project in item.projects" :key="project.id" class="h-[33px] text-center">
                            {{ project.hours }}
                        </div>
                    </td>

                    <td :colspan="arrOfDays.length">
                        <div class="bg-white group-hover:bg-sky-50" :style="{ width: arrOfDays.length * 80 + 'px' }">
                            <div v-for="(project, index) in item.projects" class="h-[33px] flex relative">
                                <div
                                    v-for="(day, index) in arrOfDays"
                                    :data-index="index"
                                    :key="index"
                                    class="border-r -translate-x-[1px] w-[80px] group-hover:bg-sky-50"
                                    :class="day.isWeekends ? 'bg-sky-50' : ''"
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

    const { resourceList: list } = useProjectListStore();
    const resourceList = ref(list);

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        return daysWithWeekends(start, end);
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

    const isOpen = ref(false);
</script>
