<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Users</h1>
        <div class="mb-2 px-2 flex">
            <Modal buttonTitle="Add user">
                <AddNewStaffForm />
            </Modal>
            <div class="flex items-center ml-12 gap-2">
                Assuming the user is: 
                <n-select class="!w-[300px]" type="select" v-model:value="user" @update:value="selectHandler" size="small" :options="userOptions" />
            </div>
        </div>
        <div class="px-2">
            <UsersTable />
        </div>
    </div>
</template>

<script setup>
    import Modal from "../components/Modal.vue";
    import AddNewStaffForm from "../components/forms-page/AddNewStaffForm.vue";
    import UsersTable from "../components/users-page/table/UsersTable.vue";
    import { useUserStore } from "../store/userStore";
    import { storeToRefs } from "pinia";

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const selectHandler = (value) => {
        userStore.setUser(value);
    };

    const userOptions = [
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
            label: "Resource Manager",
            value: "rm",
        },
    ];
</script>
