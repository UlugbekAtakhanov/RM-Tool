<template>
    <div
        :id="item.id"
        :key="item.id"
        :style="{ left: item.startPoint * 80 + 'px', top: index * 33 + 'px', background: item.color, width: item.duration * 80 + 'px' }"
        class="absolute h-[20px] w-20 group rounded-full drop-shadow-md leading-4"
        :data-parent-id="item.id"
    ></div>
    <!-- class="absolute h-[20px] top-1/2 -translate-y-1/2 w-20 group rounded-full drop-shadow-md" -->
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
