<template>
    <div class="mb-20">
        <h1 id="holidays-list" class="text-xl font-semibold text-primary rounded-md mb-8">Holidays List</h1>

        <!-- modal -->
        <div class="mb-2 flex gap-2">
            <Modal buttonTitle="Add holiday">
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
    import { useMessage } from "naive-ui";
    import { computed, ref, toRefs } from "vue";
    import Modal from "../../components/Modal.vue";
    import AddNewHolidayForm from "../../components/forms-page/AddNewHolidayForm.vue";
    import { useHolidaysStore } from "../../store/holidaysStore";

    const message = useMessage();

    const { holidaysList, deleteHolidays } = useHolidaysStore();

    const computedList = computed(() => {
        return holidaysList.map((item) => ({ ...item, key: item.id }));
    });

    const createData = () => computedList;

    const data = ref(createData());

    const checkedRowKeysRef = ref([]);
    const deleteDisabledState = ref(true);

    const deleleteHandler = () => {
        const deletingListKeys = checkedRowKeysRef.value;
        deleteHolidays(deletingListKeys);
    };

    const createColumns = () => [
        {
            type: "selection",
            disabled(row) {
                return row.name === "Edward King 3";
            },
            fixed: "left",
        },
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

    const handleCheck = (rowKeys) => {
        deleteDisabledState.value = rowKeys.length ? false : true;
        checkedRowKeysRef.value = rowKeys;
    };

    const rowProps = (row) => {
        return {
            style: "cursor: pointer;",
            onClick: (e) => {
                console.log(e);
                message.info(row.name);
            },
        };
    };
</script>
