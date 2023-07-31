<template>
    <div
        v-for="phase in item.phase"
        :key="item.id"
        :style="{ left: phase.startPoint * 80 + 'px', background: phase.color, width: phase.duration * 80 + 'px' }"
        draggable="true"
        @dragstart="(e) => startDrag(e, phase)"
        class="absolute h-[20px] top-1/2 -translate-y-1/2 w-20 group overflow-hidden rounded-full drop-shadow-md cursor-pointer"
    >
        <div
            class="group-hover:flex hidden bg-black/30 text-white w-[20px] absolute top-0 left-0 cursor-ew-resize justify-center h-full items-center"
        >
            <i class="fa-solid fa-grip-vertical text-[10px]"></i>
        </div>
        <div
            class="group-hover:flex hidden bg-black/30 text-white w-[20px] absolute top-0 right-0 cursor-ew-resize justify-center h-full items-center"
        >
            <i class="fa-solid fa-grip-vertical text-[10px]"></i>
        </div>
    </div>
</template>

<script setup>
    import { toRefs } from "vue";

    const props = defineProps({ item: Object });
    const { item } = toRefs(props);

    const startDrag = (e, item) => {
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("itemId", item.id);
    };
</script>
