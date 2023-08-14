<template>
    <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Projects</h1>
    <div>
        <div class="flex justify-between items-end mb-2 px-2">
            <Modal buttonTitle="Add project">
                <AddNewProjectForm />
            </Modal>
            <DatePicker />
        </div>
        <div class="flex items-start">
            <TableLeft />
            <TableRight />
        </div>
    </div>
</template>

<script setup>
    import TableLeft from "../components/gant-page/table2/TableLeft.vue";
    import TableRight from "../components/gant-page/table2/TableRight.vue";
    import Modal from "../components/Modal.vue";
    import AddNewProjectForm from "../components/forms-page/AddNewProjectForm.vue";
    import DatePicker from "../components/gant-page/DatePicker.vue";
</script>
