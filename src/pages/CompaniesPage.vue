<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Companies</h1>
        <div class="mb-2 px-2">
            <Modal buttonTitle="Add company">
                <AddNewCompanyForm />
            </Modal>
        </div>
        <div class="px-2">
            <CompaniesTable />
        </div>
    </div>
</template>

<script setup>
    import Modal from "../components/Modal.vue";
    import CompaniesTable from "../components/companies-page/table/CompaniesTable.vue";
    import AddNewCompanyForm from "../components/forms-page/AddNewCompanyForm.vue";
</script>
