<template>
    <div>
        <h1 class="text-2xl font-semibold text-center p-4 text-primary rounded-md">Users</h1>
        <div class="mb-2 px-2 flex gap-2">
            <Modal buttonTitle="Add user">
                <AddNewUsersForm />
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
    import { useLoadingBar, useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { computed, ref, onMounted } from "vue";
    import Modal from "../components/Modal.vue";
    import AddNewUsersForm from "../components/forms/AddNewUsersForm.vue";
    import UsersTable from "../components/users-page/table/UsersTable.vue";
    import { useUsersListStore } from "../store/usersListStore";
    import { getFromLS } from "../utils/localStorage";

    const message = useMessage();
    const loadingBar = useLoadingBar();
    const user = getFromLS("user");

    const usersListStore = useUsersListStore();
    const { usersList, resourceList, usersIsLoading } = storeToRefs(usersListStore);
    const { deleteUsers, getUsers, getResources } = usersListStore;

    onMounted(() => {
        if (user.includes("RESOURCE_MANAGER")) {
            getResources({ message, loadingBar });
        } else {
            getUsers({ message, loadingBar });
        }
    });

    const list = user.includes("RESOURCE_MANAGER") ? resourceList : usersList;

    // preparing users list for displaying in the table
    const computedList = computed(() => {
        return list.value.map((item) => {
            // rewriting roles for UI
            const roles = item.roles
                ? item.roles
                      .map((i) => {
                          if (i === "SUPER_SUPER_ADMIN") return "Administrator";
                          if (i === "SUPER_ADMIN") return "PKF Admin";
                          if (i === "ADMIN") return "Client Admin";
                          if (i === "RESOURCE_MANAGER") return "Resource manager";
                          if (i === "STAFF") return "Staff";
                          return;
                      })
                      .join(", ")
                : null;
            return { ...item, key: item.id, name: `${item.firstName} ${item.lastName}`, roles };
        });
    });
    const createData = () => computedList;
    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        deleteUsers({ userIdList: deletingListKeys, message, loadingBar });
        deleteDisabledState.value = true;
    };

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };
</script>
