<template>
    <div class="flex-[2] shrink-0 overflow-x-scroll">
        <!-- days row -->
        <table class="bg-white rounded-r-md text-xs border-l">
            <thead>
                <tr class="border-b h-[33px]">
                    <th
                        v-for="day in arrOfDays"
                        :key="day.id"
                        class="whitespace-nowrap border-r min-w-[80px] px-2"
                        :class="day.isWeekends ? 'bg-slate-100' : ''"
                    >
                        {{ format(new Date(day.date), "dd-MMM") }}
                    </th>
                </tr>
            </thead>
        </table>

        <!-- gant chart -->
        <div
            v-for="(item, parentIndex) in resourceListComputed"
            :key="parentIndex"
            class="bg-white relative flex overflow-hidden"
            :style="{ width: arrOfDays.length * 80 + 'px' }"
        >
            <!-- class="bg-white h-[33px] relative flex overflow-hidden" -->
            <div
                v-for="(_, index) in arrOfDays"
                :data-index="index"
                :key="index"
                class="w-[80px] text-xs border-l"
                :resourceList="resourceList"
            ></div>
            <div v-for="(project, index) in item.projects" :style="{ height: item.projects.length * 33 + 'px' }">
                <GantLine :item="project" :index="index" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { format } from "date-fns";
    import { days, getAmountDay } from "../../../utils/Days";
    import GantLine from "./GantLine.vue";
    import { useDateRangeStore } from "../../../store/dateRangeStore";
    import { useProjectListStore } from "../../../store/projectStore";

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const { resourceList: list } = useProjectListStore();
    const resourceList = ref(list);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        return days(start, end);
    });

    // modify project list giving new keys - startPoint, duration
    const resourceListComputed = computed(() => {
        const newList = resourceList.value.map((project) => {
            const newProjects = project.projects.map((item) => {
                return {
                    ...item,
                    startPoint: (new Date(item.from) - new Date(startDate.value)) / getAmountDay(1),
                    duration: (new Date(item.to) - new Date(item.from)) / getAmountDay(1),
                };
            });
            return { ...project, projects: newProjects };
        });
        return newList;
    });
</script>
