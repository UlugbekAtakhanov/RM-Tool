<template>
    <div class="bg-white w-2/3 mx-auto mt-20 rounded-lg border border-sky-100 shadow p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new company</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <n-form-item label="Company name" label-style="font-weight: 600" path="name">
                <n-input v-model:value="formValue.name" placeholder="Company name" />
            </n-form-item>

            <n-form-item label="Email" label-style="font-weight: 600" path="email">
                <n-input v-model:value="formValue.email" placeholder="Email" />
            </n-form-item>

            <n-form-item label="Address" label-style="font-weight: 600" path="address">
                <n-input v-model:value="formValue.address" placeholder="Address" />
            </n-form-item>

            <n-form-item label="Phone" label-style="font-weight: 600" path="phone">
                <n-input v-model:value="formValue.phone" placeholder="Phone" />
            </n-form-item>

            <n-form-item label="Contact First Name" label-style="font-weight: 600" path="contactFirstName">
                <n-input v-model:value="formValue.contactFirstName" placeholder="Contact First Name" />
            </n-form-item>

            <n-form-item label="Contact Last Name" label-style="font-weight: 600" path="contactLastName">
                <n-input v-model:value="formValue.contactLastName" placeholder="Contact Last Name" />
            </n-form-item>

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <div class="flex justify-center">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useMessage } from "naive-ui";

    const formRef = ref(null);
    const message = useMessage();
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
            if (!errors) {
                message.success("Submitted successfully!");
            } else {
                console.log(errors);
                message.error("Fill the fields correctly!");
            }
        });
    }
</script>
