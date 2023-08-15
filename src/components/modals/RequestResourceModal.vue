<template>
    <n-modal :value="isModalOpen" @input="$emit('update:isModalOpen', $event.target.value)">
        <n-card style="width: 75%" :bordered="false" role="dialog" aria-modal="true">
            <slot />
        </n-card>
    </n-modal>
</template>

<script setup>
    defineProps({ isModalOpen: Boolean, isModalOpen: Boolean });
</script>
