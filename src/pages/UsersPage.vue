<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Users</h1>
        <div class="mb-2 px-2 flex gap-2">
            <Modal buttonTitle="Add user">
                <AddNewStaffForm />
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
            <UsersTable @handleCheck="handleCheck" :checkedRowKeysRef="checkedRowKeysRef" :data="data" />
        </div>
    </div>
</template>

<script setup>
    import Modal from "../components/Modal.vue";
    import AddNewStaffForm from "../components/forms-page/AddNewStaffForm.vue";
    import UsersTable from "../components/users-page/table/UsersTable.vue";
    import { ref, toRef, computed } from "vue";
    import { useUsersListStore } from "../store/usersListStore";
    import { useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";

    const message = useMessage();
    const usersListStore = useUsersListStore();
    const { usersList } = storeToRefs(usersListStore);
    const { deleteUsers } = usersListStore;

    const computedList = computed(() => {
        return usersList.value.map((item) => ({ ...item, key: item.id }));
    });

    const createData = () => computedList;
    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        usersList.value = usersList.value.filter((user) => !deletingListKeys.includes(user.id));
        deleteUsers(deletingListKeys);
        deleteDisabledState.value = true;
        message.error("Deleted successfully.");
    };

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };
</script>
