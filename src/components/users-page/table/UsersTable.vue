<template>
    <n-data-table
        size="small"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="'60vh'"
        :row-key="(row) => row.key"
        @update:checked-row-keys="(rowKeys) => handleCheck(rowKeys)"
        :row-props="rowProps"
    />
</template>

<script setup>
    import { reactive } from "vue";

    // props
    defineProps({ checkedRowKeysRef: Array, data: Array });

    // emits
    const emit = defineEmits(["handleCheck"]);

    // emitting check handler of users
    const handleCheck = (rowKeys) => {
        emit("handleCheck", rowKeys);
    };

    // creating columns for table
    const createColumns = () => [
        {
            type: "selection",
            disabled(row) {
                return row.name === "Edward King 3";
            },
        },
        {
            title: "Name",
            key: "name",
        },
        {
            title: "Role",
            key: "role",
        },
        {
            title: "Coach",
            key: "coach",
        },
        {
            title: "Email",
            key: "email",
        },
    ];
    const columns = createColumns();

    const pagination = reactive({
        page: 1,
        pageSize: 10,
        showSizePicker: true,
        pageSizes: [10, 25, 50],
        onChange: (page) => {
            pagination.page = page;
        },
        onUpdatePageSize: (pageSize) => {
            pagination.pageSize = pageSize;
            pagination.page = 1;
        },
    });

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
