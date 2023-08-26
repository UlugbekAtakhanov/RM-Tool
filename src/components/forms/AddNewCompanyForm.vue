<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new company</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <FormInput label="Company name" v-model:value="formValue.name" path="name" placeholder="Company name" />

            <FormInput label="Email" v-model:value="formValue.email" path="email" placeholder="Email" />

            <FormInput label="Address" v-model:value="formValue.address" path="address" placeholder="Address" />

            <FormInput label="Phone" v-model:value="formValue.phone" path="phone" placeholder="Phone" />

            <FormInput label="Contact First Name" v-model:value="formValue.contactFirstName" path="contactFirstName" placeholder="Contact First Name" />

            <FormInput label="Contact Last Name" v-model:value="formValue.contactLastName" path="contactLastName" placeholder="Contact Last Name" />

            <!-- submit button -->
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
    import { useAddCompanyData } from "../../hooks/useCompaniesHooks";
    import FormInput from "./FormInput.vue";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const { isLoading, mutate } = useAddCompanyData({ message, loadingBar });

    const formRef = ref(null);
    const formValue = ref({
        name: "",
        address: "",
        phone: "",
        contactFirstName: "",
        contactLastName: "",
        email: "",
    });

    const rules = {
        name: {
            required: true,
            message: "Please provide company name",
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
