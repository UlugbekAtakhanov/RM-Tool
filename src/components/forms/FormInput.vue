<template>
    <n-form-item :label="label" label-style="font-weight: 600" :path="path">
        <n-input @input="onChange" :placeholder="placeholder" />
    </n-form-item>
</template>

<script setup>
    defineProps({
        label: { type: String, required: true, default: "" },
        path: { type: String, required: true, default: "" },
        placeholder: { type: String, required: true, default: "" },
    });

    const emit = defineEmits(["update:value"]);

    const onChange = (value) => {
        emit("update:value", value);
    };
</script>
