<template>
    <div class="bg-white mx-auto rounded-lg">
        <h1 class="text-2xl text-center font-semibold mb-8">Add new project</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <n-form-item label="Project name" label-style="font-weight: 600" path="name">
                <n-input v-model:value="formValue.name" placeholder="Project name" />
            </n-form-item>

            <n-form-item label="Project type" label-style="font-weight: 600" path="type">
                <n-select type="select" v-model:value="formValue.company" :options="projectTypeOptions" />
            </n-form-item>

            <n-form-item label="Fiscal Year" label-style="font-weight: 600" path="fiscalYear">
                <n-date-picker v-model:value="formValue.fiscalYear" class="w-full" type="year" clearable @keydown.enter.prevent />
            </n-form-item>

            <n-form-item label="Company " label-style="font-weight: 600" path="company">
                <n-select type="select" v-model:value="formValue.company" :options="companyOptions" />
            </n-form-item>

            <n-form-item label="Partner " label-style="font-weight: 600" path="partner">
                <n-select type="select" v-model:value="formValue.partner" :options="companyOptions" />
            </n-form-item>

            <n-form-item label="Quality Review Partner (QRP) " label-style="font-weight: 600" path="qrp">
                <n-select type="select" v-model:value="formValue.qrp" :options="companyOptions" />
            </n-form-item>

            <n-form-item label="Director " label-style="font-weight: 600" path="director">
                <n-select type="select" v-model:value="formValue.director" :options="companyOptions" />
            </n-form-item>

            <n-form-item label="Manager " label-style="font-weight: 600" path="manager">
                <n-select type="select" v-model:value="formValue.manager" :options="companyOptions" />
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
                    class="w-full"
                />
            </n-form-item>

            <n-form-item label="Color" label-style="font-weight: 600" path="color">
                <n-color-picker v-model:value="formValue.color" :actions="['clear']" />
            </n-form-item>

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <!-- <div class="flex justify-center fixed top-0 left-0 bg-white">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div> -->
</template>

<script setup>
    import { ref } from "vue";
    import { useMessage } from "naive-ui";
    import { millisecondToDay } from "../../utils/Days";

    const formRef = ref(null);
    const message = useMessage();
    const formValue = ref({
        name: "",
        type: "",
        fiscalYear: null,
        company: "",
        partner: "",
        qrp: "",
        director: "",
        manager: "",
        team: [], // this may cause trouble
        range: null,
        color: "",
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

    const projectTypeOptions = [
        {
            label: "Audit",
            value: "audit",
        },
        {
            label: "Review",
            value: "review",
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
        team: {
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
        color: {
            required: true,
            validator(rule, value) {
                if (!value) {
                    return new Error("Choose color for project.");
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
                const from = formValue.value.range[0];
                const to = formValue.value.range[1];
                const duration = millisecondToDay(to) - millisecondToDay(from);
                const data = { ...formValue.value, range: { from, to, duration } };
                console.log(data);
                message.success("Submitted successfully!");
            } else {
                console.log(errors);
                message.error("Fill the fields correctly!");
            }
        });
    }
</script>
