<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new user</h1>
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

            <n-form-item label="Role" label-style="font-weight: 600" path="role">
                <n-select type="select" v-model:value="formValue.role" :options="roleOptions" />
            </n-form-item>

            <div></div>

            <n-form-item v-show="formValue.role === 'staff'" label="Coach" label-style="font-weight: 600" path="coach">
                <n-select type="select" v-model:value="formValue.coach" :options="companyOptions" />
            </n-form-item>

            <n-form-item v-show="formValue.role === 'staff'" label="Type" label-style="font-weight: 600" path="type">
                <n-select type="select" v-model:value="formValue.type" :options="typeOptions" />
            </n-form-item>

            <n-form-item v-show="formValue.role === 'staff'" label="Projects" label-style="font-weight: 600" class="col-span-2">
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

            <n-form-item class="!flex !justify-center col-span-2 mt-2">
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

    // assuming
    const userStatus = ref("admin");

    const formRef = ref(null);
    const message = useMessage();
    const formValue = ref({
        firstName: "",
        lastName: "",
        lineOfService: "",
        email: "",
        role: "",
        type: "",
        coach: "",
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
        role: {
            required: true,
            message: "Choose a role.",
            trigger: ["blur", "input"],
        },
        coach: {
            required: true,
            message: "Choose a coach.",
            trigger: ["blur", "input"],
        },
    };

    const companyOptions = [
        {
            label: "Coach1",
            value: "song0",
            disabled: true,
        },
        {
            label: "Coach2",
            value: "song1",
        },
        {
            label: "Coach3",
            value: "song2",
        },
    ];

    const roleOptions = [
        {
            label: "Super Admin",
            value: "super-admin",
            disabled: !["super-super-admin"].includes(userStatus.value),
        },
        {
            label: "Admin",
            value: "admin",
            disabled: !["super-super-admin", "super-admin"].includes(userStatus.value),
        },
        {
            label: "Resource Manager",
            value: "rm",
            disabled: !["super-super-admin", "super-admin", "admin"].includes(userStatus.value),
        },
        {
            label: "Staff",
            value: "staff",
            disabled: !["super-super-admin", "super-admin", "admin", "rm"].includes(userStatus.value),
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

    const userStatusOptions = [
        {
            label: "Super Super Admin",
            value: "super-super-admin",
        },
        {
            label: "Super Admin",
            value: "super-admin",
        },
        {
            label: "Admin",
            value: "admin",
        },
        {
            label: "RM",
            value: "rm",
        },
        {
            label: "Staff",
            value: "staff",
        },
    ];

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
