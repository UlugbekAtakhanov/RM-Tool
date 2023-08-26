<template>
    <div class="bg-white mx-auto rounded-lg">
        <h1 class="text-2xl text-center font-semibold mb-8">Add new project</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <FormInput label="Project name" v-model:value="formValue.name" path="name" placeholder="Project name" />

            <FormSelect label="Project type" v-model:value="formValue.type" path="type" :options="projectTypeOptions" />

            <FormDatePicker label="Year end" v-model:value="formValue.ye" path="ye" placeholder="Year end" />

            <FormSelect label="Company" v-model:value="formValue.company" path="company" :options="companyOptions" />

            <FormSelect label="Partner" v-model:value="formValue.partner" path="partner" :options="companyOptions" />

            <FormSelect label="Quality Review Partner (QRP)" v-model:value="formValue.qrp" path="qrp" :options="companyOptions" />

            <FormSelect label="Director" v-model:value="formValue.director" path="director" :options="companyOptions" />

            <FormSelect label="Manager" v-model:value="formValue.manager" path="manager" :options="companyOptions" />

            <FormSelect label="Team keys" v-model:value="formValue.teamKeys" path="teamKeys" :options="companyOptions" :multiple="true" />

            <n-form-item label="Range" label-style="font-weight: 600" path="range">
                <n-date-picker
                    v-model:value="formValue.range"
                    type="daterange"
                    clearable
                    @keydown.enter.prevent
                    update-value-on-close
                    :actions="null"
                    class="w-full"
                />
            </n-form-item>

            <!-- <n-form-item label="Color" label-style="font-weight: 600" path="color">
                <n-color-picker v-model:value="formValue.color" :actions="['clear']" />
            </n-form-item> -->

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button :disabled="isLoading" type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <div class="flex justify-center bg-white">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useLoadingBar, useMessage } from "naive-ui";
    import { millisecondsInDays } from "../../utils/Days";
    import FormInput from "./FormInput.vue";
    import FormSelect from "./FormSelect.vue";
    import FormDatePicker from "./FormDatePicker.vue";
    import { useAddProjectData } from "../../hooks/useProjectsHooks";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const { isLoading, mutate } = useAddProjectData({ message, loadingBar });

    const formRef = ref(null);
    const formValue = ref({
        name: "",
        type: "",
        ye: null,
        company: "",
        partner: "",
        qrp: "",
        director: "",
        manager: "",
        teamKeys: [], // this may cause trouble
        range: null,
        // color: "",
    });

    const projectTypeOptions = [
        {
            label: "Audit",
            value: "audit",
        },
        {
            label: "Review",
            value: "review",
        },
        {
            label: "Other",
            value: "other",
        },
    ];

    const companyOptions = [
        {
            label: "Company1",
            value: "song0",
            disabled: true,
        },
        {
            label: "Company2",
            value: "song1",
        },
        {
            label: "Company3",
            value: "song2",
        },
    ];

    const rules = {
        name: {
            required: true,
            message: "Please provide a project name.",
            trigger: ["blur", "input"],
        },
        type: {
            required: true,
            message: "Please provide a project type.",
            trigger: ["blur", "input"],
        },
        ye: {
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
            message: "Choose a company.",
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
            message: "Please provide a manager name.",
            trigger: ["blur", "input"],
        },
        teamKeys: {
            required: true,
            validator(rule, value) {
                if (!value.length) {
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
        // color: {
        //     required: true,
        //     validator(rule, value) {
        //         if (!value) {
        //             return new Error("Choose color for project.");
        //         }
        //         return true;
        //     },
        //     trigger: ["blur", "input"],
        // },
    };

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            const startDate = formValue.value.range[0];
            const endDate = formValue.value.range[1];
            const duration = millisecondsInDays(endDate) - millisecondsInDays(startDate);
            const color = formValue.value.type === "audit" ? "#0ea5e9" : formValue.value.type === "review" ? "#e11d48" : "#16a34a";
            const data = { ...formValue.value, startDate, endDate, duration, color };
            const { range, ...rest } = data;
            loadingBar.start();
            mutate(rest);
        });
    }
</script>
