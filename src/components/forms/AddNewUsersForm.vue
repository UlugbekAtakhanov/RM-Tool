<template>
    <div class="p-4">
        <h1 class="text-2xl text-center font-semibold mb-8">Add a new user</h1>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="grid grid-cols-2 gap-x-4 items-start">
            <FormInput label="First name" v-model:value="formValue.firstName" path="firstName" placeholder="First name" />

            <FormInput label="Last name" v-model:value="formValue.lastName" path="lastName" placeholder="Last name" />

            <FormInput label="Business name" v-model:value="formValue.businessName" path="businessName" placeholder="Business name" />

            <FormInput type="email" label="Email" v-model:value="formValue.email" path="email" placeholder="Email" />

            <FormSelect label="Role" v-model:value="formValue.role" path="role" placeholder="Role" :options="computedRoleOptions" />

            <FormInput
                label="Line of service"
                v-model:value="formValue.lineOfService"
                v-show="formValue.role === 'STAFF'"
                path="line-of-service"
                placeholder="Line of service"
            />

            <FormSelect
                filterable
                label="Coach"
                v-show="formValue.role === 'STAFF'"
                v-model:value="formValue.coachId"
                path="coachId"
                placeholder="Coach"
                :options="computedCoachOptions"
            />

            <FormSelect
                v-show="formValue.role === 'SUPER_ADMIN' || formValue.role === 'ADMIN'"
                :filterable="true"
                label="Company"
                v-model:value="formValue.companyId"
                path="company"
                :options="computedCompanyOptions"
            />

            <!-- submit button -->
            <n-form-item class="!flex !justify-center col-span-2 mt-2">
                <n-button :disabled="usersIsLoading" type="primary" class="!px-12" @click="handleSubmit"> Add </n-button>
            </n-form-item>
        </n-form>
    </div>

    <!-- <div class="flex justify-center">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
    </div> -->
</template>

<script setup>
    import { useLoadingBar, useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { ref, onMounted, computed } from "vue";
    import { useUserStore } from "../../store/userStore";
    import { useUsersListStore } from "../../store/usersListStore";
    import { includesWithin } from "../../utils/includesWithin";
    import FormInput from "./FormInput.vue";
    import FormSelect from "./FormSelect.vue";
    import { useCompaniesListStore } from "../../store/companiesListStore";
    import { useShowModalStore } from "../../store/showModalStore";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const companiesListStore = useCompaniesListStore();
    const { companiesList } = storeToRefs(companiesListStore);
    const { getCompaniesList } = companiesListStore;

    onMounted(() => getCompaniesList({ loadingBar, message }));

    const usersListStore = useUsersListStore();
    const { usersIsLoading, usersList } = storeToRefs(usersListStore);
    const { addNewUser, addNewResource, getUsers } = usersListStore;

    onMounted(() => getUsers({ message, loadingBar }));

    const showModalStore = useShowModalStore();
    const { closeModal } = showModalStore;

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const formRef = ref(null);
    const formValue = ref({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        role: "",
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
            validator(rule, value) {
                if (!value) {
                    return new Error("Please provide email.");
                }
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return new Error("Please provide a valid email.");
                }
                return true;
            },
            trigger: ["blur", "input"],
        },
        role: {
            required: true,
            message: "Choose a role.",
            trigger: ["blur", "input"],
        },
        companyId: {
            required: true,
            validator: (rule, value) => {
                if (formValue.value.role === "SUPER_ADMIN" || formValue.value.role === "ADMIN") {
                    if (!value) {
                        return new Error("Please provide a company");
                    }
                    return true;
                }
            },
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
        // coach: {
        //     required: true,
        //     validator: (rule, value) => {
        //         if (formValue.value.role === "staff") {
        //             if (!value) {
        //                 return new Error("Please provide line of service");
        //             }
        //             return true;
        //         }
        //     },
        //     trigger: ["blur", "input"],
        // },
    };

    // preparing for displaying in select options
    const computedCompanyOptions = computed(() => companiesList.value.map((company) => ({ label: company.name, value: company.id })));
    const computedCoachOptions = computed(() => usersList.value.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.id })));

    const roleOptions = [
        {
            label: "PKF Admin",
            value: "SUPER_ADMIN",
            disabled: !includesWithin(user.value, ["SUPER_SUPER_ADMIN"]),
            show: ["SUPER_SUPER_ADMIN"],
        },
        {
            label: "Client Admin",
            value: "ADMIN",
            disabled: !includesWithin(user.value, ["SUPER_SUPER_ADMIN", "SUPER_ADMIN"]),
            show: ["SUPER_SUPER_ADMIN", "SUPER_ADMIN"],
        },
        {
            label: "Resource Manager",
            value: "RESOURCE_MANAGER",
            disabled: !includesWithin(user.value, ["SUPER_SUPER_ADMIN", "ADMIN"]),
            show: ["SUPER_SUPER_ADMIN", "ADMIN"],
        },
        {
            label: "Staff",
            value: "STAFF",
            disabled: !includesWithin(user.value, ["RESOURCE_MANAGER"]),
            show: ["RESOURCE_MANAGER"],
        },
    ];

    const computedRoleOptions = roleOptions.filter((item) => includesWithin(user.value, item.show));

    // add new user handler
    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            loadingBar.start();
            if (formValue.value.role === "STAFF") {
                const { businessName, role, ...rest } = formValue.value;
                addNewResource({ data: rest, message, loadingBar, closeModal });
            } else {
                addNewUser({ data: formValue.value, message, loadingBar, closeModal });
            }
        });
    }
</script>
