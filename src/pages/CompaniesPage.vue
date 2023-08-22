<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Companies</h1>
        <div class="mb-2 px-2 flex gap-2">
            <Modal buttonTitle="Add company">
                <AddNewCompanyForm />
            </Modal>
            <n-button
                ghost
                @click="deleleteHandler"
                size="small"
                type="primary"
                class="hover:!bg-primary hover:!text-white"
                :disabled="deleteDisabledState"
            >
                <i class="fa-solid fa-trash-can"></i>
            </n-button>
        </div>
        <div class="px-2">
            <CompaniesTable @handleCheck="handleCheck" :checkedRowKeysRef="checkedRowKeysRef" :data="data" />
        </div>
    </div>
</template>

<script setup>
    import { useMessage } from "naive-ui";
    import Modal from "../components/Modal.vue";
    import CompaniesTable from "../components/companies-page/table/CompaniesTable.vue";
    import AddNewCompanyForm from "../components/forms-page/AddNewCompanyForm.vue";
    import { useCompaniesListStore } from "../store/companiesListStore";
    import { toRef, computed, ref } from "vue";
    import { storeToRefs } from "pinia";

    const message = useMessage();
    const companiesListStore = useCompaniesListStore();
    const { companiesList } = storeToRefs(companiesListStore);
    const { deleteCompanies } = companiesListStore;

    const computedList = computed(() => {
        return companiesList.value.map((item) => ({ ...item, key: item.id }));
    });

    const createData = () => computedList;
    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        companiesList.value = companiesList.value.filter((user) => !deletingListKeys.includes(user.id));
        deleteCompanies(deletingListKeys);
        deleteDisabledState.value = true;
        message.error("Deleted successfully.");
    };

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };
</script>
