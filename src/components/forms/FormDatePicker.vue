<template>
    <n-form-item :label="label" label-style="font-weight: 600" :path="path">
        <n-date-picker @update:value="onChange" class="w-full" type="date" clearable @keydown.enter.prevent />
    </n-form-item>
</template>

<script setup>
    defineProps({
        label: String,
        path: String,
        placeholder: String,
    });

    const emit = defineEmits(["update:value"]);

    const onChange = (value) => {
        emit("update:value", value);
    };
</script>
