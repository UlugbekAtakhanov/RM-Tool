<template>
    <div
        :id="item.phase.id"
        :key="item.phase.id"
        :style="{ left: item.phase.startPoint * 80 + 'px', background: item.phase.color, width: item.phase.duration * 80 + 'px' }"
        draggable="true"
        @dragstart="(e) => startDrag(e, item.phase)"
        @dragend="(e) => endDrag(e, item.phase)"
        class="resize-x group overflow-hidden absolute h-[20px] top-1/2 -translate-y-1/2 w-20 group rounded-full drop-shadow-md cursor-pointer"
        ref="el"
        :data-parent-id="item.id"
        @mouseup="(e) => onResize(e, item.phase.id)"
    >
        <div
            :style="{ left: item.phase.duration % 2 === 1 ? (item.phase.duration / 2) * 80 + 'px' : (item.phase.duration / 2) * 80 + 40 + 'px' }"
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/70 outline-black/70 w-1 h-1 rounded-full opacity-0 group-hover:opacity-80 outline outline-offset-1"
        ></div>
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
    const props = defineProps({ item: Object, projectList: Array });
    const { item, projectList } = toRefs(props);

    const startDrag = (e, item) => {
        const start = e.target.getBoundingClientRect().x;
        const width = e.target.getBoundingClientRect().width;
        e.target.classList.add("hide");
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("itemId", item.id);
        e.dataTransfer.setData("startPoint", start);
        e.dataTransfer.setData("width", width);
        e.dataTransfer.setData("parentId", parseInt(e.target.dataset.parentId));
    };

    const endDrag = (e) => {
        e.target.classList.remove("hide");
    };

    const onResize = (e, itemId) => {
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
    .hide {
        transition: 0.01s;
        transform: translateX(-9999px);
    }
</style>
