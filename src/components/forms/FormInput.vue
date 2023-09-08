<template>
    <n-form-item :label="label" label-style="font-weight: 600" :path="path">
        <n-input :type="type" @input="onChange" :placeholder="placeholder" />
    </n-form-item>
</template>

<script setup>
    const props = defineProps({
        type: { type: String, required: false, default: "text" },
        label: { type: String, required: true, default: "" },
        path: { type: String, required: true, default: "" },
        placeholder: { type: String, required: true, default: "" },
    });

    const emit = defineEmits(["update:value"]);

    const onChange = (value) => {
        emit("update:value", value);
    };
</script>
