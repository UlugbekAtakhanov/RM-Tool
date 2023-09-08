<!-- without weekends -->

<template>
    <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Projects</h1>
    <div>
        <div class="flex justify-between items-end mb-2 px-2">
            <Modal buttonTitle="Add project" :disabledState="['super-super-admin', 'super-admin', 'admin'].includes(user)">
                <AddNewProjectForm :usersList="resourceList" :companiesList="companiesList" />
            </Modal>
            <DatePicker />
        </div>

        <!-- displaying projects table -->
        <div v-show="projectIsLoading" class="p-2 font-semibold">Loading..</div>
        <div v-show="!projectIsLoading" class="flex items-start max-h-[70vh] overflow-y-scroll">
            <TableLeft />
            <TableRight />
        </div>
    </div>
</template>

<script setup>
    import TableLeft from "../components/gant-page/table2/TableLeft.vue";
    import TableRight from "../components/gant-page/table2/TableRight.vue";
    import Modal from "../components/Modal.vue";
    import AddNewProjectForm from "../components/forms/AddNewProjectForm.vue";
    import DatePicker from "../components/gant-page/DatePicker.vue";
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../store/userStore";
    import { useProjectListStore } from "../store/projectStore";
    import { onMounted } from "vue";
    import { useCompaniesListStore } from "../store/companiesListStore";
    import { useLoadingBar, useMessage } from "naive-ui";
    import { useUsersListStore } from "../store/usersListStore";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const projectListStore = useProjectListStore();
    const { projectIsLoading } = storeToRefs(projectListStore);
    const { getProjects } = projectListStore;

    const userListStore = useUsersListStore();
    const { resourceList } = storeToRefs(userListStore);
    const { getResources } = userListStore;

    const companiesListStore = useCompaniesListStore();
    const { companiesList } = storeToRefs(companiesListStore);
    const { getCompaniesList } = companiesListStore;

    onMounted(() => {
        getProjects();
        getCompaniesList({ message, loadingBar });
        getResources({ message, loadingBar });
    });
</script>
