<template>
    <n-form-item :label="label" label-style="font-weight: 600" :path="path">
        <n-select type="select" @update:value="onChange" :options="options" :multiple="multiple" />
    </n-form-item>
</template>

<script setup>
    defineProps({
        label: { type: String, required: true, default: "" },
        path: { type: String, required: true, default: "" },
        options: { type: Array, required: true, default: [] },
        multiple: { type: Boolean, required: false, default: false },
    });

    const emit = defineEmits(["update:value"]);

    const onChange = (value) => {
        emit("update:value", value);
    };
</script>
