<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new user</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4 items-start">
            <FormInput label="First name" v-model:value="formValue.firstName" path="firstName" placeholder="First name" />

            <FormInput label="Last name" v-model:value="formValue.lastName" path="lastName" placeholder="Last name" />

            <FormInput label="Business name" v-model:value="formValue.businessName" path="businessName" placeholder="Business name" />

            <FormInput label="Email" v-model:value="formValue.email" path="email" placeholder="Email" />

            <FormSelect label="Role" v-model:value="formValue.role" path="role" placeholder="Role" :options="roleOptions" />

            <FormSelect label="Company" v-model:value="formValue.company" path="company" placeholder="Company" :options="companyOptions" />

            <FormInput
                label="Line of service"
                v-model:value="formValue.lineOfService"
                v-show="formValue.role === 'staff'"
                path="line-of-service"
                placeholder="Line of service"
            />

            <FormSelect
                label="Coach"
                v-show="formValue.role === 'staff'"
                v-model:value="formValue.coach"
                path="coach"
                placeholder="Coach"
                :options="companyOptions"
            />

            <FormSelect
                label="Type"
                v-show="formValue.role === 'staff'"
                v-model:value="formValue.type"
                path="type"
                placeholder="Type"
                :options="typeOptions"
            />

            <!-- projects allocation -->
            <n-form-item v-show="formValue.role === 'staff'" label="Projects" label-style="font-weight: 600" class="col-span-2">
                <n-dynamic-input v-model:value="formValue.projects" #="{ index, value }" :on-create="onCreate">
                    <div style="display: flex; align-items: flex-start; width: 100%" class="gap-2">
                        <n-form-item ignore-path-change :show-label="false" :path="`projects[${index}].name`" class="flex-1">
                            <n-select v-model:value="formValue.projects[index].name" :options="companyOptions" />
                        </n-form-item>

                        <n-form-item ignore-path-change :show-label="false" :path="`projects[${index}].allocation`" class="flex-1">
                            <n-input
                                type="number"
                                v-model:value="formValue.projects[index].allocation"
                                placeholder="Time allocation"
                                @keydown.enter.prevent
                            />
                        </n-form-item>

                        <n-date-picker
                            v-model:value="formValue.projects[index].range"
                            type="daterange"
                            clearable
                            @keydown.enter.preventj
                            update-value-on-close
                            :actions="null"
                            class="flex-[2]"
                            :show-label="false"
                        />
                    </div>
                </n-dynamic-input>
            </n-form-item>

            <!-- submit button -->
            <n-form-item class="!flex !justify-center col-span-2 mt-2">
                <n-button :disabled="isLoading" type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>

    <div class="flex justify-center">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div>
</template>

<script setup>
    import { useLoadingBar, useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { ref } from "vue";
    import { useUserStore } from "../../store/userStore";
    import FormInput from "./FormInput.vue";
    import FormSelect from "./FormSelect.vue";
    import { useAddUserData } from "../../hooks/useUsersHooks";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const { isLoading, mutate } = useAddUserData({ message, loadingBar });

    // assuming
    const userStatus = ref(user.value);

    const formRef = ref(null);
    const formValue = ref({
        // common
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        role: "",
        company: "",

        // company
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
        email: {
            required: true,
            message: "Please provide email",
            trigger: ["blur", "input"],
        },
        role: {
            required: true,
            message: "Choose a role.",
            trigger: ["blur", "input"],
        },
        company: {
            required: true,
            message: "Choose a company.",
            trigger: ["blur", "input"],
        },
        lineOfService: {
            required: true,
            validator: (rule, value) => {
                if (formValue.value.role === "staff") {
                    if (!value) {
                        return new Error("Please provide line of service");
                    }
                    return true;
                }
            },
            trigger: ["blur", "input"],
        },
        coach: {
            required: true,
            validator: (rule, value) => {
                if (formValue.value.role === "staff") {
                    if (!value) {
                        return new Error("Please provide line of service");
                    }
                    return true;
                }
            },
            trigger: ["blur", "input"],
        },
    };

    const companyOptions = [
        {
            label: "Project1",
            value: "song0",
            disabled: true,
        },
        {
            label: "Project2",
            value: "song1",
        },
        {
            label: "Project3",
            value: "song2",
        },
    ];

    const roleOptions = [
        {
            label: "PKF Admin",
            value: "super-admin",
            disabled: !["super-super-admin"].includes(userStatus.value),
        },
        {
            label: "Client Admin",
            value: "admin",
            disabled: !["super-super-admin", "super-admin"].includes(userStatus.value),
        },
        {
            label: "Resource Manager",
            value: "rm",
            disabled: !["super-super-admin", "admin"].includes(userStatus.value),
        },
        {
            label: "Staff",
            value: "staff",
            disabled: !["rm"].includes(userStatus.value),
        },
    ];

    const typeOptions = [
        {
            label: "Partner",
            value: "partner",
        },
        {
            label: "QRP",
            value: "qrp",
        },
        {
            label: "Director",
            value: "director",
        },
        {
            label: "Manager",
            value: "manager",
        },
        {
            label: "Key Staff",
            value: "key-staff",
        },
        {
            label: "Staff",
            value: "staff",
        },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            loadingBar.start();
            mutate(formValue.value);
        });
    }

    const onCreate = () => ({ name: "", range: null });
</script>
