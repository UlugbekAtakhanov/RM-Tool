<template>
    <div class="bg-white w-2/3 mx-auto mt-20 rounded-lg border border-sky-100 shadow p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new staff</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4 items-start">
            <n-form-item label="First name" label-style="font-weight: 600" path="firstName">
                <n-input v-model:value="formValue.firstName" placeholder="First name" />
            </n-form-item>

            <n-form-item label="Last name" label-style="font-weight: 600" path="lastName">
                <n-input v-model:value="formValue.lastName" placeholder="Last name" />
            </n-form-item>

            <n-form-item label="Line of service" label-style="font-weight: 600" path="lineOfService">
                <n-input v-model:value="formValue.lineOfService" placeholder="Line of service" />
            </n-form-item>

            <n-form-item label="Email" label-style="font-weight: 600" path="email">
                <n-input v-model:value="formValue.email" placeholder="Email" />
            </n-form-item>

            <n-form-item label="Type" label-style="font-weight: 600" path="type">
                <n-input v-model:value="formValue.type" placeholder="Type" />
            </n-form-item>

            <n-form-item label="Projects" label-style="font-weight: 600" class="col-span-2">
                <n-dynamic-input v-model:value="formValue.projects" #="{ index, value }" :on-create="onCreate">
                    <div style="display: flex; align-items: flex-start; width: 100%" class="gap-2">
                        <n-form-item ignore-path-change :show-label="false" :path="`projects[${index}].name`">
                            <n-input v-model:value="formValue.projects[index].name" placeholder="Name" @keydown.enter.prevent />
                        </n-form-item>

                        <n-date-picker
                            v-model:value="formValue.projects[index].range"
                            type="daterange"
                            clearable
                            @keydown.enter.prevent
                            update-value-on-close
                            :actions="null"
                            class="w-full"
                            :show-label="false"
                        />
                    </div>
                </n-dynamic-input>
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
        firstName: "",
        lastName: "",
        lineOfService: "",
        email: "",
        type: "",
        projects: [{ name: "", range: null }],
    });

    const rules = {
        firstName: {
            required: true,
            message: "Please provide firstname",
            trigger: ["blur", "input"],
        },
        lastName: {
            required: true,
            message: "Please provide lastname",
            trigger: ["blur", "input"],
        },
        lineOfService: {
            required: true,
            message: "Please provide line of service",
            trigger: ["blur", "input"],
        },
        email: {
            required: true,
            message: "Please provide email",
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

    const onCreate = () => ({ name: "", range: null });
</script>
