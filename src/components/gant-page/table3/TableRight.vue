<template>
    <div class="flex-[2] shrink-0 overflow-x-scroll sticky top-0">
        <!-- days row -->
        <table class="bg-white rounded-r-md text-xs border-l">
            <thead>
                <tr class="border-b h-[33px] bg-purple-50">
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
                @drop="(e) => onDrop(e, item)"
                @dragenter.prevent
                @dragover.prevent
                v-for="(day, index) in arrOfDays"
                :data-dropped-date="day.date"
                :data-index="index"
                :key="index"
                class="w-[80px] text-xs border-l"
                :projectList="projectList"
            ></div>
            <GantLine :item="item" :projectList="projectList" />
        </div>
    </div>

    <div class="fixed top-[400px] right-4 bg-slate-900 text-white p-1 rounded w-1/2 overflow-y-scroll h-[600px]">
        <pre>{{ JSON.stringify(projectList, null, 2) }}</pre>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { format, isWeekend } from "date-fns";
    import { daysWithWeekends, daysWithoutWeekends, daysInMilliseconds } from "../../../utils/Days";
    import { useDateRangeStore } from "../../../store/dateRangeStore";
    import { useProjectListStore } from "../../../store/projectStore";
    import GantLine from "./GantLine.vue";

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const { projectList: list } = useProjectListStore();
    const projectList = ref(list);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        return daysWithoutWeekends(start, end);
    });

    // modify project list giving new keys - startPoint, duration
    const projectListComputed = computed(() => {
        const newList = projectList.value.map((project) => {
            const fromStartDate = format(new Date(startDate.value), "yyyy-MM-dd");
            const fromStartPoint = format(new Date(project.from), "yyyy-MM-dd");
            const toEndPoint = format(new Date(project.to), "yyyy-MM-dd");

            const daysListFromStart = daysWithWeekends(fromStartDate, fromStartPoint);
            const weekendsAmountFromDateStartToStartPoint = daysListFromStart.filter((item) => item.isWeekends).length;

            const daysListFromStartPoint = daysWithWeekends(fromStartPoint, toEndPoint);
            const weekendsAmountFromStartPointToEndPoint = daysListFromStartPoint.filter((item) => item.isWeekends).length;

            const newObj = {
                ...project,
                startPoint: (new Date(project.from) - new Date(startDate.value)) / daysInMilliseconds(1) - weekendsAmountFromDateStartToStartPoint,
                duration: (new Date(project.to) - new Date(project.from)) / daysInMilliseconds(1) - weekendsAmountFromStartPointToEndPoint,
            };
            return newObj;
        });
        return newList;
    });

    // on drop effect
    const onDrop = (e, el) => {
        const droppedDate = e.target.dataset.droppedDate;
        const step = Math.floor(el.duration / 2);
        let backDateIsWeekend = isWeekend(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step)));

        if (backDateIsWeekend) {
            const backDateIsWeekend = isWeekend(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step + 1)));
            if (backDateIsWeekend) {
                el.from = format(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step + 2)), "MMM dd, yyyy");
            } else {
                el.from = format(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step + step)), "MMM dd, yyyy");
            }
        } else {
            el.from = format(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step)), "MMM dd, yyyy");
        }

        const currentStartPoint = format(new Date(el.from), "yyyy-MM-dd");
        const currentEndPoint = format(new Date(new Date(el.from).getTime() + daysInMilliseconds(el.duration)), "yyyy-MM-dd");

        const daysList = daysWithWeekends(currentStartPoint, currentEndPoint);
        const weekendsAmountFromCurrentStartPointToCurrentEndPoint = daysList.filter((item) => item.isWeekends).length;
        el.to = format(
            new Date(
                new Date(currentEndPoint).getTime() +
                    daysInMilliseconds(
                        weekendsAmountFromCurrentStartPointToCurrentEndPoint === 1 ? 2 : weekendsAmountFromCurrentStartPointToCurrentEndPoint
                    )
            ),
            "MMM dd, yyyy"
        );

        // const weekendsAmountFromDateStartToStartPoint = daysListFromStart.filter((item) => item.isWeekends).length;
        // console.log(daysListFromStart);

        // const end = e.target.getBoundingClientRect().x;
        // const start = parseInt(e.dataTransfer.getData("startPoint"));

        // const width = parseInt(e.dataTransfer.getData("width"));

        // console.log(el.startPoint);
        // el.from = format(new Date(new Date(droppedDate).getTime() - daysInMilliseconds(step)), "MMM dd, yyyy");
        // el.to = format(new Date(new Date(el.from).getTime() + daysInMilliseconds(el.duration)), "MMM dd, yyyy");

        // const diff = Math.round((end - start) / 80 - parseInt(width / 80 / 2));
        // el.startPoint = el.startPoint + diff;
        // el.from = format(new Date(new Date(el.from).getTime() + daysInMilliseconds(diff)), "MMM dd, yyyy");
        // el.to = format(new Date(new Date(el.to).getTime() + daysInMilliseconds(diff)), "MMM dd, yyyy");

        // console.log(el.from);
        // console.log(el.to);

        const parentId = parseInt(e.dataTransfer.getData("parentId"));
        const parentIndex = projectList.value.findIndex((item) => item.id === parentId);

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
