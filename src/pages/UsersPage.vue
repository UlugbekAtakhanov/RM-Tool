<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Users</h1>
        <div class="mb-2 px-2 flex">
            <Modal buttonTitle="Add user">
                <AddNewStaffForm />
            </Modal>
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
</script>
