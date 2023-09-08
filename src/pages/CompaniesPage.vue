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
    import { useLoadingBar, useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { computed, onMounted, ref } from "vue";
    import Modal from "../components/Modal.vue";
    import CompaniesTable from "../components/companies-page/table/CompaniesTable.vue";
    import AddNewCompanyForm from "../components/forms/AddNewCompanyForm.vue";
    import { useCompaniesListStore } from "../store/companiesListStore";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const companiesListStore = useCompaniesListStore();
    const { companiesList } = storeToRefs(companiesListStore);
    const { deleteCompanies, getCompaniesList } = companiesListStore;

    onMounted(() => getCompaniesList({ loadingBar, message }));

    const computedList = computed(() => {
        return companiesList.value.map((item) => ({ ...item, key: item.id }));
    });

    const createData = () => computedList;
    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        deleteCompanies({ companiesIdList: deletingListKeys, message, loadingBar });
        deleteDisabledState.value = true;
    };

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };
</script>
