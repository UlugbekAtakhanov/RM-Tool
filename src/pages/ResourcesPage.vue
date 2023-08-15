<template>
    <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Resources</h1>
    <div>
        <div class="flex justify-end items-end mb-2 px-2">
            <!-- <Modal buttonTitle="Add project" :disabledState="['super-super-admin', 'super-admin', 'admin'].includes(user)">
                <AddNewProjectForm />
            </Modal> -->
            <DatePicker />
        </div>
        <div class="flex items-start">
            <TableLeft />
            <TableRight />
        </div>
    </div>
</template>

<script setup>
    import TableLeft from "../components/resources-page/table/TableLeft.vue";
    import TableRight from "../components/resources-page/table/TableRight.vue";
    // import Modal from "../components/Modal.vue";
    // import AddNewProjectForm from "../components/forms-page/AddNewProjectForm.vue";
    import DatePicker from "../components/resources-page/DatePicker.vue";
    // import { storeToRefs } from "pinia";
    // import { useUserStore } from "../store/userStore";

    // const userStore = useUserStore();
    // const { user } = storeToRefs(userStore);
</script>
