<template>
    <div class="bg-white mx-auto rounded-lg">
        <h1 class="text-2xl text-center font-semibold mb-8">Add new project</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4">
            <FormInput label="Project name" v-model:value="formValue.name" path="name" placeholder="Project name" />

            <FormSelect label="Project type" v-model:value="formValue.type" path="type" :options="projectTypeOptions" />

            <FormDatePicker label="Year end" v-model:value="formValue.fiscalYear" path="fiscalYear" placeholder="Year end" />

            <FormSelect label="Company" v-model:value="formValue.companyId" path="companyId" :options="computedCompanyOptions" />

            <n-form-item label="Project duration" label-style="font-weight: 600" path="range">
                <n-date-picker
                    v-model:value="formValue.range"
                    type="daterange"
                    :format="format"
                    clearable
                    @keydown.enter.prevent
                    update-value-on-close
                    :actions="null"
                    class="w-full"
                />
            </n-form-item>

            <n-form-item
                label="Add new resources"
                label-style="font-weight: 600; border-bottom: 1px solid #80808054; margin-bottom:15px"
                class="col-span-2 mt-4"
            >
                <n-dynamic-input class="mb-8" :min="1" v-model:value="formValue.resources" #="{ index, value }" :on-create="onCreate">
                    <div style="display: flex; align-items: flex-end; width: 100%" class="gap-2 mt-2">
                        <n-form-item
                            label="User name"
                            :show-label="index === 0"
                            label-style="font-size: 12px; font-weight: 600"
                            :path="`resources[${index}].resourceId`"
                            class="flex-[2]"
                        >
                            <n-select
                                type="select"
                                filterable
                                placeholder="Choose a resource"
                                v-model:value="formValue.resources[index].resourceId"
                                :options="computedResourceOptions"
                                @keydown.enter.prevent
                            />
                        </n-form-item>

                        <n-form-item
                            label="Role"
                            :show-label="index === 0"
                            label-style="font-size: 12px; font-weight: 600"
                            :path="`resources[${index}].type`"
                            class="flex-1"
                        >
                            <n-select
                                type="select"
                                placeholder="Choose a type"
                                v-model:value="formValue.resources[index].role"
                                :options="resourceTypeOptions"
                                @keydown.enter.prevent
                            />
                        </n-form-item>

                        <n-form-item
                            label="Assigned(hours)"
                            :show-label="index === 0"
                            label-style="font-size: 12px; font-weight: 600"
                            :path="`resources[${index}].utilization`"
                            class="flex-1"
                        >
                            <n-input-number
                                min="0"
                                v-model:value="formValue.resources[index].utilization"
                                placeholder="Time allocation"
                                @keydown.enter.prevent
                            />
                        </n-form-item>

                        <n-form-item
                            label="Assessment duration"
                            :show-label="index === 0"
                            label-style="font-size: 12px; font-weight: 600"
                            :path="`resources[${index}].range`"
                            class="flex-[2]"
                        >
                            <n-date-picker
                                v-model:value="formValue.resources[index].range"
                                :format="format"
                                type="daterange"
                                clearable
                                @keydown.enter.prevent
                                update-value-on-close
                                :actions="null"
                                class="flex-[2]"
                                :show-label="false"
                            />
                        </n-form-item>
                    </div>
                </n-dynamic-input>
            </n-form-item>

            <!-- <n-form-item label="Color" label-style="font-weight: 600" path="color">
                <n-color-picker v-model:value="formValue.color" :actions="['clear']" />
            </n-form-item> -->

            <n-form-item class="!flex !justify-center col-span-2">
                <n-button :disabled="projectIsLoading" type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>
    <!-- <div class="flex justify-center bg-white">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div> -->
</template>

<script setup>
    import { ref, computed } from "vue";
    import { useLoadingBar, useMessage } from "naive-ui";
    import { daysInMilliseconds, millisecondsInDays } from "../../utils/Days";
    import FormInput from "./FormInput.vue";
    import FormSelect from "./FormSelect.vue";
    import FormDatePicker from "./FormDatePicker.vue";
    import { storeToRefs } from "pinia";
    import { useProjectListStore } from "../../store/projectStore";
    import { useShowModalStore } from "../../store/showModalStore";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const projectListStore = useProjectListStore();
    const { projectIsLoading } = storeToRefs(projectListStore);
    const { createProject } = projectListStore;

    const showModalStore = useShowModalStore();
    const { closeModal } = showModalStore;

    const { companiesList, usersList } = defineProps({
        companiesList: Array,
        usersList: Array,
    });

    // preparing for displaying in select options
    const computedCompanyOptions = computed(() => companiesList.map((company) => ({ label: company.name, value: company.id })));
    const computedResourceOptions = computed(() => usersList.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.id })));

    const projectTypeOptions = [
        {
            label: "Other",
            value: "OTHER",
        },
        {
            label: "Audit",
            value: "AUDIT",
        },
        {
            label: "Review",
            value: "REVIEW",
        },
    ];

    const resourceTypeOptions = [
        {
            label: "Partner",
            value: "PARTNER",
        },
        {
            label: "QRP",
            value: "QRP",
        },
        {
            label: "Director",
            value: "DIRECTOR",
        },
        {
            label: "Manager",
            value: "MANAGER",
        },
        {
            label: "Key Staff",
            value: "KEY_STAFF",
        },
        {
            label: "Staff",
            value: "STAFF",
        },
    ];

    const formRef = ref(null);
    const formValue = ref({
        name: "",
        companyId: "",
        fiscalYear: "",
        type: "",
        range: null,
        resources: [
            {
                resourceId: computedResourceOptions.value[0].value,
                projectId: "",
                role: resourceTypeOptions[0].value,
                utilization: 1,
                range: [new Date(new Date().setHours(0, 0, 0, 0)).getTime(), new Date(new Date().setHours(0, 0, 0, 0)).getTime() + daysInMilliseconds(5)],
            },
        ],
        // color: "",
    });

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
        companyId: {
            required: true,
            message: "Choose a company.",
            trigger: ["blur", "input"],
        },
        // partner: {
        //     required: true,
        //     message: "Please provide a partner.",
        //     trigger: ["blur", "input"],
        // },
        // qrp: {
        //     required: true,
        //     message: "Please provide a Quality Review Partner (QRP).",
        //     trigger: ["blur", "input"],
        // },
        // manager: {
        //     required: true,
        //     message: "Please provide a manager name.",
        //     trigger: ["blur", "input"],
        // },
        // teamKeys: {
        //     required: true,
        //     validator(rule, value) {
        //         if (!value.length) {
        //             return new Error("Choose team members.");
        //         }
        //         return true;
        //     },
        //     trigger: ["blur", "input"],
        // },
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
        resources: {
            required: true,
            validator(rule, value) {
                console.log(value);
                if (!value) {
                    return new Error("Add a new resource.");
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
            const color = formValue.value.type === "AUDIT" ? "#0ea5e9" : formValue.value.type === "REVIEW" ? "#e11d48" : "#16a34a";
            // preparing for posting data
            const resources = formValue.value.resources.map((res) => {
                const startDate = res.range[0];
                const endDate = res.range[1];
                const data = { ...res, startDate, endDate };
                const { range, ...rest } = data;
                return rest;
            });
            const data = { ...formValue.value, resources, startDate, endDate, duration, color };
            const { range, ...rest } = data;
            loadingBar.start();
            createProject({ data: rest, loadingBar, message, closeModal });
        });
    }

    const onCreate = () => ({
        resourceId: computedResourceOptions.value[0].value,
        role: resourceTypeOptions[0].value,
        utilization: 1,
        range: [new Date(new Date().setHours(0, 0, 0, 0)).getTime(), new Date(new Date().setHours(0, 0, 0, 0)).getTime() + daysInMilliseconds(5)],
    });
    const format = "MMM dd, yyyy";
</script>

<style>
    .n-dynamic-input-item__action {
        align-self: flex-end !important;
    }
    .n-form-item-blank .n-form-item-feedback-wrapper {
        display: none !important;
    }
</style>
