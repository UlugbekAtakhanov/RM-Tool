<template>
    <div
        v-for="phase in item.phase"
        :id="phase.id"
        :key="phase.id"
        :style="{ left: phase.startPoint * 80 + 'px', background: phase.color, width: phase.duration * 80 + 'px' }"
        draggable="true"
        @dragstart="(e) => startDrag(e, phase)"
        class="resize-x overflow-auto absolute h-[20px] top-1/2 -translate-y-1/2 w-20 group rounded-full drop-shadow-md cursor-pointer"
        ref="el"
        :data-parent-id="item.id"
        @mouseup="onResize"
    >
        <div
            class="group-hover:flex hidden bg-black/30 text-white w-[20px] absolute top-0 right-0 cursor-ew-resize justify-center h-full items-center"
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
    const props = defineProps({ item: Object, projectList: Array, parentIndex: Number });
    const { item, projectList } = toRefs(props);

    const startDrag = (e, item) => {
        console.log(e);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("itemId", item.id);
    };

    const onResize = (e) => {
        const elementId = parseInt(e.target.id);
        const parentId = parseInt(e.target.dataset.parentId);

        const parentIndex = projectList.value.findIndex((item) => item.id === parentId);
        const elementIndex = projectList.value[parentIndex].phase.findIndex((item) => item.id === elementId);

        const elPrevWidth = projectList.value[parentIndex].phase[elementIndex].duration * 80;
        const elCurrentWidth = e.target.getBoundingClientRect().width;

        const data = projectList.value[parentIndex].phase[elementIndex];

        const diff = Math.ceil((elCurrentWidth - elPrevWidth) / 80);

        const newTo = format(new Date(new Date(data.to).getTime() + getAmountDay(diff)), "MMMM dd, yyyy");
        projectList.value[parentIndex].phase[elementIndex] = { ...data, duration: data.duration + diff, to: newTo };
    };
</script>

<style scoped>
    ::-webkit-resizer {
        display: none;
    }
</style>
