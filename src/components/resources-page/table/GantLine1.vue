<template>
    <div
        :id="item.id"
        :key="item.id"
        :style="{ left: item.startPoint * 80 + 'px', background: '#3b82f6', width: item.duration * 80 + 'px' }"
        class="absolute h-[20px] top-1/2 -translate-y-1/2 w-20 group rounded-full drop-shadow-md"
        :data-parent-id="item.id"
    ></div>
</template>

<script setup>
    import { toRefs } from "vue";
    const props = defineProps({ item: Object, index: Number });
    const { item } = toRefs(props);
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
