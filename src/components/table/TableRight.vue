<template>
    <div class="flex-[2] shrink-0 overflow-x-scroll">
        <!-- days row -->
        <table class="bg-white rounded-r-md text-xs border-l">
            <thead>
                <tr class="border-b h-[33px]">
                    <th v-for="day in arrOfDays" :key="day.id" class="whitespace-nowrap border-r min-w-[80px] px-2">
                        {{ format(new Date(day), "dd-MMM") }}
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
                @drop="(e) => onDrop(e, item.phase, parentIndex)"
                @dragenter.prevent
                @dragover.prevent
                v-for="(_, index) in arrOfDays"
                :data-index="index"
                :key="index"
                class="w-[80px] text-xs border-l"
            ></div>
            <GantLine :item="item" />
        </div>

        <div>
            <pre class="bg-slate-900 text-white">
                {{ JSON.stringify(projectList, null, 2) }}
            </pre>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from "vue";
    import data from "../../data/auditor.json";
    import { useDateRangeStore } from "../../store/DateRange";
    import { storeToRefs } from "pinia";
    import { format } from "date-fns";
    import { days, getAmountDay } from "../../utils/Days";
    import GantLine from "./GantLine.vue";

    const dateRangeStore = useDateRangeStore();
    const { startDate, endDate } = storeToRefs(dateRangeStore);

    const projectList = ref(data);

    // create arr of days
    const arrOfDays = computed(() => {
        const start = format(new Date(startDate.value), "yyyy-MM-dd");
        const end = format(new Date(endDate.value), "yyyy-MM-dd");
        return days(start, end);
    });

    // modify project list giving new keys - startPoint, duration
    const projectListComputed = computed(() => {
        const newList = projectList.value.map((project) => {
            const newPhase = project.phase.map((item) => {
                return {
                    ...item,
                    startPoint: (new Date(item.from) - new Date(startDate.value)) / getAmountDay(1),
                    duration: (new Date(item.to) - new Date(item.from)) / getAmountDay(1),
                };
            });
            return { ...project, phase: newPhase };
        });
        return newList;
    });

    const onDrop = (e, phases, parentIndex) => {
        const itemId = parseInt(e.dataTransfer.getData("itemId"));
        let el = phases.find((item) => item.id === itemId);
        const moveCell = parseInt(e.target.dataset.index);
        const prevStartPoint = el.startPoint;

        if (prevStartPoint < moveCell) {
            el.startPoint = moveCell - el.duration + 1;
            el.from = format(new Date(new Date(el.from).getTime() + getAmountDay(el.startPoint - prevStartPoint)), "MMM dd, yyyy");
            el.to = format(new Date(new Date(el.to).getTime() + getAmountDay(el.startPoint - prevStartPoint)), "MMM dd, yyyy");
        } else {
            el.startPoint = parseInt(moveCell);
            el.from = format(new Date(new Date(el.from).getTime() + getAmountDay(el.startPoint - prevStartPoint)), "MMM dd, yyyy");
            el.to = format(new Date(new Date(el.to).getTime() + getAmountDay(el.startPoint - prevStartPoint)), "MMM dd, yyyy");
        }

        const { startPoint, duration, ...rest } = el;
        let mutatingElementIndex = projectList.value[parentIndex].phase.findIndex((item) => item.id === itemId);
        projectList.value[parentIndex].phase[mutatingElementIndex] = rest;
    };
</script>
