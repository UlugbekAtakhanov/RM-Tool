<template>
    <div
        v-drag="{ axis: 'x' }"
        @v-drag-start="(e) => startDrag(e, item.phase)"
        @v-drag-end="(e) => endDrag(e, item.phase)"
        :id="item.phase.id"
        :key="item.phase.id"
        :style="{ left: item.phase.startPoint * 80 + 'px', background: item.phase.color, width: item.phase.duration * 80 + 'px' }"
        class="!resize-x !overflow-auto !absolute !z-0 h-[20px] top-1/2 -translate-y-1/2 w-20 group rounded-full drop-shadow-md cursor-pointer"
        ref="el"
        :data-parent-id="item.id"
    >
        <!-- @mouseup="onResize" -->
        <div
            class="group-hover:flex hidden bg-black/30 text-white w-[20px] !absolute top-0 right-0 cursor-ew-resize justify-center h-full items-center"
        >
            <i class="fa-solid fa-grip-vertical text-[10px]"></i>
        </div>
    </div>
</template>

<script setup>
    import { format } from "date-fns";
    import { ref, toRefs } from "vue";
    import { getAmountDay } from "../../../utils/Days";

    const el = ref([]);
    const props = defineProps({ item: Object, projectList: Array });
    const { item, projectList } = toRefs(props);
    const startPoint = ref(null);

    const startDrag = (e) => {
        startPoint.value = e.target.getBoundingClientRect().x;
    };
    const endDrag = (e, el) => {
        const end = e.target.getBoundingClientRect().x;
        const start = startPoint.value;

        const parentId = parseInt(e.target.dataset.parentId);
        const parentIndex = projectList.value.findIndex((item) => item.id === parentId);

        const diff = Math.round((end - start) / 80);

        el.startPoint = el.startPoint + diff;
        el.from = format(new Date(new Date(el.from).getTime() + getAmountDay(diff)), "MMM dd, yyyy");
        el.to = format(new Date(new Date(el.to).getTime() + getAmountDay(diff)), "MMM dd, yyyy");

        if (el) {
            const { startPoint, ...rest } = el;
            projectList.value[parentIndex].phase = rest;
        }
    };

    const onResize = (e) => {
        console.log("hello");
        const elementId = parseInt(e.target.id);
        const parentId = parseInt(e.target.dataset.parentId);

        const parentIndex = projectList.value.findIndex((item) => item.id === parentId);

        const elPrevWidth = projectList.value[parentIndex].phase.duration * 80;
        const elCurrentWidth = e.target.getBoundingClientRect().width;

        const data = projectList.value[parentIndex].phase;

        const diff = Math.ceil((elCurrentWidth - elPrevWidth) / 80);

        const newTo = format(new Date(new Date(data.to).getTime() + getAmountDay(diff)), "MMMM dd, yyyy");
        projectList.value[parentIndex].phase = { ...data, duration: data.duration + diff, to: newTo };
    };
</script>

<style scoped>
    ::-webkit-resizer {
        display: none;
    }
</style>
