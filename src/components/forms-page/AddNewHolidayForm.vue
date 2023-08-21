<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add holiday</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <n-form-item label="Holiday name" label-style="font-weight: 600" path="name">
                <n-input v-model:value="formValue.name" placeholder="Holiday name" />
            </n-form-item>

            <n-form-item label="Date" label-style="font-weight: 600" path="date">
                <n-date-picker v-model:value="formValue.date" type="date" class="w-full" />
            </n-form-item>

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <!-- <div class="flex justify-center">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div> -->
</template>

<script setup>
    import { ref } from "vue";
    import { useMessage } from "naive-ui";

    const formRef = ref(null);
    const message = useMessage();
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
            message: "Please provide date",
            trigger: ["blur", "input"],
        },
    };

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (!errors) {
                message.success("Submitted successfully!");
            } else {
                console.log(errors);
                message.error("Fill the fields correctly!");
            }
        });
    }
</script>
