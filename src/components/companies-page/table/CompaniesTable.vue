<template>
    <n-data-table
        size="small"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="'60vh'"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
        :row-props="rowProps"
    />
</template>

<script setup>
    import { useMessage } from "naive-ui";
    import { reactive, ref } from "vue";

    const message = useMessage();
    const checkedRowKeysRef = ref([]);

    const checkedRowKeys = checkedRowKeysRef;
    // console.log(checkedRowKeys.value);

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
            title: "Email",
            key: "email",
        },
        {
            title: "Address",
            key: "address",
        },
        {
            title: "Phone",
            key: "phone",
        },
        {
            title: "Contact First Name",
            key: "contact-first-name",
        },
        {
            title: "Contact Last Name",
            key: "contact-last-name",
        },
    ];

    const columns = createColumns();

    const rowKey = (row) => row.key;

    const handleCheck = (rowKeys) => {
        checkedRowKeysRef.value = rowKeys;
    };

    const data = Array.from({ length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        email: `test${index}@test.com`,
        address: `Walter Street, ${index}`,
        phone: `Phone ${index}`,
        "contact-first-name": `Contact F ${index}`,
        "contact-last-name": `Contact L ${index}`,
    }));

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
                message.info(row.name);
            },
        };
    };
</script>
