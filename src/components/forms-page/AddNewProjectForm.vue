<template>
    <div class="bg-white w-2/3 mx-auto mt-20 rounded-lg border border-sky-100 shadow p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new project</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <n-form-item label="Project name" label-style="font-weight: 600" path="name">
                <n-input v-model:value="formValue.name" placeholder="Project name" />
            </n-form-item>

            <n-form-item label="Fiscal Year" label-style="font-weight: 600" path="fiscalYear">
                <n-date-picker v-model:value="formValue.fiscalYear" class="w-full" type="year" clearable @keydown.enter.prevent />
            </n-form-item>

            <n-form-item label="Company " label-style="font-weight: 600" path="company">
                <n-input v-model:value="formValue.company" placeholder="Company " />
            </n-form-item>

            <n-form-item label="Partner " label-style="font-weight: 600" path="partner">
                <n-input v-model:value="formValue.partner" placeholder="Partner " />
            </n-form-item>

            <n-form-item label="Quality Review Partner (QRP) " label-style="font-weight: 600" path="qrp">
                <n-input v-model:value="formValue.qrp" placeholder="Quality Review Partner (QRP) " />
            </n-form-item>

            <n-form-item label="Director " label-style="font-weight: 600" path="director">
                <n-input v-model:value="formValue.director" placeholder="Director " />
            </n-form-item>

            <n-form-item label="Manager " label-style="font-weight: 600" path="manager">
                <n-input v-model:value="formValue.manager" placeholder="Manager " />
            </n-form-item>

            <n-form-item label="Team " label-style="font-weight: 600" path="team">
                <n-select v-model:value="formValue.team" multiple :options="options" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item label="Range" label-style="font-weight: 600" path="range">
                <n-date-picker
                    v-model:value="formValue.range"
                    type="daterange"
                    clearable
                    @keydown.enter.prevent
                    update-value-on-close
                    :actions="null"
                />
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
        fiscalYear: null,
        company: "",
        partner: "",
        qrp: "",
        director: "",
        manager: "",
        team: [],
        range: null,
    });

    const options = [
        {
            label: "Everybody's Got Something to Hide Except Me and My Monkey",
            value: "song0",
            disabled: true,
        },
        {
            label: "Drive My Car",
            value: "song1",
        },
        {
            label: "Norwegian Wood",
            value: "song2",
        },
    ];

    const rules = {
        name: {
            required: true,
            message: "Please provide a project name.",
            trigger: ["blur", "input"],
        },
        fiscalYear: {
            required: true,
            validator(rule, value) {
                if (!value) {
                    return new Error("Please provide fiscal year.");
                }
                return true;
            },
            trigger: ["blur", "input"],
        },
        company: {
            required: true,
            message: "Please provide a company.",
            trigger: ["blur", "input"],
        },
        partner: {
            required: true,
            message: "Please provide a partner.",
            trigger: ["blur", "input"],
        },
        qrp: {
            required: true,
            message: "Please provide a Quality Review Partner (QRP).",
            trigger: ["blur", "input"],
        },
        manager: {
            required: true,
            message: "Please provide a manager.",
            trigger: ["blur", "input"],
        },
        team: {
            required: true,
            validator(rule, value) {
                console.log(rule);
                if (!value) {
                    return new Error("Choose team members.");
                }
                return true;
            },
            trigger: ["blur", "input"],
        },
        range: {
            required: true,
            validator(rule, value) {
                if (!value) {
                    return new Error("Choose range of date.");
                }
                return true;
            },
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
