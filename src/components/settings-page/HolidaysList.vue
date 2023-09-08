<template>
    <div class="mb-20">
        <h1 id="holidays-list" class="mb-8 rounded-md text-xl font-semibold text-primary">Holidays List</h1>

        <!-- modal -->
        <div class="mb-2 flex gap-2" v-show="!disabledState">
            <Modal buttonTitle="Add holiday" :disabledState="disabledState">
                <AddNewHolidayForm />
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

        <!-- table -->
        <div class="w-2/3">
            <n-data-table
                size="small"
                :columns="columns"
                :data="data"
                :row-key="(row) => row.key"
                @update:checked-row-keys="handleCheck"
                :row-props="rowProps"
            />
        </div>
    </div>
</template>

<script setup>
    import { useLoadingBar, useMessage } from "naive-ui";
    import { computed, onMounted, ref } from "vue";
    import Modal from "../../components/Modal.vue";
    import AddNewHolidayForm from "../../components/forms/AddNewHolidayForm.vue";
    import { useHolidaysListStore } from "../../store/holidaysStore";
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../../store/userStore";
    import { format } from "date-fns";

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const disabledState = computed(() => {
        return ["SUPER_SUPER_ADMIN", "SUPER_ADMIN", "ADMIN"].includes(user.value);
    });

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const holidaysStore = useHolidaysListStore();
    const { holidaysList } = storeToRefs(holidaysStore);
    const { deleteHolidays, getHolidays } = holidaysStore;

    onMounted(() => getHolidays({ message, loadingBar }));

    const computedHolidaysList = computed(() => {
        return holidaysList.value.map((item) => {
            const date = format(new Date(`${new Date().getFullYear()}-${item.month}-${item.day}`), "MMM dd, yyyy");
            return { ...item, key: item.id, date };
        });
    });

    const createData = () => computedHolidaysList;

    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        holidaysList.value = holidaysList.value.filter((holiday) => !deletingListKeys.includes(holiday.id));
        deleteHolidays(deletingListKeys);
        deleteDisabledState.value = true;
        message.error("Deleted successfully.");
    };

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };

    const createColumns = () => [
        {
            title: "Name of holiday",
            key: "name",
        },
        {
            title: "Date",
            key: "date",
        },
    ];
    const columns = createColumns();

    const rowProps = (row) => {
        return {
            style: "cursor: pointer;",
            onClick: (e) => {
                console.log(e);
                // message.info(row.name);
            },
        };
    };
</script>
