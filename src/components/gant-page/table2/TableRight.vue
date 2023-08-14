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
            v-for="(item, parentIndex) in projectListComputed"
            :key="parentIndex"
            class="bg-white h-[33px] relative flex overflow-hidden"
            :style="{ width: arrOfDays.length * 80 + 'px' }"
        >
            <!-- drop zone -->
            <div
                @drop="(e) => onDrop(e, item, parentIndex)"
                @dragenter.prevent
                @dragover.prevent
                v-for="(_, index) in arrOfDays"
                :data-index="index"
                :key="index"
                class="w-[80px] text-xs border-l"
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
    import { computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { format } from "date-fns";
    import { days, getAmountDay } from "../../../utils/Days";
    import { useDateRangeStore } from "../../../store/DateRange";
    import { useProjectListStore } from "../../../store/project";
    import GantLine from "./GantLine.vue";

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const { projectList2: list } = useProjectListStore();
    const projectList = ref(list);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        return days(start, end);
    });

    // modify project list giving new keys - startPoint, duration
    const projectListComputed = computed(() => {
        const newList = projectList.value.map((project) => {
            const newObj = {
                ...project,
                startPoint: (new Date(project.from) - new Date(startDate.value)) / getAmountDay(1),
                duration: (new Date(project.to) - new Date(project.from)) / getAmountDay(1),
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
        el.from = format(new Date(new Date(el.from).getTime() + getAmountDay(diff)), "MMM dd, yyyy");
        el.to = format(new Date(new Date(el.to).getTime() + getAmountDay(diff)), "MMM dd, yyyy");

        if (el) {
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
