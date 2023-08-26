<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add holiday</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <FormInput label="Holiday name" v-model:value="formValue.name" path="name" placeholder="Holiday name" />

            <FormDatePicker label="Date" v-model:value="formValue.date" path="date" placeholder="Date" />

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button :disabled="isLoading" type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <div class="flex justify-center">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useLoadingBar, useMessage } from "naive-ui";
    import FormInput from "./FormInput.vue";
    import FormDatePicker from "./FormDatePicker.vue";
    import { useAddHolidayData } from "../../hooks/useHolidaysHooks";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const { isLoading, mutate } = useAddHolidayData({ message, loadingBar });

    const formRef = ref(null);
    const formValue = ref({
        name: "",
        date: null,
    });

    const rules = {
        name: {
            required: true,
            message: "Please provide company name",
            trigger: ["blur", "input"],
        },
        date: {
            required: true,
            validator(rule, value) {
                if (!value) {
                    return new Error("Please provide date.");
                }
                return true;
            },
            trigger: ["blur", "input"],
        },
    };

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            loadingBar.start();
            mutate(formValue);
        });
    }
</script>
