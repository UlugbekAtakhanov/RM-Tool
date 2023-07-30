<template>
    <div
        :key="item.id"
        :style="{ left: phase.startPoint * 80 + 'px', background: phase.color, width: phase.duration * 80 + 'px' }"
        class="absolute h-[20px] top-1/2 -translate-y-1/2 w-20 rounded-full border cursor-pointer"
        v-for="phase in item.phase"
        draggable="true"
        @dragstart="(e) => startDrag(e, phase)"
    ></div>
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
